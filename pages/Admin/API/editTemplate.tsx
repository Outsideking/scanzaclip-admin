import React, { useEffect, useState } from 'react';

export default function EditTemplate() {
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/admin/api/getTemplate')
      .then(res => res.json())
      .then(data => {
        setTemplate(data);
        setLoading(false);
      })
      .catch(() => setError('Failed to load template'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTemplate({
      ...template,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch('/admin/api/updateTemplate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template),
      });
      if (!res.ok) throw new Error('Failed to save');
      alert('Template saved successfully!');
    } catch {
      setError('Failed to save template');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Template</h1>
      <textarea
        name="script"
        rows={10}
        style={{ width: '100%' }}
        value={template?.script || ''}
        onChange={handleChange}
      />
      <button onClick={handleSave} style={{ marginTop: 10 }}>
        Save
      </button>
    </div>
  );
}
