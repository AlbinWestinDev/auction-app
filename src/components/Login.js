import React, { useState } from 'react';
import '../style/css/style.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
  const history = useHistory();
  const [useremail, setUserEmail] = useState('');
  const [userpassword, setUserPassword] = useState('');

  const loginuser = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(useremail, userpassword)
      .then((auth) => {
        history.goBack();
      })
      .catch((e) => alert(e.message));
  };
  const signupuser = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(useremail, userpassword)
      .then((auth) => {
        history.goBack();
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="container backgroundGradient login">
      <div className='card'>
      <br />
      <br />
      <div className="login__container">
        <h1>Logga in</h1>
        <form>
          <h5>E-post</h5>
          <input
            value={useremail}
            onChange={(event) => setUserEmail(event.target.value)}
            type="email"
          />

          <h5>Lösenord</h5>
          <input
            value={userpassword}
            onChange={(event) => setUserPassword(event.target.value)}
            type="password"
          />
          <button
            onClick={loginuser}
            type="submit"
            class="btn-login"
          >
            Logga in
          </button>
        </form>
        <br />
        <button onClick={signupuser} class="btn-login">
          Skapa konto
        </button>
        <p>
          Genom att skapa ett konto godkänner du användarvillkor och
          integritetspolicy
        </p>
      </div>
      </div>
    </div>
  );
}
export default Login;
