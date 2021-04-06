import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import AuctionList from "./components/Auction/AuctionList";

import EditAuction from "./components/EditAuction";
import { auth } from "./firebase";

import { useStateValue } from "./components/StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowAuction from "./components/Auction/ShowAuction/ShowAuction";

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
          <Route path="/Auktion/2310/:id" component={ShowAuction} />
          <Route path="/Auktion/2310/EditAuction/:id" component={EditAuction} />
          <Route path="/auction">
            <Header />
          </Route>

          <Route path="/login">
            <Header />
            <Login />
          </Route>

          <Route path="/">
            <Header />
            <Home />
            <AuctionList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
