import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeD1RT7p3AcuQo03cp-EvlH_vZuz9gdds",
  authDomain: "authentication-3e2f3.firebaseapp.com",
  projectId: "authentication-3e2f3",
  storageBucket: "authentication-3e2f3.appspot.com", // Corrected storage bucket
  messagingSenderId: "888180344016",
  appId: "1:888180344016:web:263acbc84ff59650b90ad5",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
