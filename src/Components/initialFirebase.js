import firebase from "firebase/app";
import "firebase/firestore";

export default function initialFirebase() {
  // Initialize Firebase
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(config);
  // }
  const firebaseConfig = {
    apiKey: "AIzaSyAZ2tm6RAh0CzvmQp5t-Kyw5UBr_MxGBYk",
    authDomain: "project4thquiz.firebaseapp.com",
    databaseURL: "https://project4thquiz.firebaseio.com",
    projectId: "project4thquiz",
    storageBucket: "project4thquiz.appspot.com",
    messagingSenderId: "706805911766",
    appId: "1:706805911766:web:c1c1e4fedc974e157d7977",
    measurementId: "G-7Q1XCCGX7J",
  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
}
