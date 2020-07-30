import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const {Storage} = require('@google-cloud/storage')

const firebaseConfig = {
  apiKey: "AIzaSyA-W1bO3wsNkPVGpiolsnIH8T85qljb97U",
  authDomain: "todo-app-2e1da.firebaseapp.com",
  databaseURL: "https://todo-app-2e1da.firebaseio.com",
  projectId: "todo-app-2e1da",
  storageBucket: "todo-app-2e1da.appspot.com",
  messagingSenderId: "861015099256",
  appId: "1:861015099256:web:bace6acc91d00e465caa8d",
  measurementId: "G-M18X0KSWHT"
}
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //export const storage = firebase.storage()
  export const storage =new Storage()
  export default firebase 