import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBc8mSFZbqTk_YlOqXjvGz5Cq7UpZgnvTE",
  authDomain: "financas-8d1c3.firebaseapp.com",
  projectId: "financas-8d1c3",
  storageBucket: "financas-8d1c3.appspot.com",
  messagingSenderId: "617071970954",
  appId: "1:617071970954:web:4c3846de050aa1f9b57b73",
  measurementId: "G-51KRQFKW80"
};

let app
if(!getApps().length){
  app = initializeApp(firebaseConfig);
}
const fireStore = getFirestore(app)
export default fireStore;
