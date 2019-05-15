let CallbackService = require('../utils/callbackService.js');


let chai = require("chai").use(require("chai-as-promised"));
let http = require("http");
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then}) {


  Given(/^I have started a callback service$/, async function () {
      await new CallbackService().startServer();
      // await browser.sleep(20000)
  });

  When(/^I can send a request to the callback service to retrieve hardcoded data$/, async function () {

    var options = {
      host: 'localhost',
      port: 3000,
      path: '/'
    };

    http.get(options, function(res) {
      console.log("Got response: " + res.statusCode);

      res.on("data", function(chunk) {
        console.log("BODY: " + chunk);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  });


});
