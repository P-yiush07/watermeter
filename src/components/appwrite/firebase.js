import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBosVG4wT0oiAXIfeBpPpxp1xcJNLie9xg",
  authDomain: "watermeter-21de2.firebaseapp.com",
  projectId: "watermeter-21de2",
  storageBucket: "watermeter-21de2.appspot.com",
  messagingSenderId: "881354986646",
  appId: "1:881354986646:web:af3d811a63644bbeb29eb7"
};


 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const user = auth.currentUser;
