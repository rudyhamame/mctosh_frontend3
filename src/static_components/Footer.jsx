import React, { useEffect, useState } from "react";
import "../css/footer.css";

const Footer = () => {
  const [date, setDate] = useState(new Date());
  function update_time() {
    setInterval(() => setDate(new Date()), 1000);
    return date;
  }

  return (
    <footer id="footer_app">
      <div id="footer_app_container">
        <h4>©2021 Rudy Hamame</h4>
        <h4 id="date">{String(update_time())}</h4>
      </div>
    </footer>
  );
};

export default Footer;
