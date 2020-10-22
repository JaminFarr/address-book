import React from "react";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { func, object } from "prop-types";
import { DetailItem } from "./components/DetailItem";
import Map from "./Map";

const CloseButton = ({ className, ...props }) => (
  <button
    type="button"
    className={`close ${className}`}
    aria-label="Close"
    {...props}
  >
    <span aria-hidden="true">&times;</span>
  </button>
);

const Display = ({ address, clearSelection, remove, edit }) => {
  const {
    name,
    email,
    tel,
    address1,
    address2,
    town,
    county,
    postcode,
    longitude,
    latitude
  } = address;

  const addressText = [address1, address2, town, county, postcode]
    .filter(Boolean)
    .join("\n");

  const location = longitude && latitude && { longitude, latitude };

  return (
    <div>
      <Row>
        <Col>
          <h1>{name}</h1>
        </Col>
        <Col xs={1} className="text-right">
          <CloseButton onClick={clearSelection} className="ml-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <DetailItem title="Email" value={email} />
          <DetailItem title="Tel" value={tel} />
        </Col>
        <Col>
          <DetailItem title="Address" value={addressText} />
        </Col>
      </Row>

      {location && (
        <div className="mb-3">
          <Map location={location} />
        </div>
      )}

      <div className="text-right">
        <Button
          variant="primary"
          className="mr-2"
          onClick={() => edit && edit(address)}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={() => remove && remove(address)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

Display.propsTypes = {
  address: object.isRequired,
  remove: func,
  edit: func,
  clearSelection: func
};

export default Display;
