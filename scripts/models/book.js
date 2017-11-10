'use strict';

var app = app || {};
// var __API_URL__ = 'https://sd-rr-booklist.herokuapp.com';
var __API_URL__ = 'http://localhost:3000';

(function(module) {
  function Book(bookObject) {
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }

  function errorCallback(err) {
    module.errorView.initErrorPage(err);
  }

  Book.prototype.toHtml = function(type) {
    let template = Handlebars.compile($(`#book-${type}-template`).text());

    return template(this);
  };

  Book.deleteBook = function(ctxBookId) {
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${ctxBookId}`,
      method: 'DELETE'
    })
      .then(() => page('/'))
      .catch(console.error);
  };

  Book.all = [];

  Book.loadAll = rows => {
    Book.all = rows.sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0).map(bookObject => new Book(bookObject));
  };

  Book.updateBook = function(ctxBook, newBookData) {
    console.log('CTX', ctxBook);
    console.log('new Book', newBookData);
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${ctxBook.book_id}`,
      method: 'PUT',
      data: {
        title: newBookData.title,
        author: newBookData.author,
        isbn: newBookData.isbn,
        image_url: newBookData.image_url,
        description: newBookData.description
      }
    })
      .then(() => page('/'))
      .catch(errorCallback);
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  };

  Book.fetchOne = (ctx, callback) => {
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallback);
  }

  Book.createBookHandler = function(e) {
    e.preventDefault();
    Book.addNewBook(Book.getFormData(e));
  };

  // Book.updateBookHandler = function(e) {
  //   e.preventDefault();
  //   Book.updateBook(Book.getFormData(e));
  // };

  Book.addNewBook = function(book) {
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .catch(errorCallback);
  };

  Book.getFormData = function(e) {
    let book ={
      title: e.target.title.value,
      author: e.target.author.value,
      isbn: e.target.isbn.value,
      image_url: e.target.image_url.value,
      description: e.target.description.value,
    }
    return book;
  }

  //jQuery for Icon Menu
  $('.icon-menu').on('click', () => $('.menu-link').toggle());

  module.Book = Book;
})(app);
