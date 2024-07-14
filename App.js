import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from "./src/screens/Welcome";
import Home from "./src/screens/Home";
import DetailScreen from "./src/screens/DetailScreen";
import Login from "./src/screens/login";
import SignUp from "./src/screens/signUp";
//import Enter from './src/screens/enter';
import useAuth from "./hook/useAuth";
import Search from './src/screens/Search';

const Stack = createNativeStackNavigator();

export default function App() {
    const {user} = useAuth();
     if(user){
         return (
             <NavigationContainer>
                 <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
                     <Stack.Screen name='Home' component={Home}/>
                     <Stack.Screen name='Detail' component={DetailScreen}/>
                     <Stack.Screen name='Search' component={Search}/>
                 </Stack.Navigator>
             </NavigationContainer>
         )
     }else{
         return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
                    <Stack.Screen name='Welcome' component={Welcome}/>
                    <Stack.Screen name='Login' component={Login}/>
                    <Stack.Screen name='SignUp' component={SignUp}/>
                </Stack.Navigator>
            </NavigationContainer>
         )
     }

}
