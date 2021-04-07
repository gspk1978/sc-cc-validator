import '../App.css';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import React from 'react';
import valid from "card-validator";
import { useState } from 'react'
import validateForm from './validateForm';

const CCForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardZipCode, setCardZipCode] = useState('');
  const [focus, setFocus] = useState('');
  const [errors, setErrors] = useState({});

  function validateCCForm(cardNumber, name, cardExpiry, cvc, cardType, cardZipCode) { 
    setErrors(validateForm(cardNumber, name, cardExpiry, cvc, cardType, cardZipCode))
  }

  // function testMessageChange()
  // {
  //   setErrors({...errors, message:"something to display"});

  // }

  return (
    <div className="App">
      <div>
        <Cards
          cvc={cvc}
          expiry={cardExpiry}
          focused={focus}
          name={name}
          number={cardNumber}
        />
      </div>
      <br />
      <form name="ccform">
        <input
          type="number"
          id="cardNumber"
          data-testid="cardNumber"
          name="cardNumber"
          placeholder="Card Number"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br />
        <br />
        <input
          type="text"
          id="name"
          data-testid="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br />
        <br />
        <input
          type="text"
          id="cardExpiry"
          data-testid="cardExpiry"
          name="cardExpiry"
          placeholder="Card Expiry"
          value={cardExpiry}
          onChange={e => setCardExpiry(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br />
        <br />
        <input
          type="text"
          id="cvc"
          data-testid="cvc"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={e => setCvc(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br />
        <br />
        <input
          type="text"
          id="cardType"
          data-testid="cardType"
          name="cardType"
          placeholder="Card Type"
          value={cardType}
          onChange={e => setCardType(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br />
        <br />
        <input
          type="text"
          id="cardZipCode"
          data-testid="cardZipCode"
          name="cardZipCode"
          placeholder="Card Zip Code"
          value={cardZipCode}
          onChange={e => setCardZipCode(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <br />
        <br />
        <div id="errorAlert" data-testid="errorAlert">{errors.message}</div>
        <br />
        <br />
        <button
          type="button"
          id="validateCCForm"
          data-testid="validateCCForm"
          onClick={() => validateCCForm(cardNumber, name, cardExpiry, cvc, cardType, cardZipCode)}
        >Validate Card</button>
        {/* <button
          type="button"
          onClick={() => testMessageChange()}
        >Display Change Error</button> */}
      </form>
    </div>
  );
};

export default CCForm;
