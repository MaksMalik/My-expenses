import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBtEDOMVon5M1uG46HmA0YPRShXxa3Ic_s",
  authDomain: "my-expenses---final.firebaseapp.com",
  projectId: "my-expenses---final",
  storageBucket: "my-expenses---final.appspot.com",
  messagingSenderId: "335238432545",
  appId: "1:335238432545:web:451a222cb59a65d5e02060",
  measurementId: "G-Y8VP50K9GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
export const authentication = getAuth(app)

