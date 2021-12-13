import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function Mainscreen() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [todolist, setTodolist] = useState("");
  const newcontact = () => {
    fetch("/addcontact", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phno,
        todolist,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        if (result) {
          setName("");
          setPhno("");
          M.toast({ html: result.message, classes: "green" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="card addcontact">
        <div className="card-content input-field">
          <p
            className="card-title"
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "medium",
            }}
          >
            Create New Contact
          </p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
          />
          <button
            style={{ fontSize: "smaller" }}
            onClick={() => newcontact()}
            className="btn button_class"
          >
            Add Contact
          </button>
        </div>
      </div>

      <div className="buttonsroute">
        <Link to="/mycontacts">
          <button
            style={{ margin: "15px 5px", fontSize: "smaller" }}
            className="btn button_class"
          >
            All Contacts
          </button>
        </Link>
        <Link to="/favorites">
          <button
            style={{ margin: "15px 5px", fontSize: "smaller" }}
            className="btn button_class"
          >
            Favorites
          </button>
        </Link>
        <Link to="/profile">
          <button
            style={{ margin: "15px 5px", fontSize: "smaller" }}
            className="btn button_class"
          >
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Mainscreen;
