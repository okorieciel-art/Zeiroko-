import { NextResponse } from "next/server";
import CoinbaseCommerce from "coinbase-commerce-node";
import { connectDB } from "@/lib/mongo";

export async function POST(req) {
  await connectDB();

    CoinbaseCommerce.Client.init(process.env.COINBASE_API_KEY);
      const Charge = CoinbaseCommerce.resources.Charge;

        const body = await req.json();

          const chargeData = {
              name: "Zeiroko Escrow Payment",
                  description: "Advertising Escrow Payment",
                      local_price: {
                            amount: body.amount,
                                  currency: "USD"
                                      },
                                          pricing_type: "fixed_price",
                                              metadata: {
                                                    advertiser: body.uid,
                                                          host: body.hostId
                                                              }
                                                                };

                                                                  const charge = await Charge.create(chargeData);

                                                                    return NextResponse.json(charge);
                                                                    }