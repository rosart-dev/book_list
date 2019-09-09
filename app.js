/**
 *  Pre es6 
 */

//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor 
function UI() {}

//Add Book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    //Create tr element 
    const row = document.createElement('tr');

    //Insert cols 
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
};

//Show Alert 
UI.prototype.showAlert = function(message, className) {
    //Create div 
    const div = document.createElement('div');

    //Add classes
    div.className = `alert ${className}`;

    //Add text 
    div.appendChild(document.createTextNode(message));

    //Get parent element
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    //Timeout after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
};

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

//Event Listener for adding a book
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values 
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate fields 
    if(title === '' || author === '' || isbn === ''){
        // Error alert 
        ui.showAlert('Please fill out all of the fields', 'error');
    } else {
        //Add book to list 
        ui.addBookToList(book);

        //Show Success
        ui.showAlert('Book successfully added', 'success');

        //Clear ui fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listener for deleting a book 
document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault();

    const ui = new UI();
    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book removed!', 'success');

});

