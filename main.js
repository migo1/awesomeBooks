const booksParent = document.getElementById('books');
const booksForm = document.getElementById('bookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

const books = JSON.parse(localStorage.getItem('books')) || [];

const addBooks = (title, author) => {
  books.push({ title, author });

  localStorage.setItem('books', JSON.stringify(books));

  return { title, author };
};

booksForm.onsubmit = (e) => {
  e.preventDefault();
  const newBook = addBooks(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';

  bookElement(newBook);
};

const bookElement = (book, index) => {
  const pTitle = document.createElement('p');
  pTitle.innerText = book.title;
  const pAuthor = document.createElement('p');
  pAuthor.innerText = book.author;
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  const line = document.createElement('hr');
  booksParent.append(pTitle, pAuthor, removeButton, line);
};
