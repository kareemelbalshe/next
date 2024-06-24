import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "@/utils/validationSchema";
import { CreateArticleDto } from "@/utils/dtos";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { verifyToken } from "@/utils/verifyToken";

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles = await prisma.article.findMany({
      skip: (Number(pageNumber) - 1) * 6,
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin !== true) {
      return NextResponse.json(
        { message: "unauthorized, only admin can create article" },
        { status: 401 }
      );
    }
    const body = (await request.json()) as CreateArticleDto;
    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export function PUT(request: NextRequest) {
  return NextResponse.json({ message: "created" }, { status: 201 });
}
