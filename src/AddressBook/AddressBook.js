import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AddressContext } from "../stores/address";
import Display from "./Display";
import Edit from "./Edit";
import List from "./List";
import SearchBox from "./SearchBox";
import { getEmptyAddress } from "./utils/getEmptyAddress";

const AddressBook = () => {
  const { addresses, actions } = useContext(AddressContext);

  // Component states
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [editingAddress, setEditingAddress] = useState(null);

  // sort the addresses by name
  const sortedAddresses = addresses.slice().sort((a, b) => {
    return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
  });

  // filter out those that do not match the search term
  const filteredAddresses = sortedAddresses.filter(address =>
    address.name.toLowerCase().includes(search.toLowerCase())
  );

  // Create actions for props
  const removeAddress = address => {
    actions.remove(address.email);

    if (selected === address) {
      setSelected(null);
    }
  };

  const storeAddress = updateAddress => {
    const existingEmail = editingAddress && editingAddress.email;

    if (existingEmail) {
      actions.update(existingEmail, updateAddress);
    } else {
      actions.add(updateAddress);
    }

    setEditingAddress(null);
    setSelected(updateAddress);
  };

  return (
    <div>
      <Row className="m-4">
        <Col md={4} xs={8}>
          <SearchBox
            className={selected ? "d-none d-md-block" : ""}
            value={search}
            onChange={setSearch}
          />
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={() => setEditingAddress(getEmptyAddress())}
          >
            Add Address
          </Button>
        </Col>
      </Row>
      <Row className="m-4">
        {/* Hide the address list on mobile when an address is selected */}
        <Col md={4} className={selected ? "d-none d-md-block" : ""}>
          <List
            addresses={filteredAddresses}
            isSelected={address => address === selected}
            onClick={setSelected}
          />
        </Col>
        <Col>
          {/* Display the selected address */}
          {selected ? (
            <Display
              address={selected}
              clearSelection={() => setSelected(null)}
              edit={setEditingAddress}
              remove={removeAddress}
            />
          ) : (
            <div className="d-none d-md-block">
              <p>Please select an address</p>
            </div>
          )}
        </Col>
      </Row>

      {/*
        Only show the edit model if the editingAddress is set.
        The same modal is used for adding new addresses and editing
        existing ones. The only difference is if editingAddress.email is set
      */}
      {editingAddress && (
        <Edit
          address={editingAddress}
          onClose={() => setEditingAddress(null)}
          storeAddress={storeAddress}
        />
      )}
    </div>
  );
};

export default AddressBook;
