import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();


  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "Email, password and name are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("http://localhost:5000/auth/create-account", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") ?? ""
      },
      credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.error || data?.message || "Signup failed" },
        { status: response.status }
      );
    }

    const nextResponse = NextResponse.json(
      { message: "Signup successful" },
      { status: response.status }
    );

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextResponse.headers.append("set-cookie", setCookie);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json({ message: "Signup failed" }, { status: 500 });
  }
}
