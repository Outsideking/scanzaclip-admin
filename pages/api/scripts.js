import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebaseAdmin";
import { index } from "../../lib/algoliaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const scriptsRef = db.collection("scripts");

  try {
    if (req.method === "GET") {
      // ดึงข้อมูล script ทั้งหมด
      const snapshot = await scriptsRef.get();
      const scripts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(scripts);
    } else if (req.method === "POST") {
      const data = req.body;
      // สร้าง script ใหม่
      const docRef = await scriptsRef.add(data);

      // เพิ่มเข้า Algolia index ด้วย
      await index.saveObject({ ...data, objectID: docRef.id });

      res.status(201).json({ id: docRef.id });
    } else if (req.method === "PUT") {
      const { id, ...data } = req.body;
      await scriptsRef.doc(id).set(data, { merge: true });
      await index.saveObject({ ...data, objectID: id });
      res.status(200).json({ id });
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      await scriptsRef.doc(id).delete();
      await index.deleteObject(id);
      res.status(200).json({ id });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
