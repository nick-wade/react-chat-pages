// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCFCWpljnhH6mt83rd9JPdUqFshc5EPplg",
    authDomain: "reactchat-6d38f.firebaseapp.com",
    databaseURL: "https://reactchat-6d38f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactchat-6d38f",
    storageBucket: "reactchat-6d38f.appspot.com",
    messagingSenderId: "664476639691",
    appId: "1:664476639691:web:edab4630f72f260686964e",
};

// Initialize Firebase app and export database instance
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
