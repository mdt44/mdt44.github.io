const firebaseConfig = {
  apiKey: "AIzaSyCcrrFgfV5am8GYTta60oruuITpjFUertU",
  authDomain: "dmap-a8cc0.firebaseapp.com",
  projectId: "dmap-a8cc0",
  storageBucket: "dmap-a8cc0.firebasestorage.app",
  messagingSenderId: "78589855261",
  appId: "1:78589855261:web:aa396e6cc3062c80b2e8f4",
  measurementId: "G-3FEVPTYPX5"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
