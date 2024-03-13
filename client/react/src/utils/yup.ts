import * as yup from "yup";

export const addBookSchema = yup.object().shape({
  name: yup
    .string()
    .required("Book name cannot be empty")
    .matches(
      /^[a-zA-Z0-9\s]*$/,
      "Book name can only contain numbers letters and spaces"
    ),
  genre: yup.string().required("Genre cannot be empty"),
  authorId: yup.string().required("Author cannot be empty"),
});

export const addItemSchema = yup.object().shape({
  name: yup
    .string()
    .required("Item name cannot be empty")
    .matches(/^[a-zA-Z\s]*$/, "Item name can only contain letters and spaces"),
  description: yup
    .string()
    .required("Description cannot be empty")
    .matches(
      /^[a-zA-Z\s]*$/,
      "Description can only contain letters and spaces"
    ),
});
