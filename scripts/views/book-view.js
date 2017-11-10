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

  bookView.initDetailPage = function(ctx) {
    $('.container').hide();
    let book = new module.Book(ctx.book);
    $('#book-detail').empty().append(book.toHtml('detail'));
    $('.book-detail').show();

    // verify function
    // If verify true
    // shgow buyttobs

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
