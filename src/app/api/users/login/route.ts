import prisma from "@/utils/db";
import { loginUserDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/utils/validationSchema";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/type";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as loginUserDto;
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const jwtPayload: JWTPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };

    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      { message: "logged in" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
