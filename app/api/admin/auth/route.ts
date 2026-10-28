import { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = "VayamLahoti";
const ADMIN_PASSWORD = "Vayam@2002";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // In production, can issue an encrypted JWT or secure HTTP-only cookie
      return NextResponse.json({
        success: true,
        user: {
          username: "VayamLahoti",
          name: "Vayam Lahoti",
          role: "Founder & Editor in Chief",
        },
        token: `tpl_session_${Date.now()}`,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid username or password. Access denied." },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Authentication error" },
      { status: 500 }
    );
  }
}
