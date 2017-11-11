'use strict';

var app = app || {};

(function(module) {
  const adminView = {};
  delete localStorage.isAdmin;

  adminView.initAdminPage = function(ctx, next) {
    $('.container').hide();
    $('.admin-view').show();
    $('#admin-form').trigger('reset').off();
    $('#admin-form').on('submit', (e) => {
      e.preventDefault();
      let token = e.target.password.value;
      adminView.verify(token, next);
    });
  };

  adminView.verify = function(token, next) {
    $.get(`${module.__API_URL__}/admin`, {token})
      .then(results => {
        let correct = JSON.parse(results);
        if(correct) {
          alert('Password Correct!');
          next()
        } else {
          alert('Incorrect Password!');
        }
      });
  }

  adminView.setAdmin = function(ctx) {
    localStorage.isAdmin = true;
    $('#admin-login-link a').text('Admin Logout').on('click', (e) => {
      e.preventDefault();
      alert('You have successfully logged out.');
      $('.admin-only').hide();
      delete localStorage.isAdmin;
      $('#admin-login-link a').text('Admin Login').off();
    });
    ctx.params.book_id ? page(`/books/${ctx.params.book_id}`) : page('/');
  }

  module.adminView = adminView;
})(app);
