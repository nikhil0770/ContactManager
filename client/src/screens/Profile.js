import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetch("/profile", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result.result);
        if (result) {
          setProfile(result.result);
        }
      });
  }, []);
  return (
    <div>
      <h5 style={{ margin: "40px", textAlign: "center" }}>Profile</h5>
      <div className="card profile_card">
        {profile && (
          <div className="card-content">
            <h6>
              <strong>Name : </strong>
              {profile.name}
            </h6>
            <h6>
              <strong>Phone Number : </strong>
              {profile.phno}
            </h6>
            <h6>
              <strong>Email : </strong>
              {profile.email}
            </h6>

            <div style={{ marginTop: "10px", fontSize: "16px" }}>
              <Link to="/mycontacts">
                <strong>Contacts</strong> {profile.mycontacts.length}
              </Link>
              <Link className="btn_edit" to="/editdetails/">
                <button
                  className="btn"
                  style={{
                    marginLeft: "0px",
                    marginTop: "10px",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  Edit Details
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
