import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const history = useHistory();
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const loginuser = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(useremail, userpassword)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };
  const signupuser = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(useremail, userpassword)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="login">
      <Link>
        <img
          className="login__logo"
          src="https://image.shutterstock.com/image-vector/creative-auction-logo-you-can-260nw-1095315374.jpg"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            value={useremail}
            onChange={(event) => setUserEmail(event.target.value)}
            type="email"
          />

          <h5>Password</h5>
          <input
            value={userpassword}
            onChange={(event) => setUserPassword(event.target.value)}
            type="password"
          />
          <button
            onClick={loginuser}
            type="submit"
            class="btn btn-outline-primary"
          >
            Sign in
          </button>
        </form>
        <p>By signing in you agree to the Terms</p>
        <button onClick={signupuser} class="btn btn-outline-primary">
          Create you account
        </button>
      </div>
    </div>
  );
}
export default Login;
