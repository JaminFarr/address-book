import React, { createRef, useEffect } from "react";

/**
 * ScrollInToView
 *
 * When active is set true scrolls the component in to view
 *
 * Used to scroll newly added addresses in to view in the side list
 */
const ScrollInToView = ({ active, children }) => {
  const scrollElement = createRef();

  useEffect(() => {
    if (
      !active ||
      typeof scrollElement.current.scrollIntoViewIfNeeded !== "function"
    ) {
      return;
    }

    scrollElement.current.scrollIntoViewIfNeeded();
  }, [active]);

  return <div ref={scrollElement}>{children}</div>;
};

export default ScrollInToView;
