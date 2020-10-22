import React from "react";
import Container from "react-bootstrap/Container";
import AddressBook from "./AddressBook";
import { AddressProvider } from "./stores/address";

/**
 * The base App is wraps everything in the AddressProvider and a
 * simple bootstrap container
 */

const App = () => (
  <AddressProvider>
    <Container>
      <AddressBook />
    </Container>
  </AddressProvider>
);

export default App;
