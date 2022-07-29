// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
  apiKey: "AIzaSyBNDm9GGikRkKV70ztKS_ut1sMIZqWdk7E",
  authDomain: "market-match-e1c5a.firebaseapp.com",
  projectId: "market-match-e1c5a",
  storageBucket: "market-match-e1c5a.appspot.com",
  messagingSenderId: "74801999708",
  appId: "1:74801999708:web:87ba534e9a9305ce1a9b99",
  measurementId: "G-HV40NNSTJW"
});

// Initialize Firebase
const storage = getStorage(app);
export default storage