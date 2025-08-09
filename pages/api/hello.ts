import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const collections = await admin.firestore().listCollections();
    const names = collections.map(c => c.id);
    res.status(200).json({ ok: true, collections: names });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
