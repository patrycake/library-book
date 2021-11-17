let myLibrary = [];

var openBookForm = document.getElementById("new-book");
var bookForm = document.getElementById("book-form");
var closeBookForm = document.getElementById("close-form");
var libraryDisplayDOM = document.getElementById("library-display");
var readStatusButtons = document.getElementsByClassName("read-status-button");
var removeBookButtons = document.getElementsByClassName("remove-button")

openBookForm.addEventListener("click", () => {
    bookForm.style.display = "block";
})

closeBookForm.addEventListener("click", () => {
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
    createBookDisplay(userBook);
}

function readStatusListener() {
    myLibrary.forEach(book => {
        console.log(book.title + " " + this.id)
        //use id to identify book
        console.log((this.id).substring(4))
        if (book.title.includes((this.id).substring(5))) {
            console.log(book.title + " " + this.id)
            //update book object
            book.read ? book.read = false : book.read = true;
            console.log(book.read)
            //update gui
            document.getElementById(`book-read-${book.title}`).innerText = `Read: ${book.read}`;
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
        let bookInfo = document.createElement("p");
        let bookRead = document.createElement("p");
        let removeButton = document.createElement("button");
        let readButton = document.createElement("button")

        bookDiv.classList.add("card")
        bookTitle.innerText = userBook.title;
        bookInfo.innerText = `Author: ${userBook.author}, 
        Page Number: ${userBook.pages}`
        bookRead.innerHTML = `Read: ${userBook.read}`;
        readButton.innerText = `${userBook.read ? "Not Read" : "Read"}`
        removeButton.innerText = "Remove Book";

        readButton.classList.add("read-status-button")
        removeButton.classList.add("remove-button")

        bookDiv.id = `book-info-${userBook.title}`;
        readButton.id = `read-${userBook.title}`;
        bookRead.id = `book-read-${userBook.title}`;
        removeButton.id = `remove-${userBook.title}`

        readButton.addEventListener("click", readStatusListener)
        removeButton.addEventListener("click", removeBookListener)

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(bookRead)
        bookDiv.appendChild(readButton);
        bookDiv.appendChild(removeButton)
        libraryDisplayDOM.appendChild(bookDiv)
    }

    // page opens create book gui if there are books in array
    // if library.lenth != 0
    //loop through myLibrary
    //createBookDisplay(myLibrary[counter])