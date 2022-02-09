// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTiwa9ogfvpRe8SRp9L1BERBYlm4WM_Qg",
  authDomain: "website-admin-lomdei.firebaseapp.com",
  projectId: "website-admin-lomdei",
  storageBucket: "website-admin-lomdei.appspot.com",
  messagingSenderId: "1054106630383",
  appId: "1:1054106630383:web:7012cffe40b2c2f140c31a",
  measurementId: "G-SCYHDT14D3"
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);

export const db = getFirestore();
console.log(db)

export default fbApp;
