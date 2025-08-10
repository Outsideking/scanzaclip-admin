// pages/admin/help/index.js
import { useState } from "react";

export default function HelpAdmin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("th");
  const [keywords, setKeywords] = useState("");

  async function createArticle() {
    const res = await fetch("/api/help/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        language,
        keywords: keywords.split(",").map(k => k.trim())
      }),
    });
    const data = await res.json();
    alert(data.success ? "บันทึกสำเร็จ" : data.error);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">จัดการระบบ Help</h1>
      <input
        className="border p-2 w-full mt-2"
        placeholder="หัวข้อ"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mt-2"
        placeholder="เนื้อหา"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <input
        className="border p-2 w-full mt-2"
        placeholder="คำค้นหา (คั่นด้วย , )"
        value={keywords}
        onChange={e => setKeywords(e.target.value)}
      />
      <button
        onClick={createArticle}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        เพิ่มบทความ
      </button>
    </div>
  );
}
