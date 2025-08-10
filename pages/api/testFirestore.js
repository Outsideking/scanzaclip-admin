import { db } from "../../firebaseAdmin";

export default async function handler(req, res) {
  try {
    // สร้างตัวอย่าง collection/document
    const docRef = db.collection("testCollection").doc("testDoc");
    await docRef.set({ message: "Hello from Firestore via Vercel!" });

    res.status(200).json({ success: true, message: "Data written to Firestore" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
