import {
  initializeApp
} from "firebase/app";
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
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

  try {
    const res = await signInWithPopup(auth, provider);

    if (res.user)
      return true;
    else
      return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const logout = () => {
  signOut(auth);
}

export const getData = (collectionRef, snapshot, error) => {
  const ref = query(collection(db, collectionRef), orderBy("timestamp", "desc"), limit(20));
  return onSnapshot(ref, snapshot, error)
}
