import { useQuery } from "@apollo/client";
import { GET_BOOKS, type Book } from "./BookList.queries";
import BookDetails from "../BookDetails/BookDetails";
import { useState } from "react";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error :{error.message}</p>}
      {data && (
        <ul id="book-list">
          {data.books.map((book: Book) => (
            <li key={book.id} onClick={() => setSelected(book.id)}>
              {book.name}
            </li>
          ))}
        </ul>
      )}
      {selected ? <BookDetails id={selected} /> : <p>No book selected...</p>}
    </div>
  );
}

export default BookList;
