import "./App.css";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Mainscreen from "./screens/Mainscreen";
import Header from "./components/Header";
import { user_reducer, initalState } from "./reducers/userReducer";
import Mycontacts from "./screens/Mycontacts";
import Favorites from "./screens/Favorites";
import Profile from "./screens/Profile";
import Update from "./screens/Update";
import Updatedetails from "./screens/Updatedetails";
export const Usercontext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(Usercontext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_details"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, []);

  return (
    <Switch>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/mycontacts">
        <Mycontacts />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/update/:id">
        <Update />
      </Route>
      <Route path="/editdetails">
        <Updatedetails />
      </Route>
      <Route path="/" exact>
        <Mainscreen />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(user_reducer, initalState);
  return (
    <Usercontext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
    </Usercontext.Provider>
  );
}

export default App;
