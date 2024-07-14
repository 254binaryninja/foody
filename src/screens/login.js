import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {useNavigation} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {auth} from "../../config/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSumbit = async ()=>{
        try{
            await signInWithEmailAndPassword(auth , email, password);
        }catch (err) {
            console.log('got this error :',err.message)
        }
    }

    return(
        <SafeAreaView className='flex-1'><ScrollView>
            <View className='flex-col bg-amber-500'>
                <View className='mt-48 p-4'>
                    <LottieView
                        source={require('../components/login.json')}
                        autoPlay
                        loop
                        style={{ width: hp(40), height: hp(30) }}
                    />
                </View>
                <View className='mt-20 rounded-md bg-white p-10' style={{width:wp(100),borderTopRightRadius:30,borderTopLeftRadius:30,}}>
                    <View className='m-4 px-2'><Text className='font-bold text-neutral-800' style={{fontSize:hp(4)}}>Prepare your oven ...</Text></View>
                    <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
                        <TextInput
                            placeholder='email address'
                            placeholderTextColor='gray'
                            value={email}
                            onChangeText={value=>setEmail(value)}
                            style={{fontSize:hp(1.7)}}
                            className='flex-1 text-base mb-1 pl-3 -tracking-wider'
                        />
                    </View>
                    <View className=' mt-8 mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
                        <TextInput
                            placeholder='password'
                            secureTextEntry={true}
                            placeholderTextColor='gray'
                            value={password}
                            onChangeText={value=>setPassword(value)}
                            style={{fontSize:hp(1.7)}}
                            className='flex-1 text-base mb-1 pl-3 -tracking-wider'
                        />
                    </View>
                    <TouchableOpacity className=' mt-8 mx-4 flex items-center rounded-full bg-amber-200 p-[6px]'
                                      onPress={handleSumbit}
                    >
                        <Text className='text-neutral-800 font-medium' style={{fontSize: hp(3)}}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='mt-3 px-4'
                        onPress={()=>navigation.navigate('SignUp')}
                    ><Text className='text-neutral-800 font-medium underline' style={{fontSize: hp(2)}}> Don't have an account ?</Text></TouchableOpacity>
                </View>
            </View></ScrollView>
        </SafeAreaView>
    )
}
