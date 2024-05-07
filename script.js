const myLibrary = [];
const openDialog = document.querySelector("#openDialog");
const dialog = document.querySelector("dialog");
const confirmButton = document.querySelector("#confirmButton");

//constructor to create the book object

class theBook {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
/*Take value from the form and add it to the myLibrary array
 and displaying it on page with bookDisplay()*/

function addBooktoLibrary() {
  const authorName = document.querySelector("#author");
  const bookTitle = document.querySelector("#title");
  const numberOfPages = document.querySelector("#pages");
  const bookStatus = document.querySelector(
    "input[type=radio][name=status]:checked"
  );

  let book = new theBook(
    authorName.value,
    bookTitle.value,
    numberOfPages.value,
    bookStatus.value
  );

  myLibrary.push(book);
  bookDisplay();
}
//Displaying book card on page

function bookDisplay() {
  const bookElement = document.querySelector("#bookElement");
  bookElement.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const newDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    const readButton = document.createElement("button");
    newDiv.classList.add("book");
    deleteButton.classList.add("deleteButton");
    deleteButton.setAttribute("data-index", i);
    readButton.classList.add("readButton");
    readButton.setAttribute("data-attribute", i);
    readButton.textContent = "Status";
    newDiv.innerHTML = `<div><h2>Book Name</h2><p>${myLibrary[i].name}</p><div>
    <div><h2>Author Name</h2> <p>${myLibrary[i].author}</p><div>
    <div><h2>Number Of Pages</h2><p>${myLibrary[i].pages}</p><div>
    <div><h2>Book Status</h2><p>${myLibrary[i].read}</p><div>`;
    deleteButton.textContent = "Delete Card";
    bookElement.appendChild(newDiv);
    newDiv.appendChild(readButton);
    newDiv.appendChild(deleteButton);
  }
  /* make the remove card play each time card 
  are created so that .deleteButton class can be seen*/
  removeCard();
  changeBookStatus();
}
// remove a card by clicking on the deleteButton on card
function removeCard() {
  const deleteButton = document.querySelectorAll(".deleteButton");
  deleteButton.forEach((button) =>
    button.addEventListener("click", () => {
      let index = button.dataset.index;
      myLibrary.splice(index, 1);
      //refresh all card
      bookDisplay();
    })
  );
}

function changeBookStatus() {
  const buttonStatus = document.querySelectorAll(".readButton");
  buttonStatus.forEach((button) =>
    button.addEventListener("click", () => {
      let index = button.dataset.attribute;
      if (myLibrary[index].read == "Read") {
        myLibrary[index].read = "Not Read";
      } else if (myLibrary[index].read == "Not Read") {
        myLibrary[index].read = "Read";
      }
      //refresh all card
      bookDisplay();
    })
  );
}

//card template for user
let templateBook = new theBook("Tolkien", "The hobbit", "256", "Read");
myLibrary.push(templateBook);
bookDisplay();
// open the modal to complete the form
openDialog.addEventListener("click", () => {
  dialog.showModal();
});
/* send the cata to the addBooKtoLibrary when the confirm button is click on the modal*/
confirmButton.addEventListener("click", (event) => {
  let form = document.querySelector("form");
  event.preventDefault();
  dialog.close();
  addBooktoLibrary();
  form.reset();
});
