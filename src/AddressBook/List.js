import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ScrollInToView from "./components/ScrollInToView";

/**
 * List - presenter component
 *
 */
const List = ({ addresses, isSelected, onClick }) => (
  <ListGroup
    style={{
      maxHeight: "600px",
      overflowY: "auto",
      borderTop: "1px solid rgba(0, 0, 0, 0.125)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.125)"
    }}
  >
    {addresses.map(address => {
      const isItemSelected = isSelected(address);
      return (
        <ListGroup.Item
          key={address.email}
          active={isItemSelected}
          action={Boolean(onClick)}
          onClick={() => onClick(address)}
        >
          <ScrollInToView active={isItemSelected}>
            {address.name}
          </ScrollInToView>
        </ListGroup.Item>
      );
    })}
  </ListGroup>
);

export default List;
