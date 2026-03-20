import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") ?? ""
      },
      credentials: "include"
    });

    const contentType = response.headers.get("content-type") || "";

    let result: { message?: string } | null = null;

    if (contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();

      return NextResponse.json(
        { message: "Invalid response from authentication server" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: result?.message ?? "Sign-in failed" },
        { status: response.status }
      );
    }

    const nextResponse = NextResponse.json(
      { message: "Sign-in successful" },
      { status: 200 }
    );

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      nextResponse.headers.append("set-cookie", setCookie);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json({
      message:
        "Unable to connect to the authentication server. Please try again later."
    });
  }
}
