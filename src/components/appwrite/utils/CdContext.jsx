import { createContext, useContext, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const CdContext = createContext();

export const CrudProvider = ({ children }) => {

    const { user } = useAuth(); // AUTH CONTEXT
    
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


    const setIntake = async (dailyIntake) => {
        const currentDate = new Date().toLocaleDateString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          });
          
          const currentTime = new Date().toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          });
          
          const formattedDateTime = `${currentDate.replace(/\//g, '-')} ${currentTime}`;
          
        try {
            const intakeRef = doc(db, `users_intake/${user.uid}/intakes`, formattedDateTime);
            await setDoc(intakeRef, {
                dailyIntake,
                timeStamp: serverTimestamp()
              });
        } catch (error) {
            console.log('Error in setting Intake', error.message);
        }
    }

    const contextData = {
        insertion,
        isSubmitted,
        setIsSubmitted,
        setIntake,
    }

    return (
        <CdContext.Provider value={contextData}>
            {children}
        </CdContext.Provider>
    )
};

export const useCrud = () => { return useContext(CdContext) };