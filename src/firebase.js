import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

initializeApp({
    apiKey: "AIzaSyByqhL936PLG-eOReI534GqjDaFgVZlnkk",
    authDomain: "test-currency-aa228.firebaseapp.com",
    projectId: "test-currency-aa228",
    storageBucket: "test-currency-aa228.appspot.com",
    messagingSenderId: "381216925951",
    appId: "1:381216925951:web:633c0311af0615399b84ca"
});

export default getFirestore();