import React, { useContext } from 'react';
import Context from '../context/Context';


function Login() {
  const {login, logout, profile} = useContext(Context)

  return (
      <div>
          <h2>React Google Login</h2>
          <br />
          <br />
          {profile ? (
              <div>
                  <img src={profile.picture} alt="user" />
                  <h3>User Logged in</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <br />
                  <br />
                  <button onClick={logout}>Log out</button>
              </div>
          ) : (
              <button onClick={() => login()}>Sign in with Google 🚀 </button>
          )}
      </div>
  );
}


export default Login;
