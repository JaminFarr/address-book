import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { DetailItem } from "../components/DetailItem";
import { useDebounce } from "../hooks/debounce-value";
import { useLookupPostCode } from "../hooks/lookup-postcode";
import Button from "react-bootstrap/Button";

const PostcodeLookup = ({ setPostcode }) => {
  const [postcodeSearch, setPostcodeSearch] = useState("");

  // use debounce to prevent to many requests while a user is still typing
  const postcodeSearchDebounced = useDebounce(postcodeSearch, 400);

  // Performs the lookup to postcode.io
  const { result, isLoading, isNotFound, hasError } = useLookupPostCode(
    postcodeSearchDebounced
  );

  // If there is a lookup response derive address details from it
  const resultAddress = result && {
    town: result.admin_district || result.primary_care_trust,
    county:
      result.admin_county || result.region || result.parliamentary_constituency,
    postcode: result.postcode,
    latitude: result.latitude,
    longitude: result.longitude
  };

  return (
    <div>
      <Form.Group controlId="postcodeLookup">
        <Form.Label className="h3">Postcode Search:</Form.Label>
        <Form.Control
          type="text"
          name="postcode-search"
          placeholder="Lookup Postcode"
          value={postcodeSearch}
          onChange={({ target: { value } }) => setPostcodeSearch(value)}
        />
        <Form.Text>
          {isLoading && <span>Loading</span>}
          {isNotFound && (
            <span className="text-warning">Postcode could not be found</span>
          )}
          {hasError && (
            <span className="text-warning">
              There was an error looking up the postcode
            </span>
          )}
          <span className="text-white">!</span>
        </Form.Text>
      </Form.Group>

      <Row>
        <Col>
          <DetailItem
            title="Town"
            value={resultAddress && resultAddress.town}
          />
        </Col>
        <Col>
          <DetailItem
            title="County"
            value={resultAddress && resultAddress.county}
          />
        </Col>
      </Row>

      <div className="text-right">
        <Button
          disabled={!resultAddress}
          onClick={() => setPostcode(resultAddress)}
        >
          Set Postcode
        </Button>
      </div>
    </div>
  );
};

export default PostcodeLookup;
