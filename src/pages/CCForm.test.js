import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CCForm from "./CCForm";
import validateForm from "./validateForm";

const valid_values = {
  name: "Pradeep Giri",
  cardNumber: "4111111111111111",
  cardType: "VISA",
  cardExpiry: "05/25",
  cvc: "567",
  cardZipCode: "60563",
};

const null_values = {
  name: null,
  cardNumber: null,
  cardType: null,
  cardExpiry: null,
  cvc: null,
  cardZipCode: null,
};

describe("test the CCForm rendering", () => {
  const elements = [
    "name",
    "cardNumber",
    "cardType",
    "cardExpiry",
    "cvc",
    "cardZipCode",
    "validateCCForm",
    "errorAlert",
  ];

  test.each(elements)("focus on card front", async (element) => {
    let { getByTestId } = render(<CCForm />);
    expect(getByTestId(element)).toBeTruthy();
  });
});

describe("test form functionality", () => {
  const field = [
    ["name", valid_values.name],
    ["cardNumber", valid_values.cardNumber],
    ["cardType", valid_values.cardType],
    ["cardExpiry", valid_values.cardExpiry],
    ["cvc", valid_values.cvc],
    ["cardZipCode", valid_values.cardZipCode],
  ];

  test.each(field)("focus on card front", async (field, values) => {
    let { getByTestId } = render(<CCForm />);
    await act(async () => {
      await fireEvent.focus(getByTestId(field));
      await fireEvent.change(getByTestId(field), {
        target: { value: values },
      });
    });

    expect(getByTestId(field).value).toBe(values);
  });

});

describe("test empty fields", () => {
  const messages = [
    [0, "", "Cardholder name is not complete"],
    [1, "", "Credit card number is not complete"],
    [2, "", "Credit card type is not complete"],
    [3, "", "Credit card expiration date is not complete"],
    [4, "", "Credit card CVC is not complete"],
    [5, "", "Credit card postal code is not complete"],
  ];

  test("test null card", () => {
    expect(validateForm(null_values.cardNumber,null_values.name,null_values.cardExpiry,null_values.cvc,null_values.cardType,null_values.cardZipCode)).toStrictEqual({
      message: "Cardholder name is not complete",
      ccvv: false,
      cexp: false,
      cname: false,
      cnumber: false,
      cpostal: false,
      ctype: false,
    });
  });

});

describe("test valid fields", () => {
  test("test valid card", () => {
    const result = {
      message: "Credit Card is valid",
      ccvv: true,
      cexp: true,
      cname: true,
      cnumber: true,
      cpostal: true,
      ctype: true,
    };
    expect(validateForm(valid_values.cardNumber,valid_values.name,valid_values.cardExpiry,valid_values.cvc,valid_values.cardType,valid_values.cardZipCode)).toStrictEqual(result);
  });
});
