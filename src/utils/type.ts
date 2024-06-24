// export type Article = {
//   id: number;
//   userId: number;
//   title: string;
//   body: string;
// };
import { Article, User, Comment } from "@prisma/client";

export type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export type CommentWithUser = Comment & {
  user: User;
};

export type SingleArticle = Article & {
  comments: CommentWithUser[];
};
