const sql = require("./db.js");

const Books = function(books) {
    this.isbn = books.isbn;
    this.title = books.title;
    this.categoryid = books.categoryid;
    this.author = books.author;
    this.price = books.price;
    this.stok = books.stok;
}

Books.getBook = result => {
    let query = 'select * from books';

    sql.query(query, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }

        console.log('Books: ', res);
        result(null, res);
    });
};

Books.addBook = (newBook, result) => {
    let query = 'insert into books set ?';

    sql.query(query, newBook, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        console.log('Created Book: ', { isbn: res.isbn, ...newBook });
        result(null, { isbn: res.isbn, ...newBook });
    })
}

Books.getBookByISBN = (isbn, result) => {
    let query = `select * from books where isbn = ${isbn}`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found Book: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    })
}

Books.editBook = (isbn, book, result) => {
    let query = `update books set title = ?, categoryid = ?, author = ?, price = ?, stok = ? where isbn = ?`;
    let params = [book.title, book.categoryid, book.author, book.price, book.stok, isbn];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Updated Book: ', { isbn: isbn, ...book });
        result(null, { isbn: isbn, ...book });
    })
}

Books.deleteBook = (isbn, result) => {
    let query = `delete from books where isbn = ?`;

    sql.query(query, isbn, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Deleted Book with ISBN: ', isbn);
        result(null, res);
    })
}

module.exports = Books;