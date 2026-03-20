import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { banner, title, content, desc } = await req.json();
 
  if (!banner || !title || content.length === 0 || !desc) {
    return NextResponse.json({ message: "Necessary field are not filled" });
  }

  try {
    const data = { banner, title, content, desc };

    const res = await fetch("http://localhost:5000/create-blog", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") ?? ""
      },
      credentials: "include"
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Something went wrong" }
      );
    }
    const result = await res.json();


    const nextResponse = NextResponse.json(
      { message: result },
      { status: result?.status }
    );

    // forward Set-Cookie back to browser
    const setCookie = res.headers.get("set-cookie");

    if (setCookie) {
      nextResponse.headers.set("set-cookie", setCookie);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json({ message: "Bad request" });
  }
}
