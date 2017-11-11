'use strict';

// Set the page.js base to work for deployed site
if(location.hostname === 'but-yeah-book-list.github.io') page.base('/book-list-client');

// This is where we define the client-side routes
page('/', app.Book.fetchAll, app.bookView.initIndexPage);
page('/error', app.errorView.initErrorPage);
page('/books/new', app.bookView.initFormPage);
page('/books/:book_id', app.Book.fetchOne, app.bookView.initDetailPage);
page('/books/:book_id/update', app.Book.fetchOne, app.bookView.initUpdateFormPage);
page('/admin', app.adminView.initAdminPage);

page();
