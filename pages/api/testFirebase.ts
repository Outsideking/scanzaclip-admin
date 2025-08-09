import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const firestore = admin.firestore();
    const collections = await firestore.listCollections();
    const collectionNames = collections.map(c => c.id);

    res.status(200).json({ success: true, collections: collectionNames });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
