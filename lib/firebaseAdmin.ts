import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // หรือใช้ไฟล์ serviceAccountKey.json
  });
}

const db = admin.firestore();

export { admin, db };
<-- initialize Firebase Admin SDK
