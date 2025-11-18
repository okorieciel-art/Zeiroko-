import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { connectDB } from "@/lib/mongo";
import Vote from "@/models/Vote";

export async function POST(req) {
  await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
      if (!token) return NextResponse.json({ error: "Missing token" }, { status: 401 });

        const { vote, targetId } = await req.json();

          const decoded = await adminAuth.verifyIdToken(token);

            await Vote.create({
                user: decoded.uid,
                    vote,
                        targetId
                          });

                            return NextResponse.json({ success: true });
                            }