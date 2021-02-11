import React, { useEffect, useState } from "react";

const Footer = (props) => {
  const [date, setDate] = useState(new Date());
  function update_time() {
    setInterval(() => setDate(new Date()), 1000);
    return date;
  }

  return (
    <footer id="Footer_article" className="fr">
      <section id="Footer_container" className="fr">
        <h4 id="Footer_copyright">©2021 Rudy Hamame</h4>
        <h4 id="Footer_clock">{String(update_time())}</h4>
      </section>
    </footer>
  );
};

export default Footer;
