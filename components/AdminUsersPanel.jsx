'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminUsersPanel() {
  const [users, setUsers] = useState([]);
    const token = typeof window !== 'undefined' ? localStorage.getItem('ZE_ID_TOKEN') : null;

      useEffect(()=>{ if (token) fetchUsers(); }, [token]);

        async function fetchUsers() {
            const resp = await axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` }});
                setUsers(resp.data.users || []);
                  }

                    return (
                        <div>
                              <h4>Users</h4>
                                    <div style={{ maxHeight: 420, overflowY: 'auto' }}>
                                            {users.map(u => (
                                                      <div key={u._id} style={{ padding:8, borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                                                                  <div><strong>{u.email}</strong> <small>{u.role}</small></div>
                                                                              <div style={{ fontSize:12 }}>{u.firebaseUid}</div>
                                                                                        </div>
                                                                                                ))}
                                                                                                      </div>
                                                                                                          </div>
                                                                                                            );
                                                                                                            }