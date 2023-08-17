import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore"
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
import { getFirestore } from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0iHmeDwnzMtxOG04VT2yyISpwG3IslM8",
  authDomain: "mydrive-ef6c7.firebaseapp.com",
  projectId: "mydrive-ef6c7",
  storageBucket: "mydrive-ef6c7.appspot.com",
  messagingSenderId: "918235835990",
  appId: "1:918235835990:web:7b41a7482a32d9144895f7",
  measurementId: "G-RM21SBYWBZ"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
 const auth=getAuth(app)
 const firestore = getFirestore(app);
 export {auth,firebaseConfig,firestore}

