import { NextResponse } from 'next/server';
import { requireAuth } from '../_helpers/auth';
import { connectDB } from '@/lib/db';
import Message from '@/lib/models/Message';

/*
GET -> ?threadId=abc -> returns messages in thread (latest 200)
POST -> body: { threadId, toUid, text, attachments[] } -> creates message
*/
export async function GET(req) {
  try {
      const { decoded, user } = await requireAuth(req);
          const url = new URL(req.url);
              const threadId = url.searchParams.get('threadId');
                  if (!threadId) return NextResponse.json({ error: 'Missing threadId' }, { status: 400 });
                      await connectDB();
                          const msgs = await Message.find({ threadId }).sort({ createdAt: 1 }).limit(500).lean();
                              return NextResponse.json({ messages: msgs });
                                } catch (err) {
                                    return NextResponse.json({ error: err.message }, { status: 401 });
                                      }
                                      }

                                      export async function POST(req) {
                                        try {
                                            const { decoded, user } = await requireAuth(req);
                                                const body = await req.json();
                                                    const { threadId, toUid, text, attachments } = body;
                                                        if (!threadId || !toUid || (!text && (!attachments || attachments.length===0))) {
                                                              return NextResponse.json({ error: 'Missing data' }, { status: 400 });
                                                                  }
                                                                      await connectDB();
                                                                          const m = await Message.create({ threadId, fromUid: user.firebaseUid, toUid, text, attachments: attachments || [] });
                                                                              return NextResponse.json({ message: m });
                                                                                } catch (err) {
                                                                                    return NextResponse.json({ error: err.message }, { status: 401 });
                                                                                      }
                                                                                      }