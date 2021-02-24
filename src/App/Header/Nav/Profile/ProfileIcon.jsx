import React from "react";
import { Link } from "react-router-dom";

const ProfileIcon = (props) => {
  return (
    <div>
      {props.profile !== "true" && (
        <i
          class="fas fa-user-alt"
          onClick={() => {
            props.show_profile(true);
          }}
          title="Profile"
        ></i>
      )}
      {props.profile === "true" && (
        <div
          className="fr"
          style={{ gap: "10px", color: "white", cursor: "pointer" }}
        >
          <i
            class="fas fa-chevron-circle-left"
            onClick={() => {
              window.location.reload();
            }}
          ></i>
          <h4
            onClick={() => {
              window.location.reload();
            }}
          >
            Go back
          </h4>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
