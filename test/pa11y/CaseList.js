//think this was the initial test NOT using puppeteer

const pa11y = require('pa11y');

//Env URIs
const aaturl = 'https://www-ccd.nonprod.platform.hmcts.net/';
const aatloginurl = 'https://idam.preprod.ccidam.reform.hmcts.net/login?response_type=code&client_id=ccd_gateway&redirect_uri=https%3A%2F%2Fwww-ccd.nonprod.platform.hmcts.net%2Foauth2redirect';
// const aatloginurl = 'https://idam.preprod.ccidam.reform.hmcts.net/login';
const localurl = 'http://localhost:3451/login';

//Credentials
const uname = '';
const pwd = '';
runExample();


// Async function required for us to use await
async function runExample() {
  try {

      const result = await pa11y(aatloginurl, {
        timeout: 29000,

        wait: 5000,

        screenCapture: `${__dirname}/my-screen-capture.png`,

        actions: [
          `set field #username to ${uname}`,
          `set field #password to ${pwd}`,
          'click element .button',
         // 'wait for #dynamicFilters to emit load'
          // 'wait for url to be www-ccd.nonprod.platform.hmcts.net/list/case',
          // 'navigate to https://www-ccd.nonprod.platform.hmcts.net/list/case'
          // 'click element .button',
          // 'wait for path to not be /login',
          // 'wait for url to be https://www-ccd.nonprod.platform.hmcts.net/'
       //    'wait for fragment to be #wb-jurisdiction'
        ],


        log: {
          debug: console.log,
          error: console.error,
          info: console.log
        }

    });

    // Output the raw result object
    console.log(result);

  } catch (error) {

    // Output an error if it occurred
    console.error(error.message);

  }


}


function mymethod() {
  console.log('running custom method!');
}
