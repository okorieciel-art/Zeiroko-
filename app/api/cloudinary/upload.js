import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
      });

      export async function POST(req) {
        const body = await req.json();
          const { file } = body;

            const uploaded = await cloudinary.uploader.upload(file, {
                folder: "zeiroko_screenshots"
                  });

                    return NextResponse.json(uploaded);
                    }