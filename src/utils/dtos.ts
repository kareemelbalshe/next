export interface CreateArticleDto {
  title: string;
  description: string;
}

export interface UpdateArticleDto {
  title?: string;
  description?: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface loginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

export interface CreateCommentDto {
  articleId: number;
  text: string;
}

export interface UpdateCommentDto {
  text: string;
}
