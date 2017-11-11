'use strict';

var app = app || {};

(function(module) {
  const adminView = {};

  adminView.initAdminPage = function() {

    //needs to show/initialize the passphrase form
    $('.container').hide();
    $('.admin-view').show();
    $('#admin-form').on('submit', (e) => {
      e.preventDefault();
      let token = e.target.password.value;
      adminView.verify(token);
    });

    // next();
  };

  adminView.verify = function(token) {
    $.get(`${module.__API_URL__}/admin`, {token})
      .then(results => {
        let correct = JSON.parse(results);
        if(correct) {
          alert('Password Correct!');
          page('/');
        } else {
          alert('Incorrect Password!');
        }
      });
  }

  module.adminView = adminView;
})(app);
