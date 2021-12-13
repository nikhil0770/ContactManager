import React from "react";

function Search({ searchterm, searchname }) {
  return (
    <div style={{ marginBottom: "30px" }} className="input-field">
      <input
        type="text"
        onChange={(e) => searchterm(e.target.value)}
        placeholder="Search Here"
      />
      <div>
        {searchname && <h6>Results</h6>}
        {searchname
          ? searchname.map((item) => {
              return (
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
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Search;
