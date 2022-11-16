import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2FGwTyd5rozg5Hm0kwbEoBjaeRnMqBdk",
  authDomain: "community-logo-generator.firebaseapp.com",
  projectId: "community-logo-generator",
  storageBucket: "community-logo-generator.appspot.com",
  messagingSenderId: "293138662088",
  appId: "1:293138662088:web:5048d152c6544d9cd31bfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export default app; 