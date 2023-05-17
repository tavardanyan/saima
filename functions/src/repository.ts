// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Video } from "./types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLU8AGtD5U_c2t4EPM-5zyQ5ic_vYrgA0",
  authDomain: "saima-tigran.firebaseapp.com",
  projectId: "saima-tigran",
  storageBucket: "saima-tigran.appspot.com",
  messagingSenderId: "705108784197",
  appId: "1:705108784197:web:4c930fb51f8be7c983df2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const create = async (data: Video) => {
  try {
    const docRef = await addDoc(collection(firestore, "videos"), {
      ...data,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
