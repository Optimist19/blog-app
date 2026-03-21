import { CloudCog } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") ?? ""
      },
      credentials: "include"
    });


    if (!res.ok) {
      return NextResponse.json({ message: "Something went wrong" });
    }
    const result = await res.json();

    const nextResponse = NextResponse.json(
      { message: result },
      { status: result?.status }
    );

    const setCookie = res.headers.get("set-cookie");

    if (setCookie) {
      nextResponse.headers.set("set-cookie", setCookie);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json({ message: "Bad request" });
  }
}
