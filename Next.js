import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (decodedToken.admin) {
      return res.status(200).json({ message: 'Welcome admin!' });
    } else {
      return res.status(403).json({ error: 'Forbidden, not admin' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
