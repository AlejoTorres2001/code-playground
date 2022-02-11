// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
//import KEYS from "./keys"; //uncomment for dev

// Your web app's Firebase configuration
const setConfig = () => {
  console.log(import.meta.env.MODE);
  if (import.meta.env.MODE === "development") {
    return {
      apiKey: KEYS.API_KEY,
      authDomain: KEYS.AUTH_DOMAIN,
      projectId: KEYS.PROJECT_ID,
      storageBucket: KEYS.STORAGE_BUCKET,
      messagingSenderId: KEYS.MESSAGING_SENDER_ID,
      appId: KEYS.APP_ID,
    };
  } else {
    return {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
    };
  }
};

// Initialize Firebase
const app = initializeApp(setConfig());
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logOut = () => {
  signOut(auth);
};
const auth = getAuth(app);
const db = getFirestore(app);
export { app, signInWithGoogle, logOut, auth, db };
