import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA4DKjhpBD4MtKTlnbhElw4LRfbr0j5tgY",
  authDomain: "new-my-expenses-74a27.firebaseapp.com",
  projectId: "new-my-expenses-74a27",
  storageBucket: "new-my-expenses-74a27.appspot.com",
  messagingSenderId: "798109030157",
  appId: "1:798109030157:web:4a7dc54ed1e260533d0244",
  measurementId: "G-E9KZ1RD8K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
export const authentication = getAuth(app)
export const database = getDatabase();




