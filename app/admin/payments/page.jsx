'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPaymentsPage(){
  const [payments, setPayments] = useState([]);
    const token = typeof window !== 'undefined' ? localStorage.getItem('ZE_ID_TOKEN') : null;

      useEffect(()=>{ if (token) fetchHeld(); }, [token]);

        async function fetchHeld(){
            const resp = await axios.get('/api/admin', { headers: { Authorization: `Bearer ${token}` }});
                setPayments(resp.data.payments || []);
                  }

                    async function requestRelease(id){
                        await axios.post('/api/admin', { paymentId: id }, { headers: { Authorization: `Bearer ${token}` }});
                            alert('Release requested');
                                fetchHeld();
                                  }
  
                                    return (
                                        <div>
                                              <h3>Held payments</h3>
                                                    {payments.map(p=>(
                                                            <div key={p._id} style={{ padding:12, borderRadius:8, background:'#081027', marginBottom:8 }}>
                                                                      <div>{p._id} — {p.amount} {p.currency} — {p.status}</div>
                                                                                <div><button className="btn" onClick={()=>requestRelease(p._id)}>Request release</button></div>
                                                                                        </div>
                                                                                              ))}
                                                                                                  </div>
                                                                                                    );
                                                                                                    }