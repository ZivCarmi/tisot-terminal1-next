import fs from "fs/promises";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "data", "last-updated.json");

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token !== process.env.UPDATE_TOKEN_SECRET) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const now = new Date().toISOString();
    const data = { lastUpdated: now };

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    revalidateTag("flights");

    return NextResponse.json({
      message: "Timestamp updated",
      lastUpdated: now,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating timestamp" },
      { status: 500 }
    );
  }
}
