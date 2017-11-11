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

  adminView.setAdmin = function() {
    localStorage.isAdmin = true;
    $('#admin-login-link').remove();
    page('/');
  }

  module.adminView = adminView;
})(app);
