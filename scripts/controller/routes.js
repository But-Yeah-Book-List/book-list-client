'use strict';

// This is where we define the client-side routes
page.base('/book-list-client');
page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/error', app.errorView.initErrorPage);
page('/books/new', app.bookView.initFormPage);
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page();
