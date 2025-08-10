import { db } from "../../../firebaseAdmin";

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const snapshot = await db
      .collection("helpArticles")
      .where("keywords", "array-contains", query.toLowerCase())
      .get();

    const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
