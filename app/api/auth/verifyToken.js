import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Missing token" }, { status: 401 });

      const token = authHeader.split(" ")[1];

        try {
            const decoded = await adminAuth.verifyIdToken(token);
                return NextResponse.json({ user: decoded });
                  } catch (err) {
                      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
                        }
                        }