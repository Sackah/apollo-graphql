import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      name
      id
    }
  }
`;

export interface Book {
  name: string;
  id: string;
  genre: string;
  authorId: string;
}
