import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

function Favorites() {
  const [contacts, setContacts] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    fetch("/getcontacts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((mycontacts) => {
        //console.log(mycontacts);
        setContacts(mycontacts);
      });
  }, [msg, contacts]);

  const deletecontact = (id) => {
    fetch(`/deletecontact/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        if (result) {
          setMsg(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatefav = (id, chk) => {
    fetch(`/favorites/${id}/${chk}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        if (result) {
          const newdata = contacts.filter((item) => {
            if (item._id !== result._id) return item;
            else {
              return result;
            }
          });
          setContacts(newdata);
          M.toast({ html: result.message, classes: "green" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content">
      {contacts ? (
        <div className="contact_component">
          <h5 style={{ marginBottom: "20px", paddingLeft: "5px" }}>
            Favorites
          </h5>
          {contacts.map((item) => {
            return (
              item.favorites == true && (
                <div className="card contactcard" key={item._id}>
                  <p>
                    <strong>Name :</strong> {item.name}
                  </p>
                  <p>
                    <strong>Contact No :</strong> {item.phno}
                  </p>
                  {item.todolist !== "" ? (
                    <p>
                      <strong>Todolist : </strong>
                      {item.todolist}
                    </p>
                  ) : (
                    ""
                  )}
                  <div>
                    {item.favorites == true ? (
                      <i
                        style={{ color: "red" }}
                        onClick={() => updatefav(item._id, false)}
                        className="material-icons favicon"
                      >
                        favorite_border
                      </i>
                    ) : (
                      <i
                        onClick={() => updatefav(item._id, true)}
                        className="material-icons favicon"
                      >
                        favorite_border
                      </i>
                    )}
                  </div>
                  <div className="modify">
                    <Link className="btn_edit" to={"/update/" + item._id}>
                      <button
                        className="btn"
                        style={{ backgroundColor: "blue", color: "white" }}
                      >
                        Edit
                      </button>
                    </Link>
                    <Link className="btn_edit">
                      <button
                        onClick={() => deletecontact(item._id)}
                        className="btn"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Delete
                      </button>
                    </Link>
                  </div>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <h3>Loading....</h3>
      )}
    </div>
  );
}
export default Favorites;
