<-- UI ระบบหลังบ้าน (หน้าแรก)
import React, { useEffect, useState } from 'react';
import { auth } from '../../lib/firebaseClient';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [scripts, setScripts] = useState<any[]>([]);
  const [newScript, setNewScript] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => setUser(currentUser));
  }, []);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in');
    } catch {
      alert('Login failed');
    }
  };

  const fetchScripts = async () => {
    if (!user) return;
    const token = await user.getIdToken();

    const res = await fetch('/api/admin/scripts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setScripts(data.scripts || []);
  };

  const addScript = async () => {
    if (!user || !newScript) return;
    const token = await user.getIdToken();

    await fetch('/api/admin/scripts', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newScript }),
    });

    setNewScript('');
    fetchScripts();
  };

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Login</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <button onClick={fetchScripts}>Load Scripts</button>
      <ul>
        {scripts.map(script => (
          <li key={script.id}>{script.content}</li>
        ))}
      </ul>
      <input placeholder="New script content" value={newScript} onChange={e => setNewScript(e.target.value)} />
      <button onClick={addScript}>Add Script</button>
    </div>
  );
}
