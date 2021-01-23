const BioOfCells = () => {
  const fetchData = () => {
    const url = "https://backendstep1.herokuapp.com/api/BioOfCells";
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
        let ul = document.getElementById("notes");
        let df = new DocumentFragment();
        jsonData.forEach((user) => {
          let li = document.createElement("li");
          let p = document.createElement("p");
          p.textContent = user.notes;
          li.appendChild(p);
          df.appendChild(li);
        });
        ul.appendChild(df);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  return (
    <div id="gp_menu_div">
      <button onClick={fetchData}>dfsdf</button>
      <ul id="notes"></ul>
    </div>
  );
};

export default BioOfCells;
