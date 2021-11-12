let myLibrary = [];
var addBookButton = document.getElementById("new-book");
var bookForm = document.getElementById("book-form");
var closeFrom = document.getElementById("close-form");

addBookButton.addEventListener("click", function(){
    bookForm.style.display = "block";
})

closeFrom.addEventListener("click", function(){
    bookForm.style.display = "none";
})
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title}, ${author}, ${pages} pages, ${read ? "Already read" : "Not read yet"}`;
    }
}

function addBookToLibrary() {
    //users input
    userBook = new Book(userTitle, userAuthor, userPages, userRead);
    myLibrary.push(userBook)
}
