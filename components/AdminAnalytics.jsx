
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MiniBarChart({ data }) {
  // data: [{label, value}]
    const max = Math.max(...data.map(d=>d.value), 1);
      return (
          <svg width="100%" height="60" viewBox={`0 0 ${data.length*20} 60`} preserveAspectRatio="none">
                {data.map((d,i) => {
                        const h = (d.value/max) * 50;
                                const x = i*20 + 4;
                                        return <rect key={i} x={x} y={60-h-4} width="12" height={h} rx="3" fill="url(#g)" />;
                                              })}
                                                    <defs>
                                                            <linearGradient id="g" x1="0" x2="1">
                                                                      <stop offset="0%" stopColor="var(--accent1)"/>
                                                                                <stop offset="100%" stopColor="var(--accent2)"/>
                                                                                        </linearGradient>
                                                                                              </defs>
                                                                                                  </svg>
                                                                                                    );
                                                                                                    }

                                                                                                    export default function AdminAnalytics() {
                                                                                                      const [stats, setStats] = useState(null);
                                                                                                        const token = typeof window !== 'undefined' ? localStorage.getItem('ZE_ID_TOKEN') : null;

                                                                                                          useEffect(()=>{ if (token) fetchStats(); }, [token]);

                                                                                                            async function fetchStats() {
                                                                                                                try {
                                                                                                                      const resp = await axios.get('/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } });
                                                                                                                            setStats(resp.data);
                                                                                                                                } catch (err) {
                                                                                                                                      console.error(err);
                                                                                                                                          }
                                                                                                                                            }

                                                                                                                                              if (!stats) return <div>Loading analytics...</div>;

                                                                                                                                                const votesSeries = stats.votes.map(v => ({ label: v._id.split('-').slice(1).join('-'), value: v.count }));

                                                                                                                                                  return (
                                                                                                                                                      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
                                                                                                                                                            <div style={{ padding:18, borderRadius:12, background:'var(--panel)' }}>
                                                                                                                                                                    <h4>Users</h4>
                                                                                                                                                                            <div style={{ fontSize:28 }}>{stats.totalUsers}</div>
                                                                                                                                                                                    <div style={{ fontSize:12, color:'var(--muted)' }}>{stats.totalHosts} hosts • {stats.totalAdvertisers} advertisers</div>
                                                                                                                                                                                          </div>

                                                                                                                                                                                                <div style={{ padding:18, borderRadius:12, background:'var(--panel)' }}>
                                                                                                                                                                                                        <h4>Payments</h4>
                                                                                                                                                                                                                <div style={{ fontSize:28 }}>{stats.totalPayments}</div>
                                                                                                                                                                                                                        <div style={{ fontSize:12, color:'var(--muted)' }}>{stats.heldPayments} held</div>
                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                    <div style={{ padding:18, borderRadius:12, background:'var(--panel)' }}>
                                                                                                                                                                                                                                            <h4>Votes (last 14d)</h4>
                                                                                                                                                                                                                                                    <div style={{ marginTop:8 }}>
                                                                                                                                                                                                                                                              <MiniBarChart data={votesSeries} />
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                  