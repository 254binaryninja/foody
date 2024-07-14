import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView,Button} from 'react-native';
import LottieView from "lottie-react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useNavigation} from "@react-navigation/native";

export default function Enter() {
    const navigation = useNavigation();
    return(
        <SafeAreaView className='flex-1'>
            <View className=' flex-1 justify-center items-center bg-amber-500'>
                <View className='flex-col justify-center items-center'>
                    <View className='mt-10 p-4'>
                        <LottieView
                        source={require('../components/Animation - 1717792901014.json')}
                        autoPlay
                        loop
                        style={{ width: hp(40), height: hp(30) }}
                        />
                    </View>
                    <View className='flex-row space-x-2'>
                        <TouchableOpacity className=' mt-8 mx-4 flex items-center rounded-full bg-white p-[6px]'
                                          onPress={navigation.navigate('SignUp')}
                        >
                            <Text className='text-neutral-800 font-medium' style={{fontSize: hp(3)}}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className=' mt-8 mx-4 flex items-center rounded-full bg-white p-[6px]'
                                          onPress={navigation.navigate('Login')}
                        >
                            <Text className='text-neutral-800 font-medium' style={{fontSize: hp(3)}}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
