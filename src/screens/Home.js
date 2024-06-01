import React,{useState,useEffect} from 'react';
import {View, Text, ScrollView, Image, TextInput} from "react-native";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Ionicons} from "@expo/vector-icons";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function Home () {
    const [activeCategory,setActiveCategory] = useState('Beef');
    const [categories,setCategories]= useState([]);
    const [meals,setMeals]=useState([]);

    const getCategories = async ()=>{
        try{
          const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
          if(response && response.data) {
              setCategories(response.data.categories);
          }

        }catch(err){
            console.log('error',err.message)
        }
    }

    const getRecipes = async (category='Beef')=>{
        try{
            setMeals([])
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if(response && response.data) {
                setMeals(response.data.meals);
            }

        }catch(err){
            console.log('error',err.message)
        }
    }

    const handleChangeCategory = category=>{
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }

    useEffect(()=>{
    getCategories();
    getRecipes(activeCategory);
    },[])

    return(
        <View className='flex-1 bg-white'>
           <StatusBar style='dark'/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                className='space-y-6 pt-14'
            >
                {/*{Avatar and bell icon}*/}
                <View className='mx-4 flex-row justify-between items-center mb-2'>
                    <Image source={require('../Images/IMG-20240126-WA0057.jpg')}
                    style={{height: hp(5),width: hp(5.5)}}
                    className='rounded-full'
                    />
                <Ionicons name='notifications' size={hp(4)} color='gray'/>
                </View>
                {/*{Greetings & punchline}*/}
                <View className='mx-4 space-y-4 mb-2'>
                    <Text style={{fontSize: hp(3)}} className='text-neutral-500 font-medium'>Hello Chemist</Text>
                    <View>
                        <Text style={{fontSize:hp(3.8)}} className='font-semibold'>Make your own food,</Text>
                    </View>
                     <Text style={{fontSize:hp(4.1)}} className='text-neutral-600 font-bold'>stay at
                         <Text style={{fontSize:hp(4.4)}} className='text-amber-300'> home .</Text></Text>
                </View>
                {/*{Searchbar}*/}
                <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
                    <TextInput
                    placeholder='Search any recipe'
                    placeholderTextColor='gray'
                    style={{fontSize:hp(1.7)}}
                    className='flex-1 text-base mb-1 pl-3 -tracking-wider'
                    />
                    <View className='bg-white p-4 rounded-full'>
                        <Ionicons name='search'size={hp(2.5)} color='gray'/>
                    </View>
                </View>
                {/*{categories}*/}
                <View>
                    <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>
                </View>
                {/*{Recipes}*/}
                <View>
                    <Recipes meals={meals} categories={categories}/>
                </View>
            </ScrollView>
        </View>
    )
}
