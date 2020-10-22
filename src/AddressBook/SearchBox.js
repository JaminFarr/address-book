import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Octicon, { Search } from "@githubprimer/octicons-react";

/**
 * Search Box - presenter component
 *
 */

const SearchBox = ({ value, onChange }) => (
  <div>
    <InputGroup className="my-3">
      <FormControl
        type="search"
        placeholder="search"
        value={value}
        onChange={onChange && (({ target }) => onChange(target.value))}
      />
      <InputGroup.Append>
        <InputGroup.Text>
          <Octicon icon={Search} />
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  </div>
);

export default SearchBox;
