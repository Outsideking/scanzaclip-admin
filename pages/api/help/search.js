import { db } from "../../../firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { q, language } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query" });

    const articlesRef = db.collection("helpArticles");
    const snapshot = await articlesRef
      .where("language", "==", language || "th")
      .get();

    const results = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(article =>
        article.keywords.some(k => k.includes(q.toLowerCase()))
      );

    // เก็บ log การค้นหา
    await db.collection("helpSearchLogs").add({
      query: q,
      language: language || "th",
      resultsCount: results.length,
      searchedAt: new Date()
    });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
