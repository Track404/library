const myLibrary = [];
const openDialog = document.querySelector("dialog + button");
const dialog = document.querySelector("dialog");
const confirmButton = document.querySelector("#confirmButton");

//constructor to create the book object

function theBook(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  console.log(myLibrary);
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
    readButton.textContent = "Have you read the book ?";
    newDiv.innerHTML = `the name is ${myLibrary[i].name} ${myLibrary[i].author} ${myLibrary[i].pages} ${myLibrary[i].read}`;
    deleteButton.textContent = "Delete Card";
    bookElement.appendChild(newDiv);
    newDiv.appendChild(deleteButton);
    newDiv.appendChild(readButton);
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
      console.log(myLibrary);
    })
  );
}

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
