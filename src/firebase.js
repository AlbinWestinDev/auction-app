import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD3yDN798Qa-S_9K0LJ9JBrydgJVMxT3aE",
  authDomain: "auction-app-a702e.firebaseapp.com",
  projectId: "auction-app-a702e",
  storageBucket: "auction-app-a702e.appspot.com",
  messagingSenderId: "917612819652",
  appId: "1:917612819652:web:a412e0e5231fd3975f8591",
  measurementId: "G-5D777BR733",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
