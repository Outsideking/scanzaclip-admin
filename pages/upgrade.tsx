import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Button } from "@/components/ui/button";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function UpgradePlan() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    }
    fetchUsers();
  }, []);

  const handleUpgrade = async (userId, newPlan) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { plan: newPlan });
    setUsers(users.map(u => (u.id === userId ? { ...u, plan: newPlan } : u)));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Manage User Plans</h1>
      {users.map(user => (
        <div key={user.id} className="flex justify-between items-center border p-4 rounded-md">
          <div>
            <p><strong>{user.email}</strong></p>
            <p>Current Plan: {user.plan}</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => handleUpgrade(user.id, "Free")}>Free</Button>
            <Button onClick={() => handleUpgrade(user.id, "Premium")}>Premium</Button>
          </div>
        </div>
      ))}
    </div>
  );
}