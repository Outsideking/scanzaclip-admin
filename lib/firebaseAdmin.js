// lib/firebaseAdmin.js
import admin from 'firebase-admin';

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // กรณี deploy บน Vercel ใช้ ENV variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // กรณีรัน local ใช้ไฟล์ JSON ที่อยู่ในโปรเจ็ค (ต้อง gitignore ไฟล์นี้ด้วย)
  serviceAccount = require('./scanzaclip.json');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
