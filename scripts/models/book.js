'use strict';

var app = app || {};
// var __API_URL__ = 'https://sd-rr-booklist.herokuapp.com';
var __API_URL__ = 'http://localhost:3000';

(function(module) {
  $.get(`${__API_URL__}/test`)
    .then(console.log);

})(app);
