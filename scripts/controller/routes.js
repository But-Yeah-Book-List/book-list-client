'use strict';

// This is where we define the client-side routes

page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/error', app.errorView.initErrorPage);
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page();
