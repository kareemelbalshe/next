import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddComment from "@/components/comments/AddComment";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/type";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
// import { Article } from '@/utils/type'
import React from "react";

interface SingleArticleProps {
  params: { id: string };
}

const SingleArticlePage = async ({ params }: SingleArticleProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  const article: SingleArticle = await getSingleArticle(params.id);
  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg mb-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article.description}</p>
      </div>
      <div className="mt-7">
        {payload ? (
          <AddComment articleId={article.id} />
        ) : (
          <p>
            to write a comment you need to be logged in <fieldset></fieldset>
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map((c) => (
        <CommentItem key={c.id} comment={c} userId={payload?.id} />
      ))}
    </section>
  );
};

export default SingleArticlePage;
