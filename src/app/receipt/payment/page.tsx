"use client";

import React, { useState } from "react";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getFutureDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T10:00`;
}

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "1608 W Sylvester St Unit C",
    city: "Pasco",
    phone: "",
    dateReceived: getCurrentDate(),
    datePromised: getFutureDate(),
    remarks: "",
    cash: false,
    card: false,
    weekly: false,
    monthly: false,
    willCall: false,
    mail: false,
    taxes: "0",
    typeOfPurchase: "purchase",
    payment: "",
    deposit: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value, name } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(formData);
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  }

  function handlePurchaseType(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      typeOfPurchase: value,
      payment: value === "purchase" ? prevData.payment : "",
      deposit: value === "lay_away" ? prevData.deposit : "",
    }));
  }

  return (
    // todo goal: make it look like physical receipt
    <form
      onSubmit={handleSubmit}
      className="small-receipt-form max-w-screen-sm mx-auto"
    >
      <h1 className="text-4xl font-black">
        No. <span className="text-sm font-normal">0001</span>
      </h1>

      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          autoComplete="off"
          readOnly
          disabled
        />
      </div>

      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          readOnly
          disabled
        />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="flex justify-between">
        <div>
          <label htmlFor="received">Date Received</label>
          <input
            type="date"
            name="received"
            id="received"
            value={formData.dateReceived}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="promised">Date Promised</label>
          <input
            type="datetime-local"
            name="promised"
            id="promised"
            value={formData.datePromised}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="remarks">Remarks</label>
        <textarea
          name="remarks"
          id="remarks"
          cols={5000}
          rows={4}
          onChange={handleChange}
          className="border border-black resize-none max-h-28"
        ></textarea>
      </div>

      <div className="grid grid-cols-3">
        {["cash", "card", "weekly", "monthly", "will-call", "mail"].map(
          (name) => (
            <div key={name} className="small-receipt-form__checkbox-container">
              <input
                type="checkbox"
                id={name}
                name={name}
                onChange={handleCheckbox}
              />
              <label htmlFor={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
            </div>
          ),
        )}
      </div>

      {/*todo add charges ._.*/}

      <fieldset className="border border-black">
        <legend>Taxes</legend>
        <div className="small-receipt-form__taxes-container">
          <input
            type="radio"
            name="taxes"
            id="default_tax"
            value="0"
            checked={formData.taxes === "0"}
            onChange={handleChange}
          />
          <label htmlFor="default_tax">0%</label>
        </div>

        <div className="small-receipt-form__taxes-container">
          <input
            type="radio"
            name="taxes"
            id="local_tax"
            value="8.9"
            checked={formData.taxes === "8.9"}
            onChange={handleChange}
          />
          <label htmlFor="local_tax">8.9%</label>
        </div>
      </fieldset>

      <fieldset className="border border-black">
        <legend>Type of purchase</legend>
        <div className="small-receipt-form__purchase-container">
          <input
            type="radio"
            name="typeOfPurchase"
            id="purchase"
            value="purchase"
            checked={formData.typeOfPurchase === "purchase"}
            onChange={handlePurchaseType}
          />
          <label htmlFor="purchase">Purchase</label>
        </div>

        <div className="small-receipt-form__purchase-container">
          <input
            type="radio"
            name="typeOfPurchase"
            id="lay_away"
            value="lay_away"
            checked={formData.typeOfPurchase === "lay_away"}
            onChange={handlePurchaseType}
          />
          <label htmlFor="lay_away">Lay away</label>
        </div>
      </fieldset>

      <hr />

      {formData.typeOfPurchase === "purchase" ? (
        <div>
          <label htmlFor="payment">Payment</label>
          <input
            type="text"
            name="payment"
            id="payment"
            value={formData.payment}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <label htmlFor="deposit">Deposit</label>
          <input
            type="text"
            name="deposit"
            id="deposit"
            value={formData.deposit}
            onChange={handleChange}
          />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Page;
