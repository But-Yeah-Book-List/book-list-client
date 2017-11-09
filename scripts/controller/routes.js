'use strict';

// This is where we define the client-side routes

page('/', app.bookView.initIndexPage);
page('/error', app.errorView.initErrorPage);
page('/books/:book_id', app.bookView.initDetailPage);

page();
