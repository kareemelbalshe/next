import ArticleItem from "@/components/articles/ArticleItem";
import React from "react";
import type { Metadata } from "next";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import Pagination from "@/components/articles/Pagination";
import { Article } from "@prisma/client";
import { getArticles } from "@/apiCalls/articleApiCall";
import prisma from '@/utils/db';

interface ArticlesProps {
  searchParams: { pageNumber: string };
}

const Articles = async ({ searchParams }: ArticlesProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));//delay to time for 10s

  const { pageNumber } = searchParams;

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / 6);
  return (
    <section className="fix-height container m-auto mt-2 px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/articles"
      />
    </section>
  );
};

export default Articles;

export const metadata: Metadata = {
  title: "Articles",
  description: "Generated by kareem elbalshy",
};
