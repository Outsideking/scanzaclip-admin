import React, { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  createdAt: any;
};

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h2>Admin Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.permissions.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
