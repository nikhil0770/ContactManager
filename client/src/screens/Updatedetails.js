import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function Update() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  //console.log(id);
  useEffect(() => {
    fetch(`/getuser`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setName(result.result.name);
        setPhno(result.result.phno);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updatecontact = () => {
    fetch("/updateuser", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phno,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result) {
          M.toast({ html: result.message, classes: "green" });
          history.push("/profile");
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
            Update Details
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
          <div className="classbutton">
            <button
              onClick={() => updatecontact()}
              className="btn button_class"
            >
              Update
            </button>
            <Link className="btn_edit" to="/mycontacts">
              <button
                className="btn"
                style={{
                  margin: "30px auto 0px auto",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                My Contacts
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
