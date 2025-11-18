'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Messaging({ threadId, otherUserUid }) {
  const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
      const [sending, setSending] = useState(false);
        const idToken = typeof window !== 'undefined' ? localStorage.getItem('ZE_ID_TOKEN') : null;
          const listRef = useRef();

            async function load() {
                if (!threadId) return;
                    const resp = await fetch(`/api/messages?threadId=${encodeURIComponent(threadId)}`, {
                          headers: { Authorization: `Bearer ${idToken}` }
                              });
                                  const json = await resp.json();
                                      setMessages(json.messages || []);
                                          // scroll to bottom
                                              setTimeout(()=> listRef.current && (listRef.current.scrollTop = listRef.current.scrollHeight), 50);
                                                }

                                                  useEffect(()=>{ load(); const iv = setInterval(load, 5000); return ()=>clearInterval(iv); }, [threadId]);

                                                    async function send() {
                                                        if (!text.trim()) return;
                                                            setSending(true);
                                                                try {
                                                                      const resp = await fetch('/api/messages', {
                                                                              method: 'POST',
                                                                                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
                                                                                              body: JSON.stringify({ threadId, toUid: otherUserUid, text })
                                                                                                    });
                                                                                                          const json = await resp.json();
                                                                                                                if (json.message) {
                                                                                                                        setText('');
                                                                                                                                load();
                                                                                                                                      } else {
                                                                                                                                              alert('Send error: ' + (json.error || 'unknown'));
                                                                                                                                                    }
                                                                                                                                                        } catch (err) {
                                                                                                                                                              alert('Send failed');
                                                                                                                                                                  } finally { setSending(false); }
                                                                                                                                                                    }

                                                                                                                                                                      return (
                                                                                                                                                                          <div style={{ width:'100%', maxWidth:900, margin:'0 auto', display:'flex', flexDirection:'column', gap:12 }}>
                                                                                                                                                                                <div ref={listRef} style={{ height:380, overflowY:'auto', padding:12, borderRadius:10, background:'var(--panel)' }}>
                                                                                                                                                                                        {messages.map(m => (
                                                                                                                                                                                                  <div key={m._id} style={{ marginBottom:10, display:'flex', flexDirection: m.fromUid === localStorage.getItem('ZE_UID') ? 'row-reverse' : 'row' }}>
                                                                                                                                                                                                              <div style={{ maxWidth:'70%', padding:10, borderRadius:8, background: m.fromUid === localStorage.getItem('ZE_UID') ? 'linear-gradient(90deg,var(--accent1),var(--accent2))' : 'rgba(255,255,255,0.04)', color: m.fromUid === localStorage.getItem('ZE_UID') ? '#fff' : 'var(--text)' }}>
                                                                                                                                                                                                                            <div style={{ whiteSpace:'pre-wrap' }}>{m.text}</div>
                                                                                                                                                                                                                                          {m.attachments && m.attachments.map((a,i)=> <img key={i} src={a} style={{ maxWidth:200, marginTop:8, borderRadius:6 }} />)}
                                                                                                                                                                                                                                                        <div style={{ fontSize:11, opacity:0.7, marginTop:6 }}>{new Date(m.createdAt).toLocaleString()}</div>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                      ))}
                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                  <div style={{ display:'flex', gap:8 }}>
                                                                                                                                                                                                                                                                                                          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a message..." style={{ flex:1, padding:12, borderRadius:8, border:'1px solid rgba(255,255,255,0.06)', background:'transparent' }} />
                                                                                                                                                                                                                                                                                                                  <button className="glow-btn" onClick={send} disabled={sending}>{sending ? 'Sending...' : 'Send'}</button>
                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                              }