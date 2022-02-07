import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import md5 from "md5";
import _ from "lodash";

import "./styles.css";
import AddressInfo from "./AddressInfo";
import NewPerson from "./NewPerson";

import { BsTrash, BsPencil } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { editPersonState, refreshState } from "../atoms/person";
import { Link } from "react-router-dom";

function AddressList() {
  const [person, setPerson] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [query, setQuery] = useState("");
  const [newPerson, setNewPerson] = useState(false);
  const [editPerson, setEditPerson] = useRecoilState(editPersonState);
  const [refresh, setRefresh] = useRecoilState(refreshState);

  useEffect(() => {
    const getAddresses = async () => {
      const res = await axios
        .get(
          `https://front-end.oudemo.com/api/address/list?apikey=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => res.data.result);

      const sortedRes = _.orderBy(res, ["firstName"], ["asc"]);
      setPerson(sortedRes);
      setFilteredList(sortedRes);
    };

    getAddresses();
  }, [refresh, editPerson]);

  const filterList = () => {
    if (query === "") {
      setFilteredList(person);
    } else {
      const filtered = person.filter((item) => {
        const firstName = item.firstName.toLowerCase();
        const lastName = item.lastName.toLowerCase();
        const email = item.email.toLowerCase();

        if (
          firstName.includes(query.toLowerCase()) ||
          lastName.includes(query.toLowerCase()) ||
          email.includes(query.toLowerCase())
        ) {
          return true;
        }
      });

      setFilteredList(filtered);
    }
  };

  useEffect(() => {
    filterList();
  }, [query]);

  const getGravatarURL = (email) => {
    const address = String(email).trim().toLowerCase();
    const hash = md5(address);
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  const showAddress = () => {
    return filteredList.map((person) => (
      <Card key={person.id} className="card-style" border="dark">
        <Card.Img
          style={{ height: "40px", width: "40px" }}
          className="mt-2 rounded-circle"
          variant="top"
          src={getGravatarURL()}
        />
        <Card.Body>
          <Card.Title className="card-title">{`${person.firstName} ${person.lastName}`}</Card.Title>
          <AddressInfo person={person} />
          <div className="icons-container">
            <BsTrash
              className="icons"
              onClick={() => deleteAddress(person.id)}
            />
            <Link to="/edit" className="link">
              <BsPencil
                className="icons"
                onClick={() => setEditPerson(person)}
              />
            </Link>
          </div>
        </Card.Body>
      </Card>
    ));
  };

  const newPersonForm = () => {
    setNewPerson(!newPerson);
  };

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const deleteAddress = async (id) => {
    await axios.post("https://front-end.oudemo.com/api/address/delete", {
      apikey: process.env.REACT_APP_API_KEY,
      id,
    });

    setRefresh(!refresh);
  };

  return (
    <div className="container">
      {!newPerson ? (
        <div>
          <div className="button-container">
            <div>
              <Button
                className="button-style"
                onClick={() =>
                  setFilteredList(
                    _.orderBy(filteredList, ["firstName"], ["asc"])
                  )
                }
              >
                Sort By First Name
              </Button>
              <Button
                className="button-style"
                onClick={() =>
                  setFilteredList(
                    _.orderBy(filteredList, ["lastName"], ["asc"])
                  )
                }
              >
                Sort By Last Name
              </Button>
              <Button
                className="button-style"
                onClick={() =>
                  setFilteredList(_.orderBy(filteredList, ["email"], ["asc"]))
                }
              >
                Sort By Email
              </Button>
            </div>
            <input
              className="input"
              placeholder="Filter"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
            />
            <Button className="button-style" onClick={newPersonForm}>
              New Person
            </Button>
          </div>
          <div className="card-container">{showAddress()}</div>
        </div>
      ) : (
        <NewPerson
          newPersonForm={newPersonForm}
          refreshPage={refreshPage}
          updatePerson={false}
        />
      )}
    </div>
  );
}

export default AddressList;
