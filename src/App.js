import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import AuctionList from "./components/Auction/AuctionList";
import AddAuction from "./components/Auction/CRUD/AddAuction";
import EditAuction from "./components/EditAuction";
import SearchAuction from './components/Auction/Search/SearchAuction';
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
        <Header />
        <Switch>
          <Route path="/Auktion/2310/Edit/:id" component={EditAuction} />
          <Route path="/Auktion/2310/:id" component={ShowAuction} />
          <Route path="/auction"></Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/AddAuction">
            <AddAuction />
          </Route>

          <Route path="/Search/:searchTerm">
            <SearchAuction />
          </Route>
               
          <Route path="/">
            <AuctionList />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
export default App;
