// app/api/user/wallet/verify/route.js
import { NextResponse } from 'next/server';
import { verifyMessage } from 'ethers/lib/utils.js'; // ethers v6
import { requireAuth } from '@/_helpers/auth';
import { connectDB } from '@/lib/db';

export async function POST(request) {
  try {
      const { decoded, user } = await requireAuth(request);
          await connectDB();

              const body = await request.json();
                  const { address, signature } = body;
                      if (!address || !signature) return NextResponse.json({ error: 'Missing address or signature' }, { status: 400 });

                          // check saved nonce
                              const saved = user.walletVerification;
                                  if (!saved || !saved.nonce) return NextResponse.json({ error: 'No nonce found. Request a new one.' }, { status: 400 });

                                      // check expiry (15 minutes)
                                          const created = new Date(saved.createdAt || 0);
                                              if ((Date.now() - created.getTime()) > 15 * 60 * 1000) {
                                                    user.walletVerification = undefined;
                                                          await user.save();
                                                                return NextResponse.json({ error: 'Nonce expired. Request again.' }, { status: 400 });
                                                                    }

                                                                        // recreate the message exactly as the frontend signed it
                                                                            const message = `Sign this message to link your wallet to Zeiroko:\n\n${saved.nonce}\n\nThis action will not cost any gas. Nonce expires in 15 minutes.`;

                                                                                // recover signer
                                                                                    let recovered;
                                                                                        try {
                                                                                              recovered = verifyMessage(message, signature);
                                                                                                  } catch (err) {
                                                                                                        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
                                                                                                            }

                                                                                                                if (recovered.toLowerCase() !== address.toLowerCase()) {
                                                                                                                      return NextResponse.json({ error: 'Signature does not match address' }, { status: 400 });
                                                                                                                          }

                                                                                                                              // success — save wallet address and mark as verified
                                                                                                                                  user.walletAddress = address;
                                                                                                                                      user.walletVerified = true;
                                                                                                                                          user.walletVerification = undefined; // clear nonce
                                                                                                                                              await user.save();

                                                                                                                                                  return NextResponse.json({ ok: true, walletAddress: address });
                                                                                                                                                    } catch (err) {
                                                                                                                                                        console.error('verify wallet error', err);
                                                                                                                                                            return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 });
                                                                                                                                                              }
                                                                                                                                                              }