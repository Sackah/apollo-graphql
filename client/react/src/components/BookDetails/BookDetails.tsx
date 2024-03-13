import { useQuery } from "@apollo/client";
import { GET_BOOK } from "./BookDetails.queries";
import { type Book } from "../BookList/BookList.queries";

interface BookDetailsProps {
  id: string;
}

function BookDetails({ id }: BookDetailsProps) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id },
  });

  return (
    <div id="book-details">
      {loading && <p>Loading...</p>}
      {error && <p>Error :{error.message}</p>}
      {data && (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map((book: Book) => (
              <li key={book.name}>{book.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
