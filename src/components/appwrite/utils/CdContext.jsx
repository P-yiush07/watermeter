import { createContext, useContext, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const CdContext = createContext();

export const CrudProvider = ({ children }) => {

    const { user } = useAuth(); // AUTH CONTEXT
    const [data, setData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const insertion = async (formData) => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                ...formData,
                profileCompleted: true,
                timeStamp: serverTimestamp(),
            });
        } catch (error) {
            console.log('Error in setting Document', error.message);
        }
        setIsSubmitted(true);
    }

    const contextData = {
        insertion,
        data,
        setData,
        isSubmitted,
        setIsSubmitted,
    }

    return (
        <CdContext.Provider value={contextData}>
            {children}
        </CdContext.Provider>
    )
};

export const useCrud = () => { return useContext(CdContext) };