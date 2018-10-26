'use strict';

const pa11y = require('pa11y');
const puppeteer = require('puppeteer');

const uname = '';
const pwd = '';

const aatloginurl = 'https://idam.preprod.ccidam.reform.hmcts.net/login?response_type=code&client_id=ccd_gateway&redirect_uri=https%3A%2F%2Fwww-ccd.nonprod.platform.hmcts.net%2Foauth2redirect';

//todo need to 'get' these urls from somewhere that is not hardcoded. use string interpolation to parse in case details to url
const searchPage = 'https://www-ccd.nonprod.platform.hmcts.net/search';
const caseListPage = 'https://www-ccd.nonprod.platform.hmcts.net/list/case';
const createCasePage = 'https://www-ccd.nonprod.platform.hmcts.net/create/case';
const caseDetailsPage = 'https://www-ccd.nonprod.platform.hmcts.net/case/PROBATE/GrantOfRepresentation/1525258641233364';
const createCaseFirstFormPage = 'https://www-ccd.nonprod.platform.hmcts.net/create/case/TEST/DemoCase/CREATE/CREATEfirst ';
const createCaseSubmitPage = 'https://www-ccd.nonprod.platform.hmcts.net/create/case/TEST/DemoCase/CREATE/submit';
const caseEventHistoryPage = 'https://www-ccd.nonprod.platform.hmcts.net/case/PROBATE/GrantOfRepresentation/1525257550935803/event/158113/history';

runExample();

// Async function required for us to use await
async function runExample() {
  let browser;
  let pages;
  try {

    // Launch our own browser
    browser = await puppeteer.launch({
      headless: false
    });

    // Create a page for the test runs
    // (Pages cannot be used in multiple runs)
    pages = [
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage()
    ];


    //initially login with first tab, cookie will then be used for all tests using other tabs
    let page = pages[0];
    await page.goto(aatloginurl);

    const usernameField = await page.$('#username');
    await usernameField.type(uname);

    const passwordField = await page.$('#password');
    await passwordField.type(pwd);

    const submitbutton = await page.$('.button');
    await submitbutton.click();

    await Promise.race([
      page.waitFor('#wb-jurisdiction'),
    ]);

    await page.screenshot({path: 'last-puppeteer-page-screenshot.png'});

    const searchPageTest = await pa11y(searchPage, {
      browser: browser,
      page: pages[0],
      screenCapture: `${__dirname}/pa11y-screenshot-searchPage.png`,
      actions: [
        'wait for element #s-jurisdiction to be visible'
      ]
    });

    const caseListTest = await pa11y(caseListPage, {
      browser: browser,
      page: pages[1],
      screenCapture: `${__dirname}/pa11y-screenshot-caseListPage.png`,
      actions: [
        'wait for element table to be visible'
      ]
    });

    const createCaseTest = await pa11y(createCasePage, {
      browser: browser,
      page: pages[2],
      screenCapture: `${__dirname}/pa11y-screenshot-createCasePage.png`,
      actions: [
        'wait for element #cc-jurisdiction to be visible'
      ],

    });

    const caseDetailsTest = await pa11y(caseDetailsPage, {
      browser: browser,
      page: pages[3],
      screenCapture: `${__dirname}/pa11y-screenshot-caseDetailsPage.png`,
      actions: [
        'wait for element .EventLogDetails to be visible'
      ],
    });

    const createCaseFirstFormTest = await pa11y(createCaseFirstFormPage, {
      browser: browser,
      page: pages[4],
      screenCapture: `${__dirname}/pa11y-screenshot-createCaseFirstFormPage.png`,
      actions: [
        'wait for element .global-header to be visible'
      ],

    });

    const createCaseSubmitTest = await pa11y(createCaseSubmitPage, {
      browser: browser,
      page: pages[5],
      screenCapture: `${__dirname}/pa11y-screenshot-createCaseSubmitPage.png`,
      actions: [
        'wait for element .global-header to be visible'
      ],

    });

    const caseEventHistoryTest = await pa11y(caseEventHistoryPage, {
      browser: browser,
      page: pages[6],
      screenCapture: `${__dirname}/pa11y-screenshot-caseEventHistoryPage.png`,
      actions: [
        'wait for element .global-header to be visible'
      ],

    });
    // Output the raw result objects
    console.log(searchPageTest);
    console.log(caseListTest);
    console.log(createCaseTest);
    console.log(caseDetailsTest);
    console.log(createCaseFirstFormTest);
    console.log(createCaseSubmitTest);
    console.log(caseEventHistoryTest);

    const htmlResults = await html.results(searchPageTest);

    console.log(htmlResults);

    // Close the browser instance and pages now we're done with it
    for (const page of pages) {
      await page.close();
    }
    await browser.close();

  } catch (error) {

    // Output an error if it occurred
    console.error(error.message);

    // Close the browser instance and pages if theys exist
    if (pages) {
      for (const page of pages) {
        await page.close();
      }
    }
    if (browser) {
      await browser.close();
    }

  }
}
