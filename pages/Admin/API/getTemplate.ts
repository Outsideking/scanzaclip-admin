import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const doc = await admin.firestore().collection('templates').doc('default').get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.status(200).json(doc.data());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch template' });
  }
}

