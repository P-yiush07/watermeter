import { useEffect, useContext, useState, createContext } from "react";
import { account } from "../appwriteconfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    useEffect(() => {
     checkUserStatus()
      }, [])
    

    const loginUser = async (userInfo) => {
        setLoading(true)
        try {
            await account.createEmailSession(
                userInfo.email,
                userInfo.password
            )
            let accountDetails = await account.get()
            setUser(accountDetails)

        } catch (error) {
            console.error(error);
        }

        setLoading(false)
    }

    const logoutUser = () => {
        account.deleteSession('current')
        setUser(null)
        navigate('/')
    }

    const registerUser = async (userInfo) => {
        setLoading(true)

        try {
            await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password,
                userInfo.name
            )
            await account.createEmailSession(
                userInfo.email,
                userInfo.password
            )
            let accountDetails = await account.get()
            setUser(accountDetails)

        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    const checkUserStatus = async () => {

        try {
            let accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.log(null);
        }

        setLoading(false)
    }

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p></p> : children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext
