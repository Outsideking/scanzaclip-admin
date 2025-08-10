<-- API สำหรับล็อกอิน (Firebase Auth)

import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ error: 'Missing idToken' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const isAdmin = decodedToken.admin === true;

    if (!isAdmin) return res.status(403).json({ error: 'Not authorized' });

    res.status(200).json({ message: 'Login successful', uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
