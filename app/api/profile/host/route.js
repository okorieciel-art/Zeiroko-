// zeiroko-next-firebase/app/api/profile/host/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import User from '../../../lib/models/User';
import { requireAuth } from '../_helpers/auth';

// Handles POST request to update Host profile
export async function POST(req) {
  try {
      const { user } = await requireAuth(req);
          const body = await req.json();
              
                  const { siteUrl, price } = body;
                      if (!siteUrl || price === undefined) {
                            return NextResponse.json({ error: 'Missing site URL or price' }, { status: 400 });
                                }

                                    await connectDB();

                                        // 1. Update the user's role if they are registering as a Host for the first time
                                            if (user.role !== 'host' && user.role !== 'admin') {
                                                    user.role = 'host';
                                                        }

                                                            // 2. Update the profile fields (assuming price is sent as a number)
                                                                user.profile.siteUrl = siteUrl;
                                                                    user.profile.pricePerBanner = parseFloat(price);
                                                                        
                                                                            // 3. Save the changes
                                                                                await user.save();

                                                                                    return NextResponse.json({ 
                                                                                            ok: true, 
                                                                                                    message: 'Host profile saved successfully',
                                                                                                            user: { 
                                                                                                                        email: user.email, 
                                                                                                                                    role: user.role, 
                                                                                                                                                profile: user.profile 
                                                                                                                                                        } 
                                                                                                                                                            });

                                                                                                                                                              } catch (err) {
                                                                                                                                                                  console.error('Host profile save error:', err);
                                                                                                                                                                      return NextResponse.json({ error: err.message || 'Authentication failed or server error.' }, { status: 401 });
                                                                                                                                                                        }
                                                                                                                                                                        }
                                                                                                                                                                        