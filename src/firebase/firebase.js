import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from 'firebase/auth';

import {
  getFirestore,
  query,
  collection,
  onSnapshot,
  orderBy,
  limit
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAu0qibU3v3h0W1DtfXinFRlAUzliq_Q8g",
  authDomain: "bitcoin-e6458.firebaseapp.com",
  databaseURL: "https://bitcoin-e6458-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bitcoin-e6458",
  storageBucket: "bitcoin-e6458.appspot.com",
  messagingSenderId: "4047814747",
  appId: "1:4047814747:web:1e6aae6609d96a7012ff7e",
  measurementId: "G-HBFGJQLVJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

  try {
    const res = await signInWithPopup(auth, provider);

    if(res.user)
      return true;
    else
      return false;
  }
  catch(err){
    console.log(err);
    return false;
  }
}

export const logout = () => {
  signOut(auth);
}

export const getData = (collectionRef, snapshot, error) => {
  const ref = query(collection(db, collectionRef), orderBy("timestamp", "desc"),limit(20));
  return onSnapshot(ref, snapshot, error)
}
