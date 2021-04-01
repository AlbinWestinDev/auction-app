import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import { auth } from "./firebase";

import { useStateValue } from "./components/StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [{ loggedinuser }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((userauth) => {
      if (userauth) {
        dispatch({
          type: "SET_LOGIN",
          user: userauth,
        });
      } else {
        dispatch({
          type: "SET_LOGIN",
          user: null,
        });
      }
    });

    return () => {
      unsubsribe();
    };
  }, []);

  console.log("user>>", loggedinuser);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auction">
            <Header />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
