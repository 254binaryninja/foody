import React,{useState,useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';

export default function useAuth(){
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user=>{
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
        });
        return unsub;
    },[])
    return{user}

}
