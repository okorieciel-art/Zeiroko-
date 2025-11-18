import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import User from '../../../../lib/models/User';
import { requireAuth } from '../../../_helpers/auth';

export async function POST(req) {
  try {
      const { decoded, user } = await requireAuth(req);
          // Only existing admin can onboard new admin
              if (user.role !== 'admin') return NextResponse.json({ error:'Forbidden' }, { status:403 });
                  const { targetUid } = await req.json();
                      if (!targetUid) return NextResponse.json({ error:'Missing targetUid' }, { status:400 });
                          await connectDB();
                              const u = await User.findOne({ firebaseUid: targetUid });
                                  if (!u) return NextResponse.json({ error:'User not found' }, { status:404 });
                                      u.role = 'admin';
                                          await u.save();
                                              return NextResponse.json({ ok:true, user: u });
                                                } catch (err) {
                                                    return NextResponse.json({ error: err.message }, { status:401 });
                                                      }
                                                      }