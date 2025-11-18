// zeiroko-next-firebase/app/api/hosts/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/db';
import User from '../../lib/models/User';
import { requireAuth } from '../_helpers/auth';

export async function GET(req) {
  try {
      // 1. Authentication Check: Ensure a logged-in user is requesting data
          await requireAuth(req); 
              await connectDB();

                  // 2. Query Logic: Find all users who are explicitly hosts and have a defined site/price
                      const hosts = await User.find({
                              role: 'host',
                                      // Ensure they have a site URL to be considered "active"
                                              'profile.siteUrl': { $exists: true, $ne: null }
                                                  })
                                                      // 3. Data Shaping: Select only the public information the Advertiser needs
                                                          .select('email role walletAddress profile') 
                                                              .limit(100) 
                                                                  .lean();

                                                                      return NextResponse.json({ hosts });

                                                                        } catch (err) {
                                                                            // Unauthorized or general error response
                                                                                console.error('Error fetching hosts:', err);
                                                                                    return NextResponse.json({ error: 'Failed to retrieve host listings or unauthorized.' }, { status: 401 });
                                                                                      }
                                                                                      }
                                                                                      