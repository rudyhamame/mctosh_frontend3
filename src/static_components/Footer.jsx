import React, { useEffect, useState } from "react";
import "../css/footer.css";

const Footer = (props) => {
  return (
    <footer id="footer_app">
      <div id="footer_app_container">
        <h4>©2021 Rudy Hamame</h4>
        <h4 id="date">{String(props.date_now)}</h4>
      </div>
    </footer>
  );
};

export default Footer;
