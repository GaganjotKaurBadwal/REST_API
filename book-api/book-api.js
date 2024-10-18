const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// In-memory storage for books
let books = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// Adding New Books
app.post('/book', (req, res) => {
    const book = req.body;
    console.log(book);
    books.push(book);
    res.status(201).json({ message: 'Book added', book }); // Include the added book in the response
});

// Retrieve all Books
app.get('/books', (req, res) => {
    res.json(books);
});

// Update a book
app.put('/book/:isbn', (req, res) => {
    const { isbn } = req.params;
    const updatedBook = req.body;

    const index = books.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
        updatedBook.isbn = isbn; // Ensure the updated book retains the same ISBN
        books[index] = updatedBook;
        res.send('Book updated successfully');
    } else {
        res.status(404).send('Book not found');
    }
});

// Delete a book
app.delete('/book/:isbn', (req, res) => {
    const { isbn } = req.params;
    const index = books.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
        books.splice(index, 1);
        res.send('Book deleted successfully');
    } else {
        res.status(404).send('Book not found');
    }
});
