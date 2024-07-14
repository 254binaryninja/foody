// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import{getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3NVTOS1c-x3MANaFI_HhZM_dlY8AlBFo",
    authDomain: "foody-62153.firebaseapp.com",
    projectId: "foody-62153",
    storageBucket: "foody-62153.appspot.com",
    messagingSenderId: "6030631154",
    appId: "1:6030631154:web:14761ac88f88aabb58b06b",
    measurementId: "G-52330LB654"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth =  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore();

export {app,auth,db}
