import React, { useEffect } from 'react';
import { Image, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
    const navigation = useNavigation();

    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);

    useEffect(() => {
        ring1Padding.value = 0;
        ring2Padding.value = 0;
        setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 100);
        setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(5.5)), 300);
        setTimeout(() => navigation.navigate('SignUp'), 2500);
    }, []);

    const ring1AnimatedStyle = useAnimatedStyle(() => {
        return {
            padding: ring1Padding.value,
        };
    });

    const ring2AnimatedStyle = useAnimatedStyle(() => {
        return {
            padding: ring2Padding.value,
        };
    });

    return (
        <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
            <StatusBar style='dark' />
            {/* {logo image} */}
            <Animated.View className='bg-white/20 rounded-full' style={ring2AnimatedStyle}>
                <Animated.View className='bg-white/20 rounded-full' style={ring1AnimatedStyle}>
                    <Image source={require('../Images/Dish8.jpg')}
                           style={{ width: hp(20), height: hp(20) }}
                           className='rounded-full'/>
                </Animated.View>
            </Animated.View>
            {/* {Punchline} */}
            <View className='flex items-center space-y-2'>
                <Text style={{ fontSize: hp(7) }} className='font-bold text-white tracking-widest'>
                    Foody
                </Text>
                <Text style={{ fontSize: hp(2) }} className='font-medium text-white tracking-widest text-lg'>
                    food is always right
                </Text>
            </View>
        </View>
    );
}
