import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const usersSnapshot = await db.collection('users').get();
    const rolesSnapshot = await db.collection('roles').get();

    const roles: Record<string, string[]> = {};
    rolesSnapshot.forEach(doc => {
      roles[doc.id] = doc.data().permissions;
    });

    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        role: data.role,
        permissions: roles[data.role] || [],
        createdAt: data.createdAt,
      };
    });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
