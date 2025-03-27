import {chromium,test,expect} from"@playwright/test";
const LT_USERNAME='mkdurga2015';
const LT_ACCESS_KEY='LT_azed5d4mrLZkGTSxDSWdnIb1y0kxf7Xx7eQwTJdlYI0ND9S';
const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 11',
      'build': 'Playwright Lambda Build',
      'name': 'LambdaTestScenario2.test',
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

test ('Slider test', async () => {
let browser;
try{
    // Attempt to connect to LambdaTest remote browser
    browser = await chromium.connect({
        wsEndpoint: `ws://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });


    // Create a new page in the remote browser
    const page = await browser.newPage();
    // Navigate to the URL
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await page.click("//a[normalize-space(text())='Drag & Drop Sliders']");

    const rangeValue = page.locator('#rangeSuccess');
    const slider15 = page.locator('//input[@type="range" and  @value="15"]');
    slider15.focus();

    while (await rangeValue.textContent() !== '95') {
      await slider15.press('PageUp'); // Move the slider to the right
    }

    const value = await page.textContent('#rangeSuccess');
    if (value?.trim() === '95') {
        console.log('✅ Test Passed: Slider value is 95');
    } else {
        console.log(`❌ Test Failed: Slider value is ${value?.trim()}`);
    }

  } catch (error) {
    console.error("Test failed: ", error);
  } finally {
    // Close the browser after the test
    if (browser) {
      await browser.close();
    }
  }
});
