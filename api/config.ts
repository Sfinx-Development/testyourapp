import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsx4WROBBfjFdtagrbrvKHiSKZvpjmxh8",
  authDomain: "testyourapp-89234.firebaseapp.com",
  projectId: "testyourapp-89234",
  storageBucket: "testyourapp-89234.appspot.com",
  messagingSenderId: "611224092790",
  appId: "1:611224092790:web:c413434cfa708250cedf57",
  measurementId: "G-M3YPLG53PS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
