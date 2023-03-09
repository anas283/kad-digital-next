import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAZTOTen93OzYn5ApRrFBjpMdM09WqPoSc",
  authDomain: "kad-digital-73037.firebaseapp.com",
  projectId: "kad-digital-73037",
  storageBucket: "kad-digital-73037.appspot.com",
  messagingSenderId: "919920420772",
  appId: "1:919920420772:web:c1b0a844efa15decbe0331",
  measurementId: "G-2L4QV8Y24Q"
};
  
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
  
export default storage;