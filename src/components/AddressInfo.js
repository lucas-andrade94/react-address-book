import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./styles.css";

function AddressInfo({ person }) {
  const [hidden, setHidden] = useState(true);

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

  return (
    <div>
      <Button className="button-style" onClick={() => setHidden(!hidden)}>{`${
        person.email
      } / ${formatPhoneNumber(person.phone)}`}</Button>
      <div className={`${hidden ? "hidden-content" : ""} item-content`}>
        <div>
          <span className="item">Address: </span>
          <span>{person.address}</span>
        </div>
        <div>
          <span className="item">City: </span>
          <span>{person.city}</span>
        </div>
        <div>
          <span className="item">State: </span>
          <span>{person.state}</span>
        </div>
        <div>
          <span className="item">ZIP Code: </span>
          <span>{person.zipcode}</span>
        </div>
        <div>
          <span className="item">Email: </span>
          <span>{person.email}</span>
        </div>
        <div>
          <span className="item">Phone: </span>
          <span>{formatPhoneNumber(person.phone)}</span>
        </div>
      </div>
    </div>
  );
}

export default AddressInfo;
