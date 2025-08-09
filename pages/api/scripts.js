// pages/api/scripts.js
import admin from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  const db = admin.firestore();

  if (req.method === 'GET') {
    const snapshot = await db.collection('scripts').get();
    const scripts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(scripts);
  }

  if (req.method === 'POST') {
    const { name, content } = req.body;
    if (!name || !content) return res.status(400).json({ error: 'Missing fields' });
    const newDoc = await db.collection('scripts').add({ name, content, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.status(201).json({ id: newDoc.id });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
