// Import the required modules
import express from "express";
import morgan from "morgan";

// Import author-related helper functions
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
} from "./authors.js";

// Import book-related helper functions
import {
  getBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} from "./books.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Author Route Handlers

// Endpoint to retrieve all authors
app.get("/authors/", async function (req, res) {
  const authors = await getAuthors();
  res.status(200).json({ status: "success", data: authors });
});

// Endpoint to retrieve a specific author by id
app.get("/authors/:id", async function (req, res) {
  const id = req.params.id;
  const author = await getAuthorById(id);
  // Assume 404 status if the author is not found
  if (!author) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Author not found" } });
  }
  res.status(200).json({ status: "success", data: author });
});

// Endpoint to create a new author
app.post("/authors/", async function (req, res) {
  const data = req.body;
  const author = await createAuthor(data);
  res.status(201).json({ status: "success", data: author });
});

// Endpoint to update a specific author by id
app.patch("/authors/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const author = await updateAuthorById(id, data);
  // Assume 404 status if the author is not found
  if (!author) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Author not found" } });
  }
  res.status(200).json({ status: "success", data: author });
});

// Endpoint to delete a specific author by id
app.delete("/authors/:id", async function (req, res) {
  const id = req.params.id;
  const author = await deleteAuthorById(id);
  // Assume 404 status if the author is not found
  if (!author) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Author not found" } });
  }
  res.status(200).json({ status: "success", data: author });
});

// Book Route Handlers

// Endpoint to retrieve all books
app.get("/books/", async function (req, res) {
  const books = await getBooks();
  res.status(200).json({ status: "success", data: books });
});

// Endpoint to retrieve a specific book by id
app.get("/books/:id", async function (req, res) {
  const id = req.params.id;
  const book = await getBookById(id);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Book not found" } });
  }
  res.status(200).json({ status: "success", data: book });
});

// Endpoint to create a new book
app.post("/books/", async function (req, res) {
  try {
    const data = req.body;
    const book = await createBook(data);
    res.status(201).json({ status: "success", data: book });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Endpoint to update a specific book by id
app.patch("/books/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const book = await updateBookById(id, data);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Book not found" } });
  }

  res.status(200).json({ status: "success", data: book });
});

// Endpoint to delete a specific book by id
app.delete("/books/:id", async function (req, res) {
  const id = req.params.id;
  const book = await deleteBookById(id);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Book not found" } });
  }
  res.status(200).json({ status: "success", data: book });
});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
