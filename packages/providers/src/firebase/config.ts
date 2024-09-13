import {initializeApp} from "firebase/app";
import {
  ReCaptchaEnterpriseProvider,
  initializeAppCheck,
} from "firebase/app-check";

const RECAPTCHA_SITE_KEY = "6Lf1IycqAAAAALR2YgmNb9ZSd_wf3EZ3UOGznV6B";
const recaptchaProvider = new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyCJ4npseLnhcrOYX8Ydb82bf83BK-TQD6s",
  authDomain: "cam-is-bored.firebaseapp.com",
  projectId: "cam-is-bored",
  storageBucket: "cam-is-bored.appspot.com",
  messagingSenderId: "832727775811",
  appId: "1:832727775811:web:38664df935ebff5b70f2f6",
  measurementId: "G-FBHP6BWN72",
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = "5303AB20-368A-4FDA-916E-226BF9DB73D1";
}

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAppCheck = initializeAppCheck(firebaseApp, {
  provider: recaptchaProvider,
  isTokenAutoRefreshEnabled: true,
});

export default firebaseAppCheck;
