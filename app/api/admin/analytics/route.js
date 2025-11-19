import { NextResponse } from 'next/server';
import { requireAuth } from '@/_helpers/auth';
import { connectDB } from '@/lib/db';
import Vote from '@/lib/models/Vote';
import Payment from '@/lib/models/Payment';
import User from '@/lib/models/User';

export async function GET(req) {
  try {
      const { decoded, user } = await requireAuth(req);
          // only admins allowed
              if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

                  await connectDB();
                      const totalUsers = await User.countDocuments();
                          const totalHosts = await User.countDocuments({ role: 'host' });
                              const totalAdvertisers = await User.countDocuments({ role: 'advertiser' });
                                  const totalPayments = await Payment.countDocuments();
                                      const heldPayments = await Payment.countDocuments({ status: 'HELD' });

                                          // votes per day for last 14 days:
                                              const since = new Date();
                                                  since.setDate(since.getDate() - 13);
                                                      const votes = await Vote.aggregate([
                                                            { $match: { createdAt: { $gte: since } } },
                                                                  { $project: { day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, score: '$score' } },
                                                                        { $group: { _id: '$day', count: { $sum: 1 }, avg: { $avg: '$score' } } },
                                                                              { $sort: { _id: 1 } }
                                                                                  ]);

                                                                                      return NextResponse.json({ totalUsers, totalHosts, totalAdvertisers, totalPayments, heldPayments, votes });
                                                                                        } catch (err) {
                                                                                            return NextResponse.json({ error: err.message }, { status: 401 });
                                                                                              }
                                                                                              }
                                                                                              