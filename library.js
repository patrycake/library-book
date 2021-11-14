let myLibrary = [];

var addBookButton = document.getElementById("new-book");
var bookForm = document.getElementById("book-form");
var closeFrom = document.getElementById("close-form");
var libraryDisplayDOM = document.getElementById("library-display");
var readStatusButtons = document.getElementsByClassName("read-status-button");
var removeBookButtons = document.getElementsByClassName("remove-button")

Array.from(readStatusButtons).forEach(butt => {
    butt.addEventListener("click", () => {
        readStatus = myLibrary[butt.id.length].read;
        readStatus ? myLibrary[butt.id.length].read = false : myLibrary[butt.id.length].read = true;
    })
})
addBookButton.addEventListener("click", () => {
    bookForm.style.display = "block";
})

closeFrom.addEventListener("click", () => {
    bookForm.style.display = "none";
})

bookForm.addEventListener("submit", addBookToLibrary, false);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title}, ${author}, ${pages} pages, 
        ${read ? "Already read" : "Not read yet"}`;
    }
}

function addBookToLibrary(event) {
    event.preventDefault();
    //users input
    userBook = new Book(
        bookForm.elements['book-title'].value,
        bookForm.elements['author'].value,
        bookForm.elements['page'].value,
        bookForm.elements['read'].checked
    )
    myLibrary.push(userBook)
    console.log(JSON.parse(JSON.stringify(myLibrary)));
    bookForm.style.display = "none";
    displayLibrary(userBook);
}

function displayLibrary(userBook) {
    let bookDiv = document.createElement("div");
    let bookTitle = document.createElement("h2");
    let bookInfo = document.createElement("p");
    let removeButton = document.createElement("button");
    let readButton = document.createElement("button")

    bookDiv.classList.add("card")
    bookTitle.innerText = userBook.title;
    bookInfo.innerText = `Author: ${userBook.author}, 
        Page Number: ${userBook.pages}, 
        Read: ${userBook.read}`;
    readButton.innerText = `${userBook.read ? "Not Read" : "Read"}`
    removeButton.innerText = "Remove Book";
    readButton.classList.add("read-status-button")
    removeButton.classList.add("remove-button")
    readButton.id = `read-${myLibrary.length}`;

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(readButton);
    bookDiv.appendChild(removeButton)
    libraryDisplayDOM.appendChild(bookDiv)
}