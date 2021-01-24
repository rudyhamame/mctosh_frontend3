import React from "react";

const HorizontalNav = () => {
  const open_todo = () => {};
  return (
    <div id="horizontal_nav_div">
      <h2 onClick={open_todo}>To do</h2>
      <h2>Notes</h2>
      <h2>Terminology</h2>
    </div>
  );
};

export default HorizontalNav;
