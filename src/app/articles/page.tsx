import ArticleItem from "@/components/articles/ArticleItem";
import React from "react";
import { Article } from "@/utils/type";

const Articles = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if(!res.ok){
    throw new Error("failed to fetch articles")
  }
  const articles: Article[] = await res.json();
  return (
    <section className="container m-auto mt-2 px-5">
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default Articles;
