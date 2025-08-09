import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // ตัวอย่างรับ token จาก client เพื่อยืนยันตัวตน
    const { idToken } = req.body;
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      return res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
