import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getDatabase } from "firebase/database";


/* const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}; */

const firebaseConfig = {
  apiKey: "AIzaSyAJG6Oor09sds5ToCA7ntp3qPg9NYpuYaI",
  authDomain: "myexpenses-c1550.firebaseapp.com",
  projectId: "myexpenses-c1550",
  storageBucket: "myexpenses-c1550.appspot.com",
  messagingSenderId: "496930386650",
  appId: "1:496930386650:web:275ec89805de2aa71a2be3"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
export const authentication = getAuth(app)
export const database = getDatabase();




