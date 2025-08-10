import { db } from "../../../firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, content, language, keywords, categoryId } = req.body;

    if (!title || !content || !language) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const docRef = await db.collection("helpArticles").add({
      title,
      content,
      language,
      keywords: keywords?.map(k => k.toLowerCase()) || [],
      categoryId: categoryId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
