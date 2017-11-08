'use strict';

var app = app || {};
var __API_URL__ = 'https://sd-rr-booklist.herokuapp.com/';

(function(module) {
  $.get(`${__API_URL__}test`)
    .then(console.log);

})(app);
