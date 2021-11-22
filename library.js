let myLibrary = [{
    title: "Harry Potter and the Sorcer's Stone",
    author: "J.K. Rowling",
    pages: 284,
    read: true
}, {
    title: "Life of Pi",
    author: "Yann Martel",
    pages: 354,
    read: true
}, {
    title: "Circe",
    author: "Madeline Miller",
    pages: 543,
    read: true
}];

var openBookForm = document.getElementById("new-book");
var bookForm = document.getElementById("book-form");
var formPopup = document.getElementById("form-popup")
var closeBookForm = document.getElementById("close-form");
var libraryDisplayDOM = document.getElementById("library-display");
var readStatusButtons = document.getElementsByClassName("read-status-button");
var removeBookButtons = document.getElementsByClassName("remove-button")

openBookForm.addEventListener("click", () => {
    document.querySelector(".form-modal-background-overlay").classList.add("form-active")
    // formPopup.style.display = "block";
})

closeBookForm.addEventListener("click", () => {
    document.querySelector(".form-modal-background-overlay").classList.remove("form-active")
    // formPopup.style.display = "none";
})

// When the user clicks anywhere outside of the form, close it
window.onclick = function (event) {
    if (event.target == formPopup) {
        document.querySelector(".form-modal-background-overlay").classList.remove("form-active")
        // formPopup.style.display = "none";

    }
}

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
    document.querySelector(".form-modal-background-overlay").classList.remove("form-active")
    //users input
    userBook = new Book(
        bookForm.elements['book-title'].value,
        bookForm.elements['author'].value,
        bookForm.elements['page'].value,
        bookForm.elements['read'].checked
    )
    myLibrary.push(userBook)
    console.log(JSON.parse(JSON.stringify(myLibrary)));
    createBookDisplay(userBook);
}

function readStatusListener() {
    myLibrary.forEach(book => {
        //use id to identify book
        if (book.title.includes((this.id).substring(5))) {
            //update book object
            book.read ? book.read = false : book.read = true;
            //update gui
            document.getElementById(`book-read-${book.title}`).innerText = `Read: ${book.read}`;
            this.innerText = `${book.read ? "Not Read" : "Read"}`
        }
    })
}

function removeBookListener() {
    myLibrary.forEach(book => {
        console.log(book.title + " " + this.id)
        //use id to identify book
        console.log((this.id).substring(7))
        if (book.title.includes((this.id).substring(7))) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            console.log(myLibrary);
            document.getElementById(`book-info-${book.title}`).remove()
        }
    })
}

function createBookDisplay(userBook) {
    let bookDiv = document.createElement("div");
    let bookTitle = document.createElement("h2");
    let bookAuthor = document.createElement("p");
    let bookRead = document.createElement("p");
    let bookPage = document.createElement("p")
    let removeButton = document.createElement("button");
    let readButton = document.createElement("button")
    let buttonDiv = document.createElement("div")

    bookDiv.classList.add("card")
    bookTitle.innerText = userBook.title;
    bookPage.innerText = `Page Number: ${userBook.pages}`
    bookRead.innerHTML = `Read: ${userBook.read}`;
    readButton.innerText = `${userBook.read ? "Not Read" : "Read"}`
    removeButton.innerText = "Remove Book";
    bookAuthor.innerText = `Author: ${userBook.author}`

    readButton.classList.add("read-status-button")
    removeButton.classList.add("remove-button")
    bookRead.classList.add("book-read")

    bookDiv.id = `book-info-${userBook.title}`;
    readButton.id = `read-${userBook.title}`;
    bookRead.id = `book-read-${userBook.title}`;
    removeButton.id = `remove-${userBook.title}`

    readButton.addEventListener("click", readStatusListener)
    removeButton.addEventListener("click", removeBookListener)

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPage);
    bookDiv.appendChild(bookRead)
    buttonDiv.appendChild(readButton);
    buttonDiv.appendChild(removeButton)
    bookDiv.appendChild(buttonDiv)
    libraryDisplayDOM.appendChild(bookDiv)
}

// page opens create book gui if there are books in array
if(myLibrary.length != 0){
    myLibrary.forEach(book => createBookDisplay(book))
}