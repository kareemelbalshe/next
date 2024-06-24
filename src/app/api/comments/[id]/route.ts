import prisma from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (comment === null) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as UpdateCommentDto;

    const updateComment = await prisma.comment.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        text: body.text,
      },
    });
    return NextResponse.json(
      { updateComment, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (comment === null) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    if (user.id === comment.userId || user.isAdmin) {
      const deleteComment = await prisma.comment.delete({
        where: {
          id: parseInt(params.id),
        },
      });
      return NextResponse.json(
        { deleteComment, message: "success" },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "unauthorized" }, { status: 403 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
