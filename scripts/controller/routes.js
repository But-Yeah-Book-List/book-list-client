'use strict';

// Set the page.js base if site is deployed on gh-pages
if(location.hostname === 'but-yeah-book-list.github.io') page.base('/book-list-client');

// This is where we define the client-side routes
page('/', app.Book.fetchAll, app.bookView.initIndexPage);
page('/books/new', app.bookView.initFormPage);
page('/books/:book_id', app.Book.fetchOne, app.bookView.initDetailPage);
page('/books/:book_id/update', app.Book.fetchOne, app.bookView.initUpdateFormPage);
page('/admin', app.adminView.initAdminPage, app.adminView.setAdmin);
page('/admin/:book_id', app.adminView.initAdminPage, app.adminView.setAdmin);
page('/about', app.bookView.initAboutPage);
page('/error', app.errorView.initErrorPage);

page();
