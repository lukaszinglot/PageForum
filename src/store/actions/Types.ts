export interface Posts {
  userId?: number;
  postId?: number;
  id?: number;
  title?: string;
  name?: string;
  email?: string;
  body?: string;
}
export interface Types {
  data?: Posts[];
  ids?: number[];
}
