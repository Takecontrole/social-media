import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQUkPEi3LbY5BgFtKUbZVH7Pt7rgU0I2k",
  authDomain: "music-app-76243.firebaseapp.com",
  projectId: "music-app-76243",
  storageBucket: "music-app-76243.appspot.com",
  messagingSenderId: "861843854754",
  appId: "1:861843854754:web:05dfb1a1269c994d2ecefb"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
