import React from 'react';
import firebase from 'firebase';


var firebaseConfig = {
  apiKey: 'AIzaSyBDHSYlKSb2fyTGNGMIn1xci0AzCblPGcI',
  authDomain: 'logo-generator-50fc4.firebaseapp.com',
  projectId: "logo-generator-50fc4",
  storageBucket: "logo-generator-50fc4.appspot.com",
  messagingSenderId: "769267366287",
  appId: "1:769267366287:web:f6f91abdac7d11705873fa",
  measurementId: "G-MDYJL47LF4"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;