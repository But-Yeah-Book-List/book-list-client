'use strict';

var app = app || {};

(function(module){
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml('list')));
    $('.book-view').append(`<section><h3>There are ${module.Book.all.length} books.</h3></section>`);
    $('.book-view').append(`<section><h3>About Us</h3><p>Seth Donohue and Robert Reed developed this site with love.</p></section>`);
  };

  bookView.initDetailPage = function(ctxBook) {
    $('.container').hide();
    let book = new module.Book(ctxBook);
    $('#book-detail').empty().append(book.toHtml('detail'));
    $('.book-detail').show();
  };

  bookView.initFormPage = function() {
    $('.container').hide();
    $('.create-view').show();
    $('#new-book').on('submit', module.Book.createBookHandler);
  }

  module.bookView = bookView;
})(app);
