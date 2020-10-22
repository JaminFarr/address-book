import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import { useFormState } from "../hooks/form-state";
import PostcodeLookup from "./PostcodeLookup";
import { AddressEdit } from "./AddressEdit";
import { getEmptyAddress } from "../utils/getEmptyAddress";
import { AddressContext } from "../../stores/address";

const useIsDuplicateEmail = (email, originalEmail) => {
  const { addresses } = useContext(AddressContext);
  return (
    email !== originalEmail &&
    Boolean(addresses.find((address) => address.email === email))
  );
};

const Edit = ({ address = getEmptyAddress(), storeAddress, onClose }) => {
  const {
    formState: editAddress,
    setFormState: setEditAddress,
    setField,
    bindField,
  } = useFormState(address);

  const [show, setShow] = useState(true);
  const isDuplicateEmail = useIsDuplicateEmail(
    editAddress.email,
    address.email
  );

  const hasPostcode = Boolean(editAddress.postcode);

  // Poor man's validation
  const canSave =
    hasPostcode && editAddress.name && editAddress.email && !isDuplicateEmail;

  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      onExited={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {address.email ? "Edit Address" : "Add Address"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/*
          Set min height so the size is stable between postcode lookup
          and editing the address
        */}
          <Row style={{ minHeight: "26rem" }}>
            <Col>
              <Form.Group controlId="addressName">
                <Form.Label className="h3">Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  {...bindField("name")}
                />
              </Form.Group>

              <Form.Group controlId="addressEmail">
                <Form.Label className="h3">Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  {...bindField("email")}
                />
                {isDuplicateEmail ? (
                  <Badge variant="danger">Duplicate email</Badge>
                ) : null}
              </Form.Group>

              <Form.Group controlId="addressTel">
                <Form.Label className="h3">Tel:</Form.Label>
                <Form.Control
                  type="text"
                  name="telephone"
                  placeholder="Enter telephone number"
                  {...bindField("tel")}
                />
              </Form.Group>
            </Col>
            <Col>
              {hasPostcode ? (
                <AddressEdit
                  bindField={bindField}
                  clearPostcode={() => setField("postcode", null)}
                />
              ) : (
                <PostcodeLookup
                  setPostcode={(postcodeDetails) =>
                    setEditAddress({ ...editAddress, ...postcodeDetails })
                  }
                />
              )}
            </Col>
          </Row>
          <div className="text-right" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={!canSave} onClick={() => storeAddress(editAddress)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit;
