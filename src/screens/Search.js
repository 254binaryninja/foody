import React from 'react'
import { View,ScrollView,SafeAreaView } from 'react-native'
import Recipes from '../components/Recipes'

const Search = ({route}) => {
    const {searchResults} = route.params;
  return (
    <SafeAreaView>
        <View className='flex-1 bg-slate-300'>
        <ScrollView>
            <View>
             <Recipes meals={searchResults}/> 
            </View>
        </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default Search