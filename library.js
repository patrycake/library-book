let myLibrary = [];
var addBookButton = document.getElementById("new-book");
var bookForm = document.getElementById("book-form");
var closeFrom = document.getElementById("close-form");
var libraryDisplayDOM = document.getElementById("library-display")

addBookButton.addEventListener("click", function () {
    bookForm.style.display = "block";
})

closeFrom.addEventListener("click", function () {
    bookForm.style.display = "none";
})

bookForm.addEventListener("submit", addBookToLibrary, false);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title}, ${author}, ${pages} pages, ${read ? "Already read" : "Not read yet"}`;
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
    bookDiv = document.createElement("div");
    bookTitle = document.createElement("h2");
    bookInfo = document.createElement("p");

    bookDiv.classList.add("card")
    bookTitle.innerText = userBook.title;
    bookInfo.innerText = `Author: ${userBook.author}, 
        Page Number: ${userBook.pages}, 
        Read: ${userBook.read}`;
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookInfo);
    libraryDisplayDOM.appendChild(bookDiv)
}