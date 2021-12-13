import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../App";

function Header() {
  const history = useHistory();
  const { state, dispatch } = useContext(Usercontext);
  const renderList = () => {
    //state has user details because when we are logged in
    // we dispatch userContext with user details
    if (state) {
      return [
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("jwt");
              localStorage.removeItem("user_details");
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
            className="btn button_header"
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/signin">Signin</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper header">
        <div className="logo">
          <Link to={state ? "/" : "/signin"} className="brand-logo left logo">
            <p>Contact Manager</p>
          </Link>
        </div>
        <div className="sections">
          <ul id="nav-mobile" className="right navurl">
            {renderList()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
