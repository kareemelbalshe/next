import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";
import React from "react";

interface SearchArticlesProps {
  searchParams: { searchText: string };
}
const SearchArticles = async ({
  searchParams: { searchText },
}: SearchArticlesProps) => {
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);
  return (
    <div className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <div className="text-center text-red-500 p-5 text-2xl font-bold">
          No Articles Found
        </div>
      ) : (
        <div className="">
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Search Text is:{" "}
            <span className="ms-1 text-green-700 text-3xl font-bold">
              {searchText}
            </span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((item) => (
              <ArticleItem article={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchArticles;
