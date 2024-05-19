// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKLBtAbkDl2JF23W2UzWekJO9T8tHziKY",
  authDomain: "detecto-video-image-file.firebaseapp.com",
  projectId: "detecto-video-image-file",
  storageBucket: "detecto-video-image-file.appspot.com",
  messagingSenderId: "122815999462",
  appId: "1:122815999462:web:d14cc5c0aa6b82e3e4fa27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;