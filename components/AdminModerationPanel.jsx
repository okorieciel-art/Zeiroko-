'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminModerationPanel() {
  const [screens, setScreens] = useState([]);
    const token = typeof window !== 'undefined' ? localStorage.getItem('ZE_ID_TOKEN') : null;

      useEffect(()=>{ if (token) fetchPending(); }, [token]);

        async function fetchPending() {
            const resp = await axios.get('/api/admin/screenshot-pending', { headers: { Authorization: `Bearer ${token}` }});
                setScreens(resp.data.screens || []);
                  }

                    async function takeAction(id, action) {
                        await axios.post('/api/moderation', { screenshotId: id, action }, { headers: { Authorization: `Bearer ${token}` }});
                            alert('Action applied');
                                fetchPending();
                                  }

                                    return (
                                        <div>
                                              <h4>Pending screenshots</h4>
                                                    {screens.map(s => (
                                                            <div key={s._id} style={{ padding:12, borderRadius:8, background:'#07102a', marginBottom:8 }}>
                                                                      <img src={s.url} alt="s" style={{ maxWidth: '100%', borderRadius:6 }} />
                                                                                <div style={{ marginTop:8 }}>
                                                                                            <button className="btn" onClick={()=>takeAction(s._id, 'approve')}>Approve</button>
                                                                                                        <button className="btn" onClick={()=>takeAction(s._id, 'reject')} style={{ marginLeft:8 }}>Reject</button>
                                                                                                                  </div>
                                                                                                                          </div>
                                                                                                                                ))}
                                                                                                                                    </div>
                                                                                                                                      );
                                                                                                                                      }