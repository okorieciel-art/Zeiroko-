import { NextResponse } from 'next/server';
import { Client, resources } from 'coinbase-commerce-node';
import { connectDB } from '../../../../lib/db';
import Payment from '../../../../lib/models/Payment';

Client.init(process.env.COINBASE_COMMERCE_API_KEY);
const { Charge } = resources;

export async function POST(req) {
  const body = await req.json();
    const { buyerUid, hostUid, amount, currency = 'USD', campaign } = body;
      if (!buyerUid || !hostUid || !amount) return NextResponse.json({ error: 'Missing params' }, { status: 400 });
        await connectDB();
          const payment = new Payment({ amount, currency, status: 'NEW', buyerUid, hostUid, campaign });
            await payment.save();

              const chargeData = {
                  name: `Zeiroko booking #${payment._id}`,
                      description: campaign?.title || 'Banner booking',
                          local_price: { amount: String(amount), currency },
                              pricing_type: 'fixed_price',
                                  metadata: { paymentId: String(payment._id) },
                                      redirect_url: `${process.env.NEXT_PUBLIC_URL}/payment-success?paymentId=${payment._id}`,
                                          cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment-cancel?paymentId=${payment._id}`
                                            };

                                              try {
                                                  const charge = await Charge.create(chargeData);
                                                      payment.chargeId = charge.id;
                                                          payment.status = 'PENDING';
                                                              await payment.save();
                                                                  return NextResponse.json({ hosted_url: charge.hosted_url, charge });
                                                                    } catch (err) {
                                                                        return NextResponse.json({ error: 'Coinbase create error' }, { status: 500 });
                                                                          }
                                                                          }