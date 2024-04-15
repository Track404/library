const myLibrary = [];

function theBook(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBooktoLibrary() {
  let name = "Hobbit";
  let author = "tolkien";
  let pages = "254";
  let read = "read";

  let Book = new theBook(name, author, pages, read);

  myLibrary.push(Book);
}

addBooktoLibrary();

console.log(myLibrary);
