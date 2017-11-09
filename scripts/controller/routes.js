'use strict';

// Fixes the page.js issues with local vs deployment
(function(){
  if(__API_URL__ !== 'http://localhost:3000') {
    page.base('/book-list-client');
  }
})();

// This is where we define the client-side routes
page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/error', app.errorView.initErrorPage);
page('/books/new', app.bookView.initFormPage);
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page();
