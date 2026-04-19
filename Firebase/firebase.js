// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCJevVaXqyxUjWLdeaqXrXmUEw5POjSEY",
  authDomain: "dukeforest-96e53.firebaseapp.com",
  projectId: "dukeforest-96e53",
  storageBucket: "dukeforest-96e53.firebasestorage.app",
  messagingSenderId: "807394176812",
  appId: "1:807394176812:web:f3b887fc8c5df9c6efc689",
  measurementId: "G-N4C8G3HFNC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const auth = firebase.auth();
