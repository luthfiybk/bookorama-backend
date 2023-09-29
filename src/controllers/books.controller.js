const Books = require('../models/books.model.js');

exports.getBook = (req, res) => {
    Books.getBook((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while retrieving books.'
            });
        } else {
            res.send(data);
        }
    });
}

exports.addBook = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    const book = new Books({
        isbn: req.body.isbn,
        title: req.body.title,
        categoryid: req.body.categoryid,
        author: req.body.author,
        price: req.body.price,
        stok: req.body.stok
    })

    Books.addBook(book, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while creating the Book.'
            });
        } else {
            res.send(data);
        }
    });
}

exports.getBookByISBN = (req, res) => {
    Books.getBookByISBN(req.params.isbn, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Book with isbn ${req.params.isbn}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Book with isbn ${req.params.isbn}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}

exports.editBook = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    Books.editBook(req.params.isbn, 
        new Books(req.body), 
        (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Book with isbn ${req.params.isbn}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating Book with isbn ${req.params.isbn}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}

exports.deleteBook = (req, res) => {
    Books.deleteBook(req.params.isbn, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Book with isbn ${req.params.isbn}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete Book with isbn ${req.params.isbn}.`
                });
            }
        } else {
            res.send({ message: `Book was deleted successfully!` });
        }
    });
}