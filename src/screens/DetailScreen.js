import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar/build/StatusBar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";

export default function DetailScreen(props) {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    let item = props.route.params;

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data && response.data.meals) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log('error', err.message);
        }
    }

    const getYoutubeVideoId = url =>{
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        const match = url.match(regex);
        if (match && match[1]){
            return match[1];
        }
        return null;

    }

    useEffect(() => {
        getMealData(item.idMeal);
    }, []);

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    return (
        <ScrollView
            className='bg-white'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style='light' />
            {/* Recipe img */}
            <View className='flex-1 justify-center'>
                <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop:4 ,marginLeft:2,marginRight:2}}
                    sharedTransitionTag={item.strMeal}
                />
            </View>
            {/* back button */}
            <View className='w-full absolute flex-row justify-between items-center pt-14'>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className='ml-5 rounded-full bg-white'>
                    <Ionicons name='arrow-back-sharp' size={hp(3)} color='#fbbf24' />
                </TouchableOpacity>
            </View>
            {/* meal data */}
            {
                loading ? <Loading size='large' className='mt-16' /> : (
                    <View className='px-4 flex justify-between space-y-4 pt-8'>
                        {/* name and location */}
                        <View className='space-y-2'>
                            <Text style={{ fontSize: hp(3) }} className='font-bold flex-1 text-neutral-700'>{meal?.strMeal}</Text>
                            <Text style={{ fontSize: hp(2) }} className='font-medium flex-1 text-neutral-500'>{meal?.strArea}</Text>
                        </View>
                        {/* misc */}
                        <View className='flex-row justify-around'>
                            <View className='flex rounded-full bg-amber-400 p-2'>
                                <View className='bg-white rounded-full flex items-center justify-center'
                                      style={{ width: wp(6.5), height: hp(6.5) }}
                                >
                                    <Ionicons name='alarm' size={hp(4)} color='#525252' className='p-4 m-2' />
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>35</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>min</Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-400 p-2'>
                                <View className='bg-white rounded-full flex items-center justify-center'
                                      style={{ width: wp(6.5), height: hp(6.5) }}
                                >
                                    <Ionicons name='people' size={hp(4)} color='#525252' className='p-4 m-2' />
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>04</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>servings</Text>
                                </View>
                            </View>
                        </View>
                        {/* ingredients */}
                        <View className='space-y-4'>
                            <Text style={{ fontSize: hp(3) }} className='font-bold text-neutral-700'>
                                Ingredients
                            </Text>
                            <View className='space-y-2 ml-3'>
                                {
                                    ingredientsIndexes(meal).map(i => {
                                        return (
                                            <View key={i} className='flex-row space-x-4'>
                                                <View style={{ width: hp(1.5), height: hp(1.5) }}
                                                      className='bg-amber-300 rounded-full'
                                                />
                                                <View className='flex-row space-x-2'>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-extrabold text-neutral-800'>{meal['strMeasure' + i]}</Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-medium text-neutral-700'>{meal['strIngredient' + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        {/* instructions */}
                        <View className='space-y-4'>
                            <Text style={{ fontSize: hp(3) }} className='font-bold text-neutral-700'>
                                Instructions
                            </Text>
                            <Text style={{ fontSize: hp(1.6) }} className='text-neutral-700 font-medium'>
                                {meal?.strInstructions}
                            </Text>
                        </View>
                        {/*{Recipe video}*/}
                        {
                            meal.strYoutube && (
                                <View className='space-y-4'>
                                    <Text style={{ fontSize: hp(3) }} className='font-bold text-neutral-700'>
                                        Recipe Video
                                    </Text>
                                    <View  className='rounded-md'>
                                        <YoutubeIframe
                                        videoId={getYoutubeVideoId(meal.strYoutube)}
                                        height={hp(30)}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    </View>
                )
            }
        </ScrollView>
    )
}
