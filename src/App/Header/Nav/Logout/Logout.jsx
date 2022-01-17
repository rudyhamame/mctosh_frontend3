import React from "react";

const Logout = (props) => {
  if (props.path === "/") {
    return (
      <section id="Logout_article">
        <i
          onClick={() => {
            let url =
              "https://backendstep1.herokuapp.com/api/user/isOnline/" +
              JSON.parse(sessionStorage.getItem("state")).my_id;
            let options = {
              method: "PUT",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isConnected: false,
              }),
            };

            let req = new Request(url, options);
            fetch(req)
              .then((response) => {
                if (response.status === 201) {
                  sessionStorage.removeItem("state");
                  window.location.reload();
                  return response.json();
                } else {
                  throw new Error("bad Http");
                }
              })
              .catch((err) => {
                console.log("error:", err.message);
              });
          }}
          class="fas fa-sign-out-alt"
          id="i_nav_logout"
          style={{ color: "#01796f", padding: "10px" }}
          title="Log out"
        ></i>
      </section>
    );
  } else {
    return (
      <section id="Logout_article">
        <i
          title="Log out"
          onClick={props.logOut}
          class="fas fa-sign-out-alt"
          id="i_nav_logout"
        ></i>
      </section>
    );
  }
};

export default Logout;
