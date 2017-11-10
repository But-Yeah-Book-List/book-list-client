'use strict';

// Fixes the page.js issues with local vs deployment
(function(){
  if(__API_URL__ !== 'http://localhost:3000') { //eslint-disable-line
    page.base('/book-list-client');
  }
})();

// This is where we define the client-side routes
page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/error', app.errorView.initErrorPage);
page('/books/new', app.bookView.initFormPage);
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/books/:book_id/update', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdateFormPage));
page('/admin', ctx => app.adminView.initAdminPage, app.adminView.verify);

page();
