// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAuthors() {
  // Query the database and return all authors
  const queryText = "SELECT * FROM authors";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the author with a matching id or null
  const queryText = "SELECT * FROM authors WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  try {
    // Query the database to create a author and return the newly created author
    const queryText = 'INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(queryText, [author.first_name, author.last_name]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating author:', error);
    throw error;
  }
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author or null
  try {const queryText = "UPDATE authors SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(queryText, [updates.first_name, updates.last_name, id]);
  // const update = await pool.query(queryText, [])
  return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating author:', error);
    throw error;
  }
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null
}
