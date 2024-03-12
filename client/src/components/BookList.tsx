import { useQuery } from "@apollo/client";
import { GET_BOOKS, type Book } from "./BookList.data";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error :{error.message}</p>}
      {data &&
        data.books.map((book: Book) => <div key={book.id}>{book.name}</div>)}
    </div>
  );
}

export default BookList;
