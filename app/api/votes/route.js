import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vote from '@/lib/models/Vote';
import { requireAuth } from '@/_helpers/auth';

export async function POST(req) {
  try {
      const { decoded, user } = await requireAuth(req);
          await connectDB();
              const body = await req.json();
                  const { targetUid, score, reason, note, screenshotUrl } = body;
                      if (![1,2,3,4,5].includes(Number(score))) return NextResponse.json({ error: 'Invalid score' }, { status: 400 });

                          // prevent duplicate vote within 24h by same voter on same target
                              const since = new Date(Date.now() - 24*3600*1000);
                                  const recent = await Vote.findOne({ voterUid: user.firebaseUid, targetUid, createdAt: { $gte: since }});
                                      if (recent) return NextResponse.json({ error: 'Already voted recently' }, { status: 429 });

                                          const v = new Vote({ voterUid: user.firebaseUid, targetUid, score, reason, note, screenshotUrl });
                                              await v.save();
                                                  return NextResponse.json({ ok: true, vote: v });
                                                    } catch (err) {
                                                        return NextResponse.json({ error: err.message }, { status: 401 });
                                                          }
                                                          }

                                                          export async function GET(req) {
                                                            const q = new URL(req.url);
                                                              const userId = q.searchParams.get('userId');
                                                                await connectDB();
                                                                  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
                                                                    const votes = await Vote.find({ targetUid: userId }).sort({ createdAt:-1 }).limit(200);
                                                                      const agg = await Vote.aggregate([{ $match: { targetUid: userId } }, { $group: { _id: "$targetUid", avg: { $avg: "$score" }, count: { $sum: 1 } } }]);
                                                                        return NextResponse.json({ votes, stats: agg[0] || { avg:0, count:0 } });
                                                                        }