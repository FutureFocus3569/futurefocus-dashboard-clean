import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCpKiqNcw7Q_qmX81hbXsQ9EaUAyv2UBao',
  authDomain: 'leadascend-83acb.firebaseapp.com',
  projectId: 'leadascend-83acb',
  storageBucket: 'leadascend-83acb.appspot.com',
  messagingSenderId: '921063238084',
  appId: '1:921063238084:web:1738efa155e3da86cb1c91',
  measurementId: 'G-12MHW7R3QB',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
export default app;
