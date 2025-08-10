import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // หรือใช้ไฟล์ JSON
});

async function createAdminUser(email: string, password: string) {
  try {
    // สร้าง user
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // กำหนดสิทธิ์ admin ผ่าน custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });

    console.log(`Admin user created: ${userRecord.uid}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// เรียกใช้
createAdminUser('admin@yourdomain.com', 'StrongPassword123');
