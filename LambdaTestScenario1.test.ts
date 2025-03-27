import {chromium,test,expect} from"@playwright/test";
import dotenv from 'dotenv';
const LT_USERNAME='mkdurga2015';
const LT_ACCESS_KEY='LT_azed5d4mrLZkGTSxDSWdnIb1y0kxf7Xx7eQwTJdlYI0ND9S';
const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 11',
      'build': 'Playwright Lambda Build',
      'name': 'LambdaTestScenario1.test',
      'user': LT_USERNAME,
      'accessKey': LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      //'playwrightClientVersion': playwrightClientVersion
    }
  };

test ("Login Test Demo",async() => {
let browser;
try{

    dotenv.config();
    const TEST_URL = process.env.TEST_URL;

    browser = await chromium.connect({
        wsEndpoint: `ws://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
      });

      // Create a new page in the remote browser
   
     const page = await browser.newPage();
    await page.goto(TEST_URL);
    await page.waitForSelector("#user-message", { timeout: 10000 });  // Wait for element to be available
 
    // Assert the page is loaded correctly
    const currentUrl = page.url();
    expect(currentUrl).toContain('simple-form-demo');
 
    // Interact with the page 
    await page.locator("//input[@id='user-message']").fill('Welcome to LambdaTest');
  } catch (error) {
    console.error("Test failed: ", error);
  } finally {
    // Close the browser after the test
    if (browser) {
      await browser.close();
    }
  }
});
