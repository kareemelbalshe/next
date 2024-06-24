import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/utils/type";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      return NextResponse.json({
        message: "your profile (account) has been found",
        status: 200,
        data: user,
      });
    }
    return NextResponse.json({
      message: "you are not authorized",
      status: 403,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      const body = (await request.json()) as UpdateUserDto;
      const validation = updateUserSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: validation.error.errors[0].message },
          { status: 400 }
        );
      }
      if (body.password) {
        if (body.password.length < 6) {
          return NextResponse.json(
            { message: "password must be at least 6 characters" },
            { status: 400 }
          );
        }
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
      }
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(params.id) },
        data: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      });
      const { password, ...other } = updatedUser;
      return NextResponse.json(
        { ...other },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json({
      message: "you are not authorized",
      status: 403,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } });

      const commentIds: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({
        where: {
          id: {
            in: commentIds,
          },
        },
      });

      return NextResponse.json({
        message: "your profile (account) has been deleted",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "you are not authorized",
      status: 403,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}
