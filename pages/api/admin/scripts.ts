<-- API จัดการสคริปต์หลังบ้าน (CRUD เบื้องต้น)
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../lib/firebaseAdmin';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken.admin) return res.status(403).json({ error: 'Forbidden' });

    if (req.method === 'GET') {
      const snapshot = await db.collection('scripts').get();
      const scripts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json({ scripts });
    }

    if (req.method === 'POST') {
      const data = req.body;
      await db.collection('scripts').add(data);
      return res.status(201).json({ message: 'Script added' });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

