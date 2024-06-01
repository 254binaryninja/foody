import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from "./src/screens/Welcome";
import Home from "./src/screens/Home";
import DetailScreen from "./src/screens/DetailScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Welcome' component={Welcome}/>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Detail' component={DetailScreen}/>
      </Stack.Navigator>
   </NavigationContainer>
  );
}
