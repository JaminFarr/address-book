# Address Book

by Ben Farr

https://jaminfarr.github.io/address-book/

## Parts

### tools/generate-entries.js

A small node program to create 50 address entries pull data from postcodes.io and faker.hook.io for the names and street names

### stores/address.js

A redux style store written with React context and useReducer hook.
The context wraps the whole app and allows access to the addresses array and action creators (add, remove, update)

On mount the store checks the browser's localstorage for data. If none is found `/data/entries.json` is requested and put into the store.

On update the store saves the list to localstorage so changes remain after a refresh.

### AddressBook/AddressBook.js

The address book component. I've kept all the main logic within this component with other parts working as presentational.

### Map

As the postcodes.io returns lat and long details I decided to add a map too.
