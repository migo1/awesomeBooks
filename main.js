const booksParent = document.getElementById("books");
const booksForm = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");

const books = JSON.parse(localStorage.getItem("books")) || [];

const addBooks = (title, author) => {
  books.push({ title, author });

  localStorage.setItem("books", JSON.stringify(books));

  return { title, author };
};

booksForm.onsubmit = (e) => {
  e.preventDefault();
  const newBook = addBooks(titleInput.value, authorInput.value);
  titleInput.value = "";
  authorInput.value = "";

  bookElement(newBook, books.length - 1);
};

const bookElement = (book, index) => {
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book-container');
  const pTitle = document.createElement("p");
  pTitle.classList.add('title');
  pTitle.innerText = book.title;
  const pAuthor = document.createElement("p");
  pAuthor.classList.add('author');
  pAuthor.innerText = book.author;
  const removeButton = document.createElement("button");
  removeButton.classList.add('remove-button');
  removeButton.innerText = "remove";
  const line = document.createElement("hr");

  removeButton.addEventListener("click", () => {
    deleteBook(index);
  });
  bookContainer.append(pTitle, pAuthor, removeButton, line);
  booksParent.appendChild(bookContainer);
};

const displayBooks = () => {
  booksParent.innerHTML = "";
  books.forEach(bookElement);
};
displayBooks();

const deleteBook = (index) => {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
};
