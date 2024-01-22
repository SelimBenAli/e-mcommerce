import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      values.firstName &&
      values.lastName &&
      values.email &&
      values.phoneNumber &&
      values.password &&
      values.address
    ) {
      setValid(true);
      try {
        const response = await fetch('http://127.0.0.1:8086/api/creation-user', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: values.firstName,
            prenom: values.lastName,
            mail: values.email,
            tel: values.phoneNumber,
            mdp: values.password,
            adresse: values.address,
          }),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          console.error("Failed to register:", response.statusText);
        }
      } catch (error) {
        console.error("Error during registration:", error.message);
      }
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {values.firstName} {values.lastName}{" "}
            </h3>
            <div>Your registration was successful!</div>
          </div>
        )}
        {!valid && (
          <div>
            <label className="label">First Name: </label>
            <input
              className="form-field"
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
            />
          </div>
        )}

        {submitted && !values.firstName && (
          <span id="first-name-error">Please enter a first name</span>
        )}

        {!valid && (
          <div>
            <label className="label">Last Name: </label>
            <input
              className="form-field"
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
            />
          </div>
        )}

        {submitted && !values.lastName && (
          <span id="last-name-error">Please enter a last name</span>
        )}

        {!valid && (
          <div>
            <label className="label">Email: </label>
            <input
              className="form-field"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </div>
        )}

        {submitted && !values.email && (
          <span id="email-error">Please enter an email address</span>
        )}

        {!valid && (
          <div>
            <label className="label">Phone Number: </label>
            <input
              className="form-field"
              type="text"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        )}

        {submitted && !values.phoneNumber && (
          <span id="phone-number-error">Please enter a phone number</span>
        )}

        {!valid && (
          <div>
            <label className="label">Password: </label>
            <input
              className="form-field"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
          </div>
        )}

        {submitted && !values.password && (
          <span id="password-error">Please enter a password</span>
        )}

        {!valid && (
          <div>
            <label className="label">Address: </label>
            <input
              className="form-field"
              type="text"
              placeholder="Enter your address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
        )}

        {submitted && !values.address && (
          <span id="address-error">Please enter an address</span>
        )}

        {!valid && (
          <button  type="submit" className="button is-primary is-outlined is-pulled-right">
            Register
          </button>
        )}
      </form>
    </div>
  );
}
