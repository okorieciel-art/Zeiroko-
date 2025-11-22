import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Payment from '@/lib/models/Payment';
import { requireAuth } from '@/_helpers/auth';

export async function GET(req) {
  try {
      const { decoded, user } = await requireAuth(req);
          if (user.role !== 'admin') return NextResponse.json({ error:'Forbidden' }, { status:403 });
              await connectDB();
                  const held = await Payment.find({ status: { $in: ['HELD','PENDING','RELEASE_REQUESTED'] } }).sort({ createdAt:-1 });
                      return NextResponse.json({ payments: held });
                        } catch (err) {
                            return NextResponse.json({ error: err.message }, { status:401 });
                              }
                              }

                              export async function POST(req) {
                                try {
                                    const { decoded, user } = await requireAuth(req);
                                        if (user.role !== 'admin') return NextResponse.json({ error:'Forbidden' }, { status:403 });
                                            const { paymentId } = await req.json();
                                                if (!paymentId) return NextResponse.json({ error:'Missing paymentId' }, { status:400 });
                                                    await connectDB();
                                                        const p = await Payment.findById(paymentId);
                                                            if (!p) return NextResponse.json({ error:'Not found' }, { status:404 });
                                                                p.status = 'RELEASE_REQUESTED';
                                                                    p.metadata = { ...p.metadata, releaseRequestedBy: user.firebaseUid, releaseRequestedAt: new Date() };
                                                                        await p.save();
                                                                            return NextResponse.json({ ok:true, payment: p });
                                                                              } catch (err) {
                                                                                  return NextResponse.json({ error: err.message }, { status:401 });
                                                                                    }
                                                                                    }