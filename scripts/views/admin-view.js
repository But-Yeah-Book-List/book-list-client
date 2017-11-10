'use strict';

var app = app || {};

(function(module) {
  const adminView = {};

  adminView.initAdminPage = function(ctx, next) {

    //needs to show/initialize the passphrase form
    $('.container').hide();
    $('.admin-view').show();
    $('#admin-message').empty();
    let template = Handlebars.compile($('#admin-template').text());
    $('#admin-message').append(template(err));
    next();
  };

  adminView.verify = function() {
    //needs to check passphrase and then open up rest of book editing
      // jquery to grab passphrase

    //hides delete button unless passed verification
  }

  module.adminView = adminView;
})(app);
