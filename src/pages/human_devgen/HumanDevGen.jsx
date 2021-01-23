import React, { useEffect, useState } from "react";
import "../../home/app-engine/css/content.css";

const HumanDevGen = () => {
  const fetchData = () => {
    const url = "https://backendstep1.herokuapp.com/api/HumanDevGen";
    let req = new Request(url, { method: "GET", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })

      .then((jsonData) => {
        let ol = document.getElementById("notes");
        ol.innerHTML = "";
        let df = new DocumentFragment();
        for (var i = 0; i < jsonData.length; i++) {
          let li = document.createElement("li");
          let p = document.createElement("p");
          let divIcons = document.createElement("div");
          divIcons.setAttribute("id", "div_icons");
          let deleteIcon = document.createElement("i");
          let editIcon = document.createElement("i");
          editIcon.setAttribute("class", "fas fa-edit");
          editIcon.setAttribute("id", "BiochemMolbioNote" + i);
          deleteIcon.setAttribute("class", "fas fa-eraser");
          deleteIcon.setAttribute("id", "BiochemMolbioNote" + i);
          editIcon.addEventListener("click", () =>
            editList(editIcon.getAttribute("id", "BiochemMolbioNote" + i))
          );
          deleteIcon.addEventListener("click", () =>
            deleteNote(deleteIcon.getAttribute("id", "BiochemMolbioNote" + i))
          );
          li.setAttribute("id", String(jsonData[i]._id));
          p.textContent = jsonData[i].notes;
          divIcons.appendChild(deleteIcon);
          divIcons.appendChild(editIcon);
          li.appendChild(divIcons);
          li.appendChild(p);
          let line = document.createElement("hr");
          df.appendChild(li);
          df.appendChild(line);
        }
        ol.appendChild(df);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  function deleteNote(id) {
    let targeNoteID = document.getElementById(id).parentElement.parentElement
      .id;
    const url =
      "https://backendstep1.herokuapp.com/api/HumanDevGen/" + targeNoteID;
    let req = new Request(url, { method: "DELETE", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      });
  }

  function addList(event) {
    event.preventDefault();
    let newCase = document.getElementById("input_area");
    let url = "https://backendstep1.herokuapp.com/api/HumanDevGen";
    let options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ notes: newCase.value }), // body data type must match "Content-Type" header
    };
    newCase.value = "";
    let req = new Request(url, options);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  }

  function editList(id) {
    let targeNoteID = document.getElementById(id).parentElement.parentElement
      .id;
    let newCase = document.getElementById("input_area");
    let url =
      "https://backendstep1.herokuapp.com/api/HumanDevGen/" + targeNoteID;
    let options = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ notes: newCase.value }), // body data type must match "Content-Type" header
    };
    newCase.value = "";

    let req = new Request(url, options);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  }

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetchData();
  }, [counter]);

  return (
    <div id="contentView_div">
      <h2>Notes</h2>
      <ol id="notes"></ol>
      <div id="newInput_div">
        <form action="">
          <textarea id="input_area" type="text" />
          <input type="submit" onClick={addList} />
        </form>
      </div>
    </div>
  );
};

export default HumanDevGen;
