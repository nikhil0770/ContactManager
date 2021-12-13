import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const Signupdata = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phno,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            M.toast({ html: result.error, classes: "red darken-3" });
          } else {
            M.toast({ html: result.message, classes: "green" });
            history.push("/signin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Invalid Email");
    }
  };

  return (
    <div className="signin">
      <div className="card signin_card">
        <div className="card-content input-field">
          <p
            className="card-title"
            style={{ textAlign: "center", fontFamily: "sans-serif" }}
          >
            Contact Manager
          </p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone No"
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => Signupdata()} className="btn button_class">
            Signup
          </button>
          <Link
            to="/signin"
            style={{
              color: "black",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            <p>Already have an Account ? </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
