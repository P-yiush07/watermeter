import { useEffect, useContext, useState, createContext } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import PropTypes from 'prop-types';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [isLoggedIn, setisLoggedIn] = useState(false)

    const createUser = async (email, password) => {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error.message);
        }
    }

    const logout = () => {
        try {
            signOut(auth)
            setisLoggedIn(false);
            console.log("logged out");
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setisLoggedIn(true);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
     })
     return () => {
        unsubscribe();
     }
    }, [])

    

    const contextData = {
     createUser,
     user,
     logout,
     login,
     isLoggedIn,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export const useAuth = () => {return useContext(AuthContext)}

