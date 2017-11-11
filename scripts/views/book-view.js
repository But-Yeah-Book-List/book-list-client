'use strict';

var app = app || {};

(function(module){
  const bookView = {};

  $('.container').hide();
  $('.fetching-data').show();

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('#book-list').empty();
    $('.book-view').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml('list')));
    $('#num-books').text(`${module.Book.all.length}`);
  };

  bookView.initDetailPage = function(ctx) {
    $('.container').hide();
    let book = new module.Book(ctx.book);
    $('#book-detail').empty().append(book.toHtml('detail'));
    localStorage.isAdmin ? $('.admin-only').show() : $('.admin-only').hide();
    $('.book-detail').show();
    $('#delete-book').on('click', () => {
      module.Book.deleteBook(ctx.params.book_id);
    });
  };

  bookView.initUpdateFormPage = function(ctx) {
    $('.container').hide();
    $('#new-book button').text('Update Book');
    $('.create-view').show();
    $('#title-form').val(ctx.book.title);
    $('#author-form').val(ctx.book.author);
    $('#isbn-form').val(ctx.book.isbn);
    $('#image_url-form').val(ctx.book.image_url);
    $('#description-form').val(ctx.book.description);
    $('#new-book').off();
    $('#new-book').on('submit', (e) => {
      e.preventDefault();
      module.Book.updateBook(ctx, module.Book.getFormData(e));
    });
  };

  bookView.initFormPage = function() {
    $('.container').hide();
    $('#new-book').trigger('reset');
    $('.create-view').show();
    $('#new-book').off();
    $('#new-book').on('submit', module.Book.createBookHandler);
  }

  module.bookView = bookView;
})(app);
