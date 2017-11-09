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

  bookView.initDetailPage = function(ctx) {
    $('.container').hide();
    let book = new module.Book(ctx.book);
    $('.book-detail').append(book.toHtml('detail'));
  }

  module.bookView = bookView;
})(app);

$(app.Book.fetchAll(app.bookView.initIndexPage));
