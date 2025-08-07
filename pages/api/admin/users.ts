
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const listUsersResult = await admin.auth().listUsers(1000);
      res.status(200).json(listUsersResult.users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to list users', detail: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
