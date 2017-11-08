'use strict';

var app = app || {};
var __API_URL__ = 'https://sd-rr-booklist.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';

(function(module) {
  function Book(bookObject) {
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }

  function errorCallback(err) {
    module.errorView.initErrorPage(err);
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());

    return template(this);
  };

  Book.all = [];

  Book.loadAll = rows => {
    Book.all = rows.sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0).map(bookObject => new Book(bookObject));
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }

  module.Book = Book;
})(app);
