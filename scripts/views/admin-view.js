'use strict';

var app = app || {};

(function(module) {
  const adminView = {};

  adminView.initAdminPage = function(ctx) {

    //needs to show/initialize the passphrase form
    $('.container').hide();
    $('.admin-view').show();
    $('admin-form').on('submit', (e) => {
      let token = e.target.password.value;
      adminView.verify(token);
    });

    // next();
  };

  adminView.verify = function(token) {
    $.get(`${module.__API_URL__}/api/v1/admin`, {token})
      .then(results => {
        let correct = JSON.parse(results);
        console.log(results, correct);
      });
  }

  module.adminView = adminView;
})(app);
