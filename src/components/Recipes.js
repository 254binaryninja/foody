import React, {useState,useEffect} from 'react';
import {View, Text, Pressable, Image} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import MasonryList from '@react-native-seoul/masonry-list';
import Animated ,{FadeInDown} from "react-native-reanimated";
import Loading from "./loading";
import {useNavigation} from "@react-navigation/native";

export default function Recipes ({categories,meals}) {
    const [foods, setFoods] = useState(meals);
    const navigation = useNavigation();

    useEffect(()=>{
        if(searchResults > 0 ){
            setFoods(searchResults)
        }
    },[searchResults])

    return(
        <Animated.View
            entering={FadeInDown.delay(100).duration(1000).springify(1000).damping(12)}
            className='mx-4 space-y-3'>
            <Text style={{fontSize:hp(3)}} className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
                {
                    categories.length===0 || meals.length===0?(
                        <Loading size='large' className='mt-20'/>
                    ):(
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({first: ITEM_CNT})}
                            onEndReachedThreshold={0.1}
                            // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }

            </View>
        </Animated.View>
    )

}


const RecipeCard = ({item, index,navigation})=>{
    let isEven = index%2==0;
    return(
        <View>
            <Pressable
            style={{width: '100%',paddingLeft:isEven? 0:8, paddingRight:isEven? 8:0 }}
            className='flex justify-center mb-4 space-y-1'
            onPress={()=>navigation.navigate('Detail',{...item})}
            >
              <Image
                  source={{uri:item.strMealThumb}}
                  style={{width:'100%', height: index%3==0?hp(35):hp(25),borderRadius:35}}
                  className='bg-black/5'
                  sharedTransitionTag={item.strMeal}
              />
                <Text style={{fontSize:hp(2)}} className='font-semibold ml-2 text-neutral-600'>
                    {item.strMeal.length>20?item.strMeal.slice(0,20)+'...':item.strMeal}
                </Text>
            </Pressable>
        </View>
    )
}
