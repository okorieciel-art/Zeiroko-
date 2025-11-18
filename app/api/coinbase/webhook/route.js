import { NextResponse } from 'next/server';
import { Webhook, Client } from 'coinbase-commerce-node';
import { connectDB } from '../../../../lib/db';
import Payment from '../../../../lib/models/Payment';

Client.init(process.env.COINBASE_COMMERCE_API_KEY);
const webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

export async function POST(req) {
  const raw = await req.text();
    const signature = req.headers.get('x-cc-webhook-signature');
      try {
          const event = Webhook.verifyEventBody(raw, signature, webhookSecret);
              const { type, data } = event;
                  const paymentId = data?.metadata?.paymentId;
                      if (!paymentId) return NextResponse.json({ ok: true });

                          await connectDB();
                              const p = await Payment.findById(paymentId);
                                  if (!p) return NextResponse.json({ ok: true });

                                      if (type === 'charge:confirmed' || type === 'charge:resolved') {
                                            p.status = 'HELD';
                                                  await p.save();
                                                      } else if (type === 'charge:failed') {
                                                            p.status = 'FAILED';
                                                                  await p.save();
                                                                      }
                                                                          return NextResponse.json({ ok: true });
                                                                            } catch (err) {
                                                                                console.error('Webhook verify failed', err);
                                                                                    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
                                                                                      }
                                                                                      }