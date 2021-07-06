import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAEB5robpkK6J777uJml9u5d1BmEzYeFGo",
  authDomain: "a-contabilidad.firebaseapp.com",
  projectId: "a-contabilidad",
  storageBucket: "a-contabilidad.appspot.com",
  messagingSenderId: "1030216302503",
  appId: "1:1030216302503:web:1ec8d37f6743545df30082"
};
const fb= firebase.initializeApp(firebaseConfig)
const db = fb.firestore()


export {db}
