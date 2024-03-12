import AddBook from "./components/AddBook/AddBook";
import BookList from "./components/BookList/BookList";

function App() {
  return (
    <div id="main">
      <h1>Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
