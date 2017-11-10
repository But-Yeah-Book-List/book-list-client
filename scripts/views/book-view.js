'use strict';

var app = app || {};

(function(module){
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml('list')));
    $('.book-view').append(`<section class="book-count"><h3>There are ${module.Book.all.length} books.</h3></section>`);
    $('.book-view').append(`<section class="about-us"><h3>About Us</h3><p>Seth Donohue and Robert Reed developed this site with love.</p></section>`);
  };

  bookView.initDetailPage = function(ctxBook) {
    $('.container').hide();
    let book = new module.Book(ctxBook);
    $('#book-detail').empty().append(book.toHtml('detail'));
    $('.book-detail').show();
    $('#delete-book').on('click', () => {
      module.Book.deleteBook(ctxBook.book_id);
    });
  };

  bookView.initUpdateFormPage = function(ctxBook) {
    $('.container').hide();
    $('.create-view').show();
    $('#title-form').val(ctxBook.title);
    $('#author-form').val(ctxBook.author);
    $('#isbn-form').val(ctxBook.isbn);
    $('#image_url-form').val(ctxBook.image_url);
    $('#description-form').val(ctxBook.description);
  };

  bookView.initFormPage = function() {
    $('.container').hide();
    $('#new-book').trigger('reset');
    $('.create-view').show();
    $('#new-book').on('submit', module.Book.createBookHandler);
  }

  module.bookView = bookView;
})(app);
