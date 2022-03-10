import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCyQHWaESDtoCSuMjVNdOICTiPPDDCr818",
  authDomain: "my-expenses---malik.firebaseapp.com",
  databaseURL: "https://my-expenses---malik-default-rtdb.firebaseio.com",
  projectId: "my-expenses---malik",
  storageBucket: "my-expenses---malik.appspot.com",
  messagingSenderId: "337266984008",
  appId: "1:337266984008:web:0a9c82ccaf7ce5ac62047d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
export const authentication = getAuth(app)
export const database = getDatabase();




