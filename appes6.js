class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList = book => {
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

    deleteBook = target => {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    };

    clearFields = () => {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };

    showAlert = (message, className) => {
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
}

class Store {
    static displayBooks = () => {
        const books = Store.getBooks();

        books.forEach(book => {
            const ui = new UI();

            //Add book to UI
            ui.addBookToList(book);
        });
    };

    static addBook = book => {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    };

    static getBooks = () => {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    };

    static removeBook = isbn => {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    };
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

//Event Listener for adding a book
document.getElementById('book-form').addEventListener('submit', e => {
    //Get form values 
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //Create new book object 
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

        //Add book to local storage
        Store.addBook(book);

        //Show Success
        ui.showAlert('Book successfully added', 'success');

        //Clear ui fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listener for deleting a book 
document.getElementById('book-list').addEventListener('click', e => {
    e.preventDefault();

    //Construct new UI object 
    const ui = new UI();

    //remove book from UI
    ui.deleteBook(e.target);

    //remove from local storage
    if(e.target.parentElement.previousElementSibling){
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent); 
        
        //Show message
        ui.showAlert('Book removed!', 'success');
    }   
});