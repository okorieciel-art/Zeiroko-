'use client';
import Link from 'next/link';
import AdminModerationPanel from '../../components/AdminModerationPanel';
import AdminUsersPanel from '../../components/AdminUsersPanel';

export default function AdminPage() {
  return (
      <div style={{ padding: 20 }}>
            <h1>Admin Dashboard</h1>
                  <div style={{ display:'flex', gap:20 }}>
                          <div style={{ width: '65%' }}>
                                    <h2>Moderation</h2>
                                              <AdminModerationPanel />
                                                      </div>
                                                              <div style={{ width: '35%' }}>
                                                                        <h2>Users</h2>
                                                                                  <AdminUsersPanel />
                                                                                          </div>
                                                                                                </div>
                                                                                                      <div style={{ marginTop:20 }}>
                                                                                                              <Link href="/admin/payments"><button className="btn">Payments</button></Link>
                                                                                                                      <Link href="/admin/moderation"><button className="btn" style={{ marginLeft:8 }}>Moderation</button></Link>
                                                                                                                            </div>
                                                                                                                                </div>
                                                                                                                                  );
                                                                                                                                  }
                                                                                                                                  import Navbar from '@/components/Navbar';
                                                                                                                                  import AnimatedCanvasBackground from '@/components/AnimatedCanvasBackground';
                                                                                                                                  import AdminAnalytics from '@/components/AdminAnalytics';
                                                                                                                                  import ThemeToggle from '@/components/ThemeToggle';

                                                                                                                                  export default function AdminHomePage() {
                                                                                                                                    return (
                                                                                                                                        <>
                                                                                                                                              <AnimatedCanvasBackground />
                                                                                                                                                    <Navbar />
                                                                                                                                                          <div style={{ padding:28 }}>
                                                                                                                                                                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                                                                                                                                                            <h1>Admin Dashboard</h1>
                                                                                                                                                                                      <ThemeToggle />
                                                                                                                                                                                              </div>

                                                                                                                                                                                                      <div style={{ marginTop:20 }}>
                                                                                                                                                                                                                <AdminAnalytics />
                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                <div style={{ marginTop:28 }}>
                                                                                                                                                                                                                                          <h2>Moderation & Messaging</h2>
                                                                                                                                                                                                                                                    {/* You can render AdminModerationPanel and messaging UI here */}
                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                      </>
                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        