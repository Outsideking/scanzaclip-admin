// firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), 
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
  });
}

export const db = admin.firestore();
