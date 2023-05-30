class Book {
  constructor() {
    this.booksParent = document.getElementById("books");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.books = JSON.parse(localStorage.getItem("books")) || [];
    this.addBook = this.addBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.displayBooks();
  }

  addBook(e) {
    e.preventDefault();
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    if (title && author) {
      const newBook = { title, author };
      this.books.push(newBook);
      localStorage.setItem("books", JSON.stringify(this.books));
      this.titleInput.value = "";
      this.authorInput.value = "";
      this.bookElement(newBook, this.books.length - 1);
    }
  }

  bookElement(book, index) {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");
    const pTitle = document.createElement("p");
    pTitle.classList.add("title");
    pTitle.innerText = book.title;
    const pAuthor = document.createElement("p");
    pAuthor.classList.add("author");
    pAuthor.innerText = book.author;
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerText = "remove";
    const line = document.createElement("hr");

    removeButton.addEventListener("click", () => {
      this.deleteBook(index);
    });
    bookContainer.append(pTitle, pAuthor, removeButton, line);
    this.booksParent.appendChild(bookContainer);
  }

  displayBooks() {
    this.booksParent.innerHTML = "";
    this.books.forEach((book, index) => {
      this.bookElement(book, index);
    });
  }

  deleteBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(this.books));
    this.displayBooks();
  }
}
const booksForm = document.getElementById("bookForm");

const storeBook = new Book();
booksForm.addEventListener("submit", storeBook.addBook);
storeBook.displayBooks();