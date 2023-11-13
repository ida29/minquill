// app/api/images/onetime_upload_url/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export async function POST() {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = new FormData();
  formData.append("requireSignedURLs", "false");
  formData.append("metadata", JSON.stringify({ key: "value" }));

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_TOKEN}`,
        },
        body: formData,
      },
    );

    if (!res.ok) {
      return NextResponse.json({
        error: "Failed to get the upload URL from Cloudflare",
      });
    }

    const res_json = await res.json();
    return NextResponse.json(res_json.result, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
