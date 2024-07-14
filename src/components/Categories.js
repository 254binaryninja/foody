import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated ,{FadeInDown} from "react-native-reanimated";


export default function Categories ({activeCategory,handleChangeCategory,categories}) {
    return(
        <Animated.View entering={FadeInDown.duration(1000).springify(100)}>
           <ScrollView
               horizontal
               showsHorizontalScrollIndicator={false}
               className='space-x-4'
               contentContainerStyle={{paddingHorizontal:15}}
               >
               {
                   categories.map((cat, index)=>{
                       let isActive = cat.strCategory===activeCategory;
                       let activeButtonClass = isActive?'bg-amber-400':'bg-black/40';
                       return(
                           <TouchableOpacity
                           key={index}
                           onPress={()=>handleChangeCategory(cat.strCategory)}
                           className='flex items-center space-y-1'
                           >
                               <View className={`${activeButtonClass}'rounded-full p-[6px]'`}>
                                   <Image
                                   source={{uri: cat.strCategoryThumb}}
                                   style={{width:hp(6),height:hp(6)}}
                                  className='rounded-full'
                                   />
                               </View>
                               <Text className='text-neutral-600' style={{fontSize:hp(2)}}>
                                   {cat.strCategory}
                               </Text>

                           </TouchableOpacity>
                       )
                   })
               }
           </ScrollView>
        </Animated.View>
    )
}
