import { SingleArticle } from "@/utils/type";
import { Article } from "@prisma/client";

export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const res = await fetch(
    `http://localhost:3000/api/articles?pageNumber=${pageNumber}`,
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("failed to fetch articles");
  }
  return res.json();
}

export async function getArticlesCount(): Promise<number> {
  const res = await fetch(`http://localhost:3000/api/articles/count`,
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("failed to fetch articles count");
  }
  const { count } = (await res.json()) as { count: number };
  return count;
}

export async function getArticlesBasedOnSearch(
  searchText: string
): Promise<Article[]> {
  const res = await fetch(
    `http://localhost:3000/api/articles/search?searchText=${searchText}`
  );
  if (!res.ok) {
    throw new Error("failed to fetch articles");
  }
  return await res.json();
}

export async function getSingleArticle(
  articleId: string
): Promise<SingleArticle> {
  const res = await fetch(`http://localhost:3000/api/articles/${articleId}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("failed to fetch article");
  }
  return res.json();
}
