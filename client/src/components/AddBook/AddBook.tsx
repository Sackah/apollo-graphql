import { useQuery, useMutation } from "@apollo/client";
import {
  GET_AUTHORS,
  ADD_BOOK,
  type Author,
  type AddBookForm,
} from "./AddBook.queries";
import { GET_BOOKS } from "../BookList/BookList.queries";
import { useState } from "react";
import { addBookSchema } from "../../utils/yup";
import { resetForm } from "../../utils/reset";
import { useDispatch } from "react-redux";
import { addBook } from "../../store/bookSlice";

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [form, setForm] = useState<AddBookForm>({
    name: "",
    genre: "",
    authorId: "",
  });
  const [mutateFunction, { data: book, loading: adding, error: adderror }] =
    useMutation(ADD_BOOK, {
      refetchQueries: [{ query: GET_BOOKS }],
    });
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addBookSchema
      .validate(form)
      .then((data) => {
        console.log(data);
        mutateFunction({ variables: form }).then(() => {
          dispatch(addBook(book));
          resetForm(form, setForm);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      {adderror && <p>{adderror.message}</p>}
      {adding && <p>Adding book</p>}
      <fieldset className="field">
        <label htmlFor="name">Book name:</label>
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="field">
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          value={form.genre}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="field">
        <label htmlFor="authorId">Author:</label>
        <select id="authorId" value={form.authorId} onChange={handleChange}>
          <option value="">Select author</option>
          {loading && <option disabled>Loading authors...</option>}
          {error && <option disabled>Error loading authors</option>}
          {data &&
            data.authors.map((author: Author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
        </select>
      </fieldset>
      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;
