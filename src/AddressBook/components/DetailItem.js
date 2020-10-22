import React, { Fragment } from "react";

/**
 * Styled title and value for detail lists
 *
 * string values with new lines are split with <br/>s
 *
 */
export const DetailItem = ({ title, value }) => (
  <div className="mt-2 mb-4">
    <p className="h3">{title}:</p>
    <p>
      {typeof value === "string" ? (
        value.split(/\r\n|\n|\r/g).map((line, i) => (
          <Fragment key={i}>
            {line}
            <br />
          </Fragment>
        ))
      ) : (
        <Fragment>
          {value}
          <br />
        </Fragment>
      )}
    </p>
  </div>
);
