// import React from 'react';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import auth from "./firebase.config";

export const AuthContext = createContext(null)

const googleProvider =new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    // const navigate = useNavigate()
    const [user, setUser] = useState(null)
    console.log(user);




    const createUser = (email, password)=>{
       
     return  createUserWithEmailAndPassword(auth, email, password)
    }


    const signInUser = (email, password) => {
     
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = ()=>{
       
        return signInWithPopup(auth, googleProvider)
    }

    const githubLogin = ()=>{
        
        return signInWithPopup(auth, githubProvider)
    }

    // log out method
    const logout = ()=>{
       
       setUser(null)
        signOut(auth)
        
        if(signOut){
            Swal.fire({
                              icon: "success",
                              title: "Log Out",
                              text: "Successfully you are loged out",
                              footer: '<p>Thank You</p>'
                            })
        }
    }

    // observer
    onAuthStateChanged(auth, (user) => {
        if (user) {
         setUser(user)
         
        }
      },[]);

      useEffect(()=>{
        const unsubscribed = onAuthStateChanged(auth,(currentUser)=>{
                setUser(currentUser)
              
        })
        return ()=>{
            unsubscribed()
        }
      },[])

    const allValue ={
        createUser,
        signInUser,
        googleLogin,
        githubLogin,
        logout,
        user,
        
        
       
    }
    return (
        <AuthContext.Provider value={allValue}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;