import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useRecoilState } from "recoil";

import "./styles.css";
import { refreshState } from "../atoms/person";

function NewPerson({ newPersonForm }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [refresh, setRefresh] = useRecoilState(refreshState);

  const submitNewPerson = async (event) => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const formatPhoneNumber = (str) => {
      //Filter only numbers from the input
      let cleaned = ("" + str).replace(/\D/g, "");

      //Check if the input is of correct length
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

      if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
      }

      return "";
    };

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zipcode
    ) {
      alert("You need to fill in all the fields");
      event.preventDefault();
      return;
    } else if (!regexEmail.test(email)) {
      alert("You need to use a valid email");
      event.preventDefault();
      return;
    } else if (!formatPhoneNumber(phone)) {
      alert("You need to use a valid 10 numbers phone");
      event.preventDefault();
      return;
    }

    await axios
      .post("https://front-end.oudemo.com/api/address/new", {
        apikey: process.env.REACT_APP_API_KEY,
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        zipcode,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setZipcode("");
  };

  return (
    <div>
      <Button
        className="button-style"
        onClick={() => {
          newPersonForm();
          setRefresh(!refresh);
        }}
      >
        Back
      </Button>
      <form>
        <div className="form">
          <label className="label">First Name</label>
          <input
            className="input-form"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
            type="text"
            required
          />
        </div>

        <div className="form">
          <label className="label">Last Name</label>
          <input
            className="input-form"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
            type="text"
            required
          />
        </div>

        <div className="form">
          <label className="label">Email</label>
          <input
            className="input-form"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            type="email"
            required
          />
        </div>

        <div className="form">
          <label className="label">Phone</label>
          <input
            className="input-form"
            placeholder="Phone"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
            type="tel"
            required
          />
        </div>

        <div className="form">
          <label className="label">Address</label>
          <input
            className="input-form"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.currentTarget.value)}
            type="text"
            required
          />
        </div>

        <div className="form">
          <label className="label">City</label>
          <input
            className="input-form"
            placeholder="City"
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
            type="text"
            required
          />
        </div>

        <div className="form">
          <label className="label">State</label>
          <input
            className="input-form"
            placeholder="State"
            value={state}
            onChange={(event) => setState(event.currentTarget.value)}
            type="text"
            required
          />
        </div>

        <div className="form">
          <label className="label">ZIP Code</label>
          <input
            className="input-form"
            placeholder="ZIP Code"
            value={zipcode}
            onChange={(event) => setZipcode(event.currentTarget.value)}
            type="text"
            required
          />
        </div>

        <div className="submit-container">
          <Button className="button-style" onClick={() => submitNewPerson()}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewPerson;
