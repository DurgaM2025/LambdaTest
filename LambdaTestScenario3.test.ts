import {chromium,test,expect} from"@playwright/test";
const LT_USERNAME='mkdurga2015';
const LT_ACCESS_KEY='LT_azed5d4mrLZkGTSxDSWdnIb1y0kxf7Xx7eQwTJdlYI0ND9S';
const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 11',
      'build': 'Playwright Lambda Build',
      'name': 'LambdaTestScenario3.test',
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

test('Enter form details', async () => {
let browser;
try{

    browser = await chromium.connect({
        wsEndpoint: `ws://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
      });

      // Create a new page in the remote browser
   
     const page = await browser.newPage();
        // Navigate to the URL
    await page.goto('https://www.lambdatest.com/selenium-playground/');
   
    // Click on the 'Input Form Submit' link
    await page.locator('text=Input Form Submit').click();
   
    // Fill out the form fields
    await page.locator('input[name="name"]').fill('durga');
    await page.locator('input[id="inputEmail4"]').fill('durga@persistent.com');
    await page.locator('input[name="password"]').fill('durga@123');
    await page.locator('input[name="company"]').fill('PSL');
    await page.locator('input[name="website"]').fill('www.persistent.com');
   
    // Select a value from the country dropdown
    await page.locator('select[name="country"]').selectOption({ label: 'United States' });
   
    // Fill out other fields
    await page.locator('input[name="city"]').fill('America');
    await page.locator('input[name="address_line1"]').fill('flat 10');
    await page.locator('input[name="address_line2"]').fill('Street XYZ');
    await page.locator('input[id="inputState"]').fill('America');
    await page.locator('input[name="zip"]').fill('10000');
   
    // Click the submit button by its text (direct match)
    await page.locator('button:has-text("Submit")').click();
   
    // Wait for the success message to appear
    const successMessageLocator = await page.locator('p.success-msg');
    await expect(successMessageLocator).toBeVisible(); // Ensure the success message is visible
    await expect(successMessageLocator).toHaveText('Thanks for contacting us, we will get back to you shortly.');
    }catch (error) {
      console.error("Test failed: ", error);
    } finally {
      // Close the browser after the test
      if (browser) {
        await browser.close();
      }
    }
  });
   
