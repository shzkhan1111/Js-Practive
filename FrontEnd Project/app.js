//book class
class Book{
    constructor(title , author , isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}


//UI Class : Handles UI Tasks 
class UI{
    static displayBooks(){
       
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
        <a href="#" class="btn btn-danger btn-sm delete" >X</a>
        </td>`
        console.log(row)
        list.appendChild(row)
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            //remove the whole thing 
            //we click link > parent td > row -> delete the tr
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message , className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form= document.querySelector('#book-form');
        //inster the div inside the container before form
        container.insertBefore(div , form)
        //Vanish in 3 sec
        setTimeout(() => document.querySelector('.alert').remove() , 3000)
    }
    static clearFields(){
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''

    }
}

//Store class: handes storage 
class Store{
    static getBooks(){
        if(localStorage.getItem('books') === null){
            books = []
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }
    static addBook(book){
        const books = Store.getBooks()
        console.log('In Side Book' , books)
        books.push(book)

        localStorage.setItem('books' , JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book , index) => {
            if(book.isbn === isbn){
                books.splice(index , 1);
            }
        })


        localStorage.setItem('books' , JSON.stringify(books))
    }
}

//Event Display Book
//as soon an the Dom loads call UI.Display Book
document.addEventListener('DOMContentLoaded' , UI.displayBooks);

//Event:Add a book
//get the form and listen to a submit event and whne that happens do few tinag 
document.querySelector('#book-form').addEventListener('submit' , (e) => {
//  since it is submit we need to prevent the default action 
e.preventDefault();

    //get 
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if(title === '' || author === '' || isbn === ''){
        // alert('Please Fill in all fields')
        UI.showAlert('Please Fill in all fields' , 'danger')
    }
    else{
        //instantiate book from the field above 
        const book = new Book (title , author , isbn);

        console.log(book)

        

        UI.addBookToList(book)
        //show successn
        
        //add book to stpre
        Store.addBook(book)
        UI.showAlert('Book Added' , 'success')


        //clear fields 
        UI.clearFields()
    }

    
})

document.querySelector('#book-list').addEventListener('click' , (e) =>{

    //will give me whats clicked on //will give me the td
    console.log(e.target);
    UI.deleteBook(e.target);
     //show successn
     UI.showAlert('Book Removed' , 'success')


})