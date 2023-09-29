module.exports = app => {
    const books = require('../controllers/books.controller.js');
    const router = require('express').Router();

    router.get('/', books.getBook);
    router.post('/', books.addBook);
    router.get('/:isbn', books.getBookByISBN);
    router.put('/:isbn', books.editBook);
    router.delete('/:isbn', books.deleteBook);

    app.use('/api', router);
}