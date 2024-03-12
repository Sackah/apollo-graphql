import { gql } from "@apollo/client";

export const GET_BOOK = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
        }
      }
    }
  }
`;
