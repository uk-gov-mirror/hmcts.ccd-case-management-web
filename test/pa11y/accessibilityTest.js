//trying to be inventive here and pypass login, never did work though...

const pa11y = require('pa11y');
const credentials = ':';
const encodedCredentials = new Buffer(credentials).toString('base64');

//Credentials
const uname = '';
const pwd = '';

let token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJvYTducjUxZ3AydjdwcjdsZHJvcjl1YzZtMyIsInN1YiI6IjI4IiwiaWF0IjoxNTM2MzE0ODgyLCJleHAiOjE1MzYzNDM2ODIsImRhdGEiOiJjYXNld29ya2VyLXRlc3QsY2FzZXdvcmtlcixjYXNld29ya2VyLXRlc3QtbG9hMSxjYXNld29ya2VyLWxvYTEiLCJ0eXBlIjoiQUNDRVNTIiwiaWQiOiIyOCIsImZvcmVuYW1lIjoidGVzdCIsInN1cm5hbWUiOiJjYXNld29ya2VyIiwiZGVmYXVsdC1zZXJ2aWNlIjoiQ0NEIiwibG9hIjoxLCJkZWZhdWx0LXVybCI6Imh0dHBzOi8vbG9jYWxob3N0OjkwMDAvcG9jL2NjZCIsImdyb3VwIjoiY2FzZXdvcmtlciJ9.ek4whTbF8ToQVN72KaQTIFNBjL5WIAE0nt5EpxkrHoQ';
let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJyODc5czFpdTJnamhnbWJsMWVmcWJvMGEzbyIsInN1YiI6IjEiLCJpYXQiOjE1MzYzMjQ1NjQsImV4cCI6MTUzNjM0MjU2NCwiZGF0YSI6ImNjZC1pbXBvcnQsY2NkLWltcG9ydC1sb2EwIiwidHlwZSI6IkFDQ0VTUyIsImlkIjoiMSIsImZvcmVuYW1lIjoiSW50ZWdyYXRpb24iLCJzdXJuYW1lIjoiVGVzdCIsImRlZmF1bHQtc2VydmljZSI6IlByb2JhdGUiLCJsb2EiOjAsImRlZmF1bHQtdXJsIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTAwMC9wb2MvcHJvYmF0ZSIsImdyb3VwIjoicHJvYmF0ZS1wcml2YXRlLWJldGEifQ.EwYrcJ3tVqZoH4-3ogvLzOdNO0wDJhH2WH8rtc4KPJ0';

runExample();

// Async function required for us to use await
async function runExample() {
  try {

    let hello = 'demo';
    // Test http://example.com/
    // const result = await pa11y('http://localhost:3451/list/case?jurisdiction=TEST&case-type=TestAddressBookCase&case-state=CaseCreated', {
    const result = await pa11y('http://localhost:3451/login', {

      headers: {
         // Authorization: `Bearer ${accessToken}`,
         Authorization: `Basic ${encodedCredentials}`,
        Cookie: `accessToken=${accessToken}`,
        Cookie:  '_ga=GA1.1.930712619.1536316740',
        Cookie: '_gid=GA1.1.976074787.1536316740'
      },


      chromeLaunchConfig: {
        args: [
          // '--proxy-server=proxyout.reform.hmcts.net:8080',
          '--headless=false',
        ]
      },


      actions: [
        `set field #username to ${uname}`,
        `set field #password to ${pwd}`,
        'click element input[type=submit]',
      //  'wait for fragment to be #wb-jurisdiction'
        ],

      wait: 3000,
      // Log what's happening to the console
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
