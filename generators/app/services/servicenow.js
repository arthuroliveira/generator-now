"use strict";
var http = require('http');
var restler = require('restler');
var url = require('url');
var util = require('util');

module.exports = restler.service(
  function (answers) {
    var client = this;

    var headers = {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    };

    this.baseURL = (answers.protocol || "https") + "://" + answers.instance;
    this.defaults.username = answers.username;
    this.defaults.password = answers.password;
    this.defaults.headers = headers;


  }, {}, {
    fetchScopes: function (callback) {
      var client = this;
      var urlObj = {
        pathname: '/api/now/table/sys_app',
        query: {}
      };

      var apiURL = url.format(urlObj);

      client.get(apiURL).on("complete", function (result) {
        callback(result);
      });
    }
  });
