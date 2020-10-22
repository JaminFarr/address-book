const fs = require("fs");
const axios = require("axios");
const pTimes = require("p-times");

const ENTRY_COUNT = 50;

/**
 * Gets a fake name
 *
 * returns string
 */
const getName = async () => {
  const { data } = await axios(
    "http://faker.hook.io/?property=name.findName&locale=en_GB"
  );
  return data;
};

/**
 * Gets a fake street name
 *
 * returns string
 */
const getStreetName = async () => {
  const { data } = await axios(
    "http://faker.hook.io/?property=address.streetName&locale=en_GB"
  );
  return data;
};

/**
 * Gets a random UK postcode
 *
 * returns object {
 *   postcode: string,
 *   admin_county: string | null,
 *   admin_district: string | null,
 *   primary_care_trust: string | null,
 *   region: string | null,
 * }
 */

const getPostcode = async () => {
  const { data } = await axios("http://api.postcodes.io/random/postcodes");
  return data.result;
};

const getTel = () =>
  "078-------".replace(/-/g, () => Math.floor(Math.random() * 10));

/**
 * Get all random and fake data and combine them in to an address entry
 */
const getEntry = async () => {
  const nameRequest = getName();
  const streetNameRequest = getStreetName();
  const postcodeRequest = getPostcode();

  const [name, streetName, postcodeDetails] = await Promise.all([
    nameRequest,
    streetNameRequest,
    postcodeRequest
  ]);

  const {
    postcode,
    longitude,
    latitude,
    admin_district,
    admin_county,
    region,
    primary_care_trust,
    parliamentary_constituency
  } = postcodeDetails;

  const email = name.replace(/ /g, ".").toLowerCase() + "@address.com";

  return {
    name,
    email,
    tel: getTel(),
    address1: `${Math.ceil(Math.random() * 100)} ${streetName}`,
    address2: null,
    town: admin_district || primary_care_trust,
    county: admin_county || region || parliamentary_constituency,
    postcode,
    longitude,
    latitude
  };
};

const store = async entries =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      __dirname + "/../public/data/entries.json",
      JSON.stringify(entries, null, 2),
      err => {
        if (err) return reject(err);
        resolve();
      }
    );
  });

const main = async () => {
  const entries = await pTimes(ENTRY_COUNT, getEntry, {
    concurrency: 10
  });

  store(entries);
};

main();
