import React, { useState } from "react";
import DesktopBg from "./assets/images/bg-main-desktop.png";
import MobileBg from "./assets/images/bg-main-mobile.png";
import BgCardBack from "./assets/images/bg-card-back.png";
import BgCardFront from "./assets/images/bg-card-front.png";
import logo from "./assets/images/card-logo.svg";
import tick from "./assets/images/icon-complete.svg";
import { format } from "date-fns";
const App = () => {
  const [confirm, setConfirm] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("01/23");
  const [cvc, setCvc] = useState("");

  const [cardNumberError, setCardNumberError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [cvcError, setCvcError] = useState(false);

  const validateCardNumber = (value) => {
    const containsLetter = /[a-zA-Z]/.test(value);
    if (containsLetter) {
      setCardNumberError(true);
    } else {
      setCardNumberError(false);
    }
  };

  const validateEmptyField = (value, setter) => {
    if (value === "") {
      setter(true);
    } else {
      setter(false);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);
    validateCardNumber(value);
    if (cardNumberError) {
      resetErrors();
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateEmptyField(value, setNameError);
    if (nameError) {
      resetErrors();
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    validateEmptyField(value, setDateError);
    if (dateError) {
      resetErrors();
    }
  };

  const handleCvcChange = (e) => {
    const value = e.target.value;
    setCvc(value);
    validateEmptyField(value, setCvcError);
    if (cvcError) {
      resetErrors();
    }
  };

  const handleConfirmation = () => {
    if (!cardNumberError && !nameError && !dateError && !cvcError) {
      setConfirm(true);
    }
  };

  const resetErrors = () => {
    setCardNumberError(false);
    setNameError(false);
    setDateError(false);
    setCvcError(false);
  };

  return (
    <>
      <section>
        <div className=" absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={DesktopBg} />
            <img src={MobileBg} className="w-full md:w-1/3" />
          </picture>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-10 mx-5 grid grid-cols-1  ">
            <article className="front-card p-5 flex flex-col justify-between">
              <img className=" w-20 lg:w-28" src={logo} alt="" />
              <div className="">
                <h2 className="text-white tracking-widest text-xl md:text-2xl lg:text-3xl mb-6">
                  {cardNumber}
                </h2>
                <ul className="flex justify-between items-center">
                  <li className="text-white text-lg md:text-xl uppercase tracking-widest ">
                    {name}
                  </li>
                  <li className="text-white text-xl uppercase tracking-widest">
                    {format(new Date(date), "MM/yy")}
                  </li>
                </ul>
              </div>
            </article>
            <article className="back-card relative md:ml-20">
              <p className=" absolute  right-8 top-[8.4rem] text-white text-lg lg:textxl max-md:top-[6.1rem]  tracking-widest">
                {cvc}
              </p>
            </article>
          </div>
          <div className="pt-8 px-5 pb-20">
            {!confirm && (
              <form className="flex flex-col justify-center lg:h-screen gap-8 max-w-lg">
                <div>
                  <label htmlFor="cardHolder_name">CardHolder Name</label>
                  <input
                    type="text"
                    name="cardHolder_name"
                    id="cardHolder_name"
                    placeholder="e.g. Ayan Salmani"
                    required
                    value={name}
                    onChange={handleNameChange}
                  />
                  {nameError && <p className="text-red-500">Can't be blank</p>}
                </div>
                <div>
                  <label htmlFor="card_number">Card Number</label>
                  <input
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    maxLength={19}
                    required
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={handleCardNumberChange}
                  />
                  {cardNumberError && (
                    <p className="text-red-500">Wrong format, number only</p>
                  )}
                </div>
                <article className="flex justify-between items-center gap-8">
                  <div className="flex-1">
                    <label htmlFor="exp_date">Exp, date (MM/YY)</label>
                    <input
                      type="month"
                      name="exp_date"
                      id="exp_date"
                      placeholder="MM YY"
                      required
                      value={date}
                      onChange={handleDateChange}
                    />
                    {dateError && (
                      <p className="text-red-500">Can't be blank</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cvc">cvc</label>
                    <input
                      type="number"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={handleCvcChange}
                    />
                    {cvcError && <p className="text-red-500">Can't be blank</p>}
                  </div>
                </article>
                <button onClick={handleConfirmation} className="btn">
                  Confirm
                </button>
              </form>
            )}
            {confirm && <ThankYou setConfirm={setConfirm} />}
          </div>
        </div>
      </section>
    </>
  );
};

function ThankYou({ setConfirm }) {
  return (
    <>
      <div className="thank-you flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto ">
        <img src={tick} className="block mx-auto my-6" />
        <h1 className="text-slate-800 text-3xl mb-6 uppercase text-center">
          Thank You!
        </h1>
        <p className="text-slate-400 text-center">
          We've added your Card details
        </p>
        <button
          onClick={() => setConfirm(false)}
          className="btn block mx-auto mt-10 w-full"
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default App;
