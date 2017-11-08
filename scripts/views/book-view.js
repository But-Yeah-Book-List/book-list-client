'use strict';

var app = app || {};

(function(module){
  const bookView = {};
  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml()));
  };

  module.bookView = bookView;
})(app);

$(app.Book.fetchAll(app.bookView.initIndexPage));
