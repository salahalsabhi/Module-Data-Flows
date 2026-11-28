const myLibrary = [];

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function populateStorage() {
  if (myLibrary.length === 0) {
    myLibrary.push(new Book("Robinson Crusoe", "Daniel Defoe", 252, true));
    myLibrary.push(
      new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
    );
  }
}

function render() {
  const tableBody = document.querySelector("#display tbody");
  tableBody.textContent = "";

  myLibrary.forEach((book, index) => {
    const row = tableBody.insertRow();

    const titleCell = row.insertCell();
    const authorCell = row.insertCell();
    const pagesCell = row.insertCell();
    const wasReadCell = row.insertCell();
    const deleteCell = row.insertCell();

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;

    const readBtn = document.createElement("button");
    readBtn.type = "button";
    readBtn.className = "btn btn-success";
    readBtn.textContent = book.check ? "Yes" : "No";
    readBtn.addEventListener("click", function () {
      book.check = !book.check;
      render();
    });
    wasReadCell.appendChild(readBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      const deletedTitle = book.title;
      myLibrary.splice(index, 1);
      render();
      alert("You've deleted title: " + deletedTitle);
    });
    deleteCell.appendChild(deleteBtn);
  });
}

function submit(event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readCheckbox = document.getElementById("check");

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);

  if (title === "" || author === "" || !Number.isInteger(pages) || pages < 1) {
    alert("Please fill all fields with valid values!");
    return;
  }

  myLibrary.push(new Book(title, author, pages, readCheckbox.checked));

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readCheckbox.checked = false;

  render();
}

window.addEventListener("load", function () {
  populateStorage();
  render();

  const bookForm = document.getElementById("book-form");
  bookForm.addEventListener("submit", submit);
});
