// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJsr4MbXnOq0_h31wC2YYgrHzIvKbx0Lc",
  authDomain: "singlepage-961e9.firebaseapp.com",
  projectId: "singlepage-961e9",
  storageBucket: "singlepage-961e9.appspot.com",
  messagingSenderId: "920388679833",
  appId: "1:920388679833:web:1e84e7fda486497beea008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;