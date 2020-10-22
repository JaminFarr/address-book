import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const AddressEdit = ({ bindField, clearPostcode }) => (
  <div>
    <Form.Group controlId="addressLine1">
      <Form.Label className="h3">Address:</Form.Label>
      <Form.Control
        type="text"
        name="line1"
        placeholder="Address line 1"
        {...bindField("address1")}
      />
    </Form.Group>

    <Form.Group controlId="addressLine2">
      <Form.Control
        type="text"
        name="line2"
        placeholder="Address line 2"
        {...bindField("address2")}
      />
    </Form.Group>

    <Form.Group controlId="addressTown">
      <Form.Label className="h4">Town:</Form.Label>
      <Form.Control
        type="text"
        name="town"
        placeholder="Address town"
        {...bindField("town")}
      />
    </Form.Group>

    <Form.Group controlId="addressCounty">
      <Form.Label className="h4">County:</Form.Label>
      <Form.Control
        type="text"
        name="county"
        placeholder="Address town"
        {...bindField("county")}
      />
    </Form.Group>

    <Form.Group controlId="addressCounty">
      <Form.Label className="h4">
        Postcode:{" "}
        <Button size="sm" variant="secondary" onClick={clearPostcode}>
          Clear
        </Button>
      </Form.Label>
      <Form.Control
        type="text"
        name="county"
        placeholder="Address town"
        disabled
        {...bindField("postcode")}
      />
    </Form.Group>
  </div>
);
