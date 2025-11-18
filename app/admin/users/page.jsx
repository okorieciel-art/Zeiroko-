'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminUsersPage({}) {
  const [users, setUsers] = useState([]);
    const [token, setToken] = useState(null);

      useEffect(()=> {
          // for demo: expects idToken stored in localStorage as 'ZE_ID_TOKEN'
              const t = localStorage.getItem('ZE_ID_TOKEN');
                  setToken(t);
                      if (t) fetchUsers(t);
                        }, []);

                          async function fetchUsers(t) {
                              const resp = await axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${t}` }});
                                  setUsers(resp.data.users || []);
                                    }

                                      async function makeAdmin(uid) {
                                          if (!token) return alert('Missing token');
                                              await axios.post('/api/admin/onboard', { targetUid: uid }, { headers: { Authorization: `Bearer ${token}` }});
                                                  alert('User promoted');
                                                      fetchUsers(token);
                                                        }

                                                          return (
                                                              <div>
                                                                    <h3>Users</h3>
                                                                          <table>
                                                                                  <thead><tr><th>Email</th><th>UID</th><th>Role</th><th>Actions</th></tr></thead>
                                                                                          <tbody>
                                                                                                    {users.map(u=>(
                                                                                                                <tr key={u._id}>
                                                                                                                              <td>{u.email}</td>
                                                                                                                                            <td style={{ fontSize:12 }}>{u.firebaseUid}</td>
                                                                                                                                                          <td>{u.role}</td>
                                                                                                                                                                        <td><button className="btn" onClick={()=>makeAdmin(u.firebaseUid)}>Make Admin</button></td>
                                                                                                                                                                                    </tr>
                                                                                                                                                                                              ))}
                                                                                                                                                                                                      </tbody>
                                                                                                                                                                                                            </table>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                  );
                                                                                                                                                                                                                  }