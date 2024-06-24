
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBAkEDiWKJwGqxb62YNIIXtylNHZ6BknzI",
  authDomain: "calendar-sharing-9c202.firebaseapp.com",
  projectId: "calendar-sharing-9c202",
  storageBucket: "calendar-sharing-9c202.appspot.com",
  messagingSenderId: "705106774991",
  appId: "1:705106774991:web:a152b55c2fc1d30ffb20ba",
  measurementId: "G-5KBKZ9833G"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;