import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { getJstISOString } from "../utils/time";

const app = initializeApp({
  apiKey: "AIzaSyDX00jV9oifCQ_QzaZL9pSSuR2oulGOdiU",
  authDomain: "pwa-sample-32b5e.firebaseapp.com",
  projectId: "pwa-sample-32b5e",
  storageBucket: "pwa-sample-32b5e.appspot.com",
  messagingSenderId: "892733228631",
  appId: "1:892733228631:web:64d56d4786c208094ec512",
});

export async function requestNotificationPermission() {
  const firestore = getFirestore(app);
  const messaging = getMessaging(app);

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FCM_WEBPUSH_KEY as string,
    });

    if (token) {
      console.log(`Notification token: ${token}`);
      // Add token to Firestore
      await addDoc(collection(firestore, "notification"), {
        token: token,
        userAgent: window.navigator.userAgent,
        created: getJstISOString(),
      });
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
}
