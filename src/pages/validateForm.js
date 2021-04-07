import valid from "card-validator";

export default function validateForm(cardNumber, name, cardExpiry, cvc, cardType, cardZipCode) {
  let errors = {};
  let creditCard = valid.number(cardNumber);

  creditCard.expirationDate = valid.expirationDate(cardExpiry);
  creditCard.cvv = valid.cvv(cvc);
  creditCard.cardholderName = valid.cardholderName(name);
  creditCard.postalCode = valid.postalCode(cardZipCode);

  errors.message = "An unknown error occured. Please try again later"
  errors.cname = false;
  errors.cnumber = false;
  errors.ctype = false;
  errors.cexp = false;
  errors.ccvv = false;
  errors.cpostal = false;

  if (cardZipCode === null || !cardZipCode.trim()) {
    errors.message = "Credit card postal code is not complete";
  } else if (creditCard.postalCode.isValid) {
    errors.cpostal = true;
  } else {
    errors.message = "Credit card postal code is invalid";
  }

  //Card CVV expiration
  if (cvc === null || !cvc.trim()) {
    errors.message = "Credit card CVC is not complete";
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message = "Credit card CVC is invalid";
  }

  //Card Expiration Verification
  if (cardExpiry === null || !cardExpiry.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
  }

  //Card Type Verification
  if (
    cardType === null ||
    !cardType.trim() ||
    creditCard.card === null
  ) {
    errors.message = "Credit card type is not complete";
  } else if (
    creditCard.card.type &&
    creditCard.card.type.toUpperCase() === cardType.toUpperCase()
  ) {
    errors.ctype = true;
  } else {
    errors.message = "Credit card type is invalid";
  }

  //Card Number Verification
  if (cardNumber === null || !cardNumber.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }

  //Cardholder Name Verification
  if (name === null || !name.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
  }

  if (
    errors.ctype &&
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.cpostal &&
    errors.ccvv
  ) {
    errors.message = "Credit Card is valid";
  }

  return errors;
}
