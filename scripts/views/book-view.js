'use strict';

var app = app || {};

(function(module){
  const bookView = {};
  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml()));
    $('.book-view').append(`<section><h3>There are ${module.Book.all.length} books.</h3></section>`);
    $('.book-view').append(`<section><h3>About Us</h3><p>Seth Donohue and Robert Reed developed this site with love.</p></section>`);
  };

  module.bookView = bookView;
})(app);

$(app.Book.fetchAll(app.bookView.initIndexPage));
