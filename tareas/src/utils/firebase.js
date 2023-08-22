import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKZ2Ka2yjMauGXy-V3vbhPXAETUtxSgtQ",
  authDomain: "todo-48ccb.firebaseapp.com",
  projectId: "todo-48ccb",
  storageBucket: "todo-48ccb.appspot.com",
  messagingSenderId: "762687333441",
  appId: "1:762687333441:web:66d8bd931ed9609d4092c0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
