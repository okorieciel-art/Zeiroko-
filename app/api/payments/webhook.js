import { NextResponse } from "next/server";
import CoinbaseCommerce from "coinbase-commerce-node";
import { connectDB } from "@/lib/mongo";

export async function POST(req) {
  await connectDB();

    const body = await req.text();
      const signature = req.headers.get("x-cc-webhook-signature");

        try {
            const event = CoinbaseCommerce.Webhook.verifyEventBody(
                  body,
                        signature,
                              process.env.COINBASE_WEBHOOK_SECRET
                                  );

                                      console.log("EVENT:", event.event.type);

                                          return NextResponse.json({ received: true });
                                              
                                                } catch (err) {
                                                    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
                                                      }
                                                      }