import { render, screen } from '@testing-library/react';
import App from './App';
import puppeteer from "puppeteer";

let browser, page;

test('renders learn react link', () => {
  render(<App />);
});

const valid_values = {
  name: "Pradeep Giri",
  cardNumber: "4111111111111111",
  cardType: "VISA",
  cardExpiry: "05/25",
  cvc: "567",
  cardZipCode: "60563",
};

// Complete form and submit
async function fillForm(values, page) {
  await page.click("input#name");
  await page.type("input#name", values.name);
  await page.click("input#cardNumber");
  await page.type("input#cardNumber", values.cardNumber);
  await page.click("input#cardType");
  await page.type("input#cardType", values.cardType);
  await page.click("input#cardExpiry");
  await page.type("input#cardExpiry", values.cardExpiry);
  await page.click("input#cvc");
  await page.type("input#cvc", values.cvc);
  await page.click("input#cardZipCode");
  await page.type("input#cardZipCode", values.cardZipCode);
  await page.click("button#validateCCForm");
}

// Create values object depending on which field is empty
function emptyField(index, field) {
  let values = Object.create(valid_values);
  switch (index) {
    case 0:
      values.name = field;
      break;
    case 1:
      values.cardNumber = field;
      break;
    case 2:
      values.cardType = field;
      break;
    case 3:
      values.cardExpiry = field;
      break;
    case 4:
      values.cvc = field;
      break;
    case 5:
      values.cardZipCode = field;
      break;
    default:
      break;
  }
  return values;
}

describe("test empty fields", () => {
  const errors = [
    [0, "Cardholder name is not complete"],
    [1, "Credit card number is not complete"],
    [2, "Credit card type is not complete"],
    [3, "Credit card expiration date is not complete"],
    [4, "Credit card CVC is not complete"],
    [5, "Credit card postal code is not complete"],
  ];

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/", {waitUntil: 'domcontentloaded'});
  });

  test("submit empty form", async () => {
    await page.click("button#validateCCForm");
    let alertMessage = await page.$eval(
      "div#errorAlert",
      (alert) => alert.textContent
    );
    expect(alertMessage).toBe("Cardholder name is not complete");
  });

  test.each(errors)("submit empty field ", async (index, err) => {
    let values = emptyField(index, "");
    await fillForm(values, page);

    let alertMessage = await page.$eval(
      "div#errorAlert",
      (alert) => alert.textContent
    );
    expect(alertMessage).toBe(err);
  });

  afterEach(async () => {
    await browser.close();
  });
});

describe("test valid fields", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  test("submit valid card", async () => {
    let values = Object.create(valid_values);
    await fillForm(values, page);

    let alertMessage = await page.$eval(
      "div#errorAlert",
      (alert) => alert.textContent
    );
    expect(alertMessage).toBe("Credit Card is valid");
  });

  afterEach(async () => {
    await browser.close();
  });
});