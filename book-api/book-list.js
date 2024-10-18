let books = [];  // Move the declaration above the loadBooks function

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/books", true);
    xhttp.onload = function () {
        books = JSON.parse(this.responseText);  // Update the global books array
        const booksContainer = document.getElementById('books');

        // Clear previous books before loading new ones
        booksContainer.innerHTML = '';

        books.forEach(book => {
            const bookCard = `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number Of Pages: ${book.numOfPages}</div>
                            <hr>
                            <button type="button" class="btn btn-danger" onClick="deleteBook('${book.isbn}')">Delete</button>
                            <button type="button" class="btn btn-primary" onClick="setEditModal('${book.isbn}')">Edit</button>
                        </div>
                    </div>
                </div>
            `;
            booksContainer.innerHTML += bookCard;
        });
    };
    xhttp.send();
};

loadBooks();

// Deletion of Books
const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, true);
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            location.reload();
        } else {
            console.error('Failed to delete book:', xhttp.responseText);
        }
    };
    xhttp.send();
};

// Set up the edit modal with the selected book's data
const setEditModal = (isbn) => {
    const book = books.find(b => b.isbn === isbn); // Find the selected book
    if (book) {
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('publisher').value = book.publisher;
        document.getElementById('numOfPages').value = book.numOfPages;

        $('#editBookModal').modal('show'); // Show the modal
    } else {
        console.error('Book not found:', isbn);
    }
};

// Handle form submission for editing a book
document.getElementById('editForm').onsubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
        isbn: document.getElementById('isbn').value,
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publisher: document.getElementById('publisher').value,
        numOfPages: document.getElementById('numOfPages').value
    };

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/book/${updatedBook.isbn}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            location.reload();
        } else {
            console.error('Failed to update book:', xhttp.responseText);
        }
    };
    xhttp.send(JSON.stringify(updatedBook));
};
