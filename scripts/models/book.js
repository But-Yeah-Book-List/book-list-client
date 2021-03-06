'use strict';

var app = app || {};

(function(module) {
  module.__API_URL__ = 'https://sd-rr-booklist.herokuapp.com';
  if(location.hostname !== 'but-yeah-book-list.github.io') module.__API_URL__ = 'http://localhost:3000';

  function Book(bookObject) {
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }

  function errorCallback(err) {
    module.errorView.initErrorPage(err);
  }

  Book.all = [];

  Book.prototype.toHtml = function(type) {
    let template = Handlebars.compile($(`#book-${type}-template`).text());

    return template(this);
  };

  Book.loadAll = rows => {
    Book.all = rows.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())).map(bookObject => new Book(bookObject));
  };

  Book.fetchAll = (ctx, next) => {
    $.get(`${module.__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(next)
      .catch(errorCallback);
  };

  Book.fetchOne = (ctx, next) => {
    $.get(`${module.__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(next)
      .catch(errorCallback);
  }

  Book.deleteBook = function(ctxBookId) {
    $.ajax({
      url: `${module.__API_URL__}/api/v1/books/${ctxBookId}`,
      method: 'DELETE'
    })
      .then(() => page('/'))
      .catch(console.error);
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

  Book.updateBook = function(ctx, newBookData) {
    $.ajax({
      url: `${module.__API_URL__}/api/v1/books/${ctx.params.book_id}`,
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

  Book.addNewBook = function(book) {
    $.post(`${module.__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .catch(errorCallback);
  };

  module.Book = Book;
})(app);
