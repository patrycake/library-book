function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info =  function () {
    return `${title}, ${author}, ${pages} pages, ${read ? "Already read" : "Not read yet"}`;
    }
}