import React, { createContext, useEffect, useMemo, useReducer } from "react";
import Axios from "axios";
import { useLocalStorage } from "./useLocalStorage";

/**
 * My plan is to mix a react context and useReducer into a redux style store
 *
 * This module exports two items
 *   AddressProvider a component that provides should wrap the app
 *   AddressContext a context object to give access to the store
 */

export const ACTIONS = {
  initStore: "initStore",
  addAddress: "addAddress",
  updateAddress: "updateAddress",
  removeAddress: "removeAddress",
};

/**
 * store reducer
 */

const addressReducer = (state, action) => {
  switch (action.type) {
    // Set-up the store on load
    case ACTIONS.initStore:
      return action.payload;

    // Appends the new address to the end of the store array
    case ACTIONS.addAddress:
      return [...state, action.payload];

    // Copies the store array replacing the address with a matching email
    // with the payload address
    // The email is provided separately in case the email has been updated
    case ACTIONS.updateAddress:
      return state.map((address) =>
        address.email === action.payload.email
          ? action.payload.address
          : address
      );

    // Copies the store array except for the address with the matching email
    case ACTIONS.removeAddress:
      return state.filter((address) => address.email !== action.payload);

    default:
      return state;
  }
};

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, dispatch] = useReducer(addressReducer, []);

  // Action creators
  //
  // These can be used anywhere the context is imported.
  // useMemo prevents recreating the object and functions on every render.
  const actions = useMemo(
    () => ({
      add(address) {
        dispatch({
          type: ACTIONS.addAddress,
          payload: address,
        });
      },
      update(email, address) {
        dispatch({
          type: ACTIONS.updateAddress,
          payload: { email, address },
        });
      },
      remove(email) {
        dispatch({
          type: ACTIONS.removeAddress,
          payload: email,
        });
      },
    }),
    [dispatch]
  );

  // Get the addresses from the browsers localstorage
  const [localStorageAddresses, setLocalStorageAddresses] = useLocalStorage(
    "benf-address-book",
    "NO_LOCALSTORE"
  );

  // Init store addresses
  useEffect(() => {
    // Populate from localStorageAddresses if it exists
    if (localStorageAddresses !== "NO_LOCALSTORE") {
      const duplicateEmails = new Set();

      dispatch({
        type: ACTIONS.initStore,
        payload: localStorageAddresses.filter(({ email }) => {
          const isDuplicate = duplicateEmails.has(email);
          duplicateEmails.add(email);
          return !isDuplicate;
        }),
      });
      return;
    }

    // otherwise load and populate from `entries.json`
    Axios.get("/data/entries.json").then(({ data }) =>
      dispatch({
        type: ACTIONS.initStore,
        payload: data,
      })
    );
  }, []);

  // Set the local storage every time the addresses array changes
  useEffect(() => {
    setLocalStorageAddresses(addresses);
  }, [addresses]);

  // The actual store value
  const storeValue = {
    addresses,
    actions,
  };

  return (
    <AddressContext.Provider value={storeValue}>
      {children}
    </AddressContext.Provider>
  );
};
