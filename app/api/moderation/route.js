import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Screenshot from '../../../lib/models/Screenshot';
import { requireAuth } from '../_helpers/auth';

export async function POST(req) {
  try {
      const { decoded, user } = await requireAuth(req);
          if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
              await connectDB();
                  const { screenshotId, action, reason } = await req.json();
                      const s = await Screenshot.findById(screenshotId);
                          if (!s) return NextResponse.json({ error: 'Not found' }, { status:404 });
                              if (action === 'approve') { s.status = 'APPROVED'; s.reason = reason || 'Approved'; }
                                  else if (action === 'reject') { s.status = 'REJECTED'; s.reason = reason || 'Rejected'; }
                                      await s.save();
                                          return NextResponse.json({ ok:true, screenshot: s });
                                            } catch (err) {
                                                return NextResponse.json({ error: err.message }, { status: 401 });
                                                  }
                                                  }