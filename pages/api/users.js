// pages/api/users.js
import admin from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  const db = admin.firestore();

  if (req.method === 'GET') {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(users);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
