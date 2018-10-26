//initial stuff playing around here

const puppeteer = require('puppeteer');

const uname = '';
const pwd = '';

const aatloginurl = 'https://idam.preprod.ccidam.reform.hmcts.net/login?response_type=code&client_id=ccd_gateway&redirect_uri=https%3A%2F%2Fwww-ccd.nonprod.platform.hmcts.net%2Foauth2redirect';


puppeteer.launch({
  headless: false
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto(aatloginurl);

  const usernameField = await page.$('#username');
  await usernameField.type(uname);

  const passwordField = await page.$('#password');
  await passwordField.type(pwd);

  const submitbutton = await page.$('.button');
  await submitbutton.click();

  await page.waitForNavigation();

  await Promise.race([
    page.waitFor('#wb-jurisdiction'),
  ]);

  await page.screenshot({path: 'last-page-screenshot.png'});

  await browser.close();
});
