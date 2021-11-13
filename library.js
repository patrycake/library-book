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
    displayBooks();
}

function displayBooks(){

}
