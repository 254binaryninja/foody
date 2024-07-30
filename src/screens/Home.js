import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";
import { useNavigation } from '@react-navigation/native';
import { doc } from 'firebase/firestore';
import { db } from "../../config/firebase";

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [username, setUsername] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (!search) {
            setSearchResults([]);
            return;
        }
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${search}`);
            if (response.data.meals) {
                setSearchResults(response.data.meals);
                navigation.navigate('Search', { searchResults: searchResults });
            } else {
                setSearchResults([]);
            }
        } catch (e) {
            console.log("Error fetching search results:", e.message);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            if (response && response.data) {
                setCategories(response.data.categories);
            }
        } catch (err) {
            console.log('Error fetching categories:', err.message);
        }
    }

    const getRecipes = async (category = 'Beef') => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (err) {
            console.log('Error fetching recipes:', err.message);
        }
    }

    const handleChangeCategory = category => {
        setActiveCategory(category);
        getRecipes(category);
    }

    useEffect(() => {
        getCategories();
        getRecipes(activeCategory);
        // Example getUser function, replace with actual logic
        const getUser = async () => {
            const userDoc = await doc(db, 'users', 'user-id').get(); // Replace 'user-id' with actual user ID
            if (userDoc.exists()) {
                setUsername(userDoc.data().username);
            } else {
                console.log("User not found!");
            }
        }
        getUser();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, paddingTop: hp(14) }}
            >
                {/* Avatar and notifications icon */}
                <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Image
                        source={require('../Images/IMG-20240126-WA0057.jpg')}
                        style={{ height: hp(5), width: hp(5.5), borderRadius: hp(2.75) }}
                    />
                    <Ionicons name='notifications' size={hp(4)} color='gray' />
                </View>
                {/* Greetings and punchline */}
                <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: hp(3), color: '#333', fontWeight: '500' }}>Hello {username ? username : ''}</Text>
                    <Text style={{ fontSize: hp(4.1), fontWeight: 'bold', color: '#555' }}>
                        Make your own food,{' '}
                        <Text style={{ color: '#ffbb33', fontSize: hp(4.4) }}>stay at home.</Text>
                    </Text>
                </View>
                {/* Searchbar */}
                <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 30, paddingHorizontal: 12, marginBottom: 10 }}>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor='gray'
                        value={search}
                        onChangeText={setSearch}
                        style={{ flex: 1, fontSize: hp(1.7) }}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 20 }}>
                            <Ionicons name='search' size={hp(2.5)} color='gray' />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Categories */}
                <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                {/* Recipes */}
                <Recipes meals={meals} categories={categories} />
            </ScrollView>
        </View>
    )
}
