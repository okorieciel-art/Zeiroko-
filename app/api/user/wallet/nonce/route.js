// app/api/user/wallet/nonce/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { requireAuth } from '@/_helpers/auth';
import { connectDB } from '@/lib/db';

export async function GET(request) {
  try {
      const { decoded, user } = await requireAuth(request);
          await connectDB();

              // generate nonce message (human-friendly)
                  const nonce = 'ZEIROKO-' + crypto.randomBytes(16).toString('hex');
                      const now = new Date();

                          user.walletVerification = { nonce, createdAt: now };
                              // mark walletVerified false until verification completes
                                  user.walletVerified = false;
                                      await user.save();

                                          // For UX, return message to sign (we'll use a formatted message)
                                              const message = `Sign this message to link your wallet to Zeiroko:\n\n${nonce}\n\nThis action will not cost any gas. Nonce expires in 15 minutes.`;

                                                  return NextResponse.json({ nonce, message });
                                                    } catch (err) {
                                                        console.error('nonce error', err);
                                                            return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 });
                                                              }
                                                              }