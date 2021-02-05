import React, { useEffect, useState } from "react";

const Footer = (props) => {
  // const [date, setDate] = useState(new Date());
  // function update_time() {
  //   setInterval(() => setDate(new Date()), 1000);
  //   return date;
  // }

  return (
    <footer id="footer_app" className="fr">
      <div id="footer_app_container" className="fr">
        <h4>©2021 Rudy Hamame</h4>
        {/* <h4 id="date">{String(update_time())}</h4> */}
        <div
          style={{
            width: "250px",
            padding: "10px",
            textAlign: "center",
            color: "white",
            fontSize: "12pt",
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "500",
          }}
          className="fc"
        >
          <div
            id="chat"
            style={{
              position: "absolute",
              width: "250px",
              textAlign: "center",
              color: "white",
              fontSize: "12pt",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "500",
              height: "0px",
              bottom: "0",
              overflow: "hidden",
            }}
            onClick={function () {
              document.getElementById("chat").style.height = "0";
            }}
          >
            <ul className="fc" id="users"></ul>
          </div>
          <div
            onClick={function () {
              document.getElementById("chat").style.height = "400px";
              props.fetchData(
                {
                  url: "http://localhost:4000/user/",
                  method: "GET",
                },
                "GET"
              );
              // let users = document.getElementById("users");
              // users.innerHTML = "";
              // data.friends_list.forEach((friend) => {
              //   let p = document.createElement("p");
              //   let li = document.createElement("li");
              //   p.textContent = friend.first_name;
              //   li.appendChild(p);
              //   users.appendChild(li);
              // });
            }}
            style={{ backgroundColor: "green" }}
          >
            Online Friends
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
