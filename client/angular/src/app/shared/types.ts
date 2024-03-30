export interface AppolloQuery {
  __typename: string;
}

export interface Book extends AppolloQuery {
  name: string;
  id: string;
  genre: string;
  authorId: string;
}

export interface Author {
  name: string;
  id: string;
  books: Book[];
}

export interface AddBookForm {
  name: string;
  genre: string;
  authorId: string;
}

export interface ApiSignal<T, U = {}> {
  loading: boolean;
  error: U | null;
  data: T | null;
}

export type NonNullablePartial<T> = {
  [P in keyof T]?: Exclude<T[P], null | undefined>;
};
