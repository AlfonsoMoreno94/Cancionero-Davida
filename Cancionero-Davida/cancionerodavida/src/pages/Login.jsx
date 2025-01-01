import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';


function Login() {
  const {login, logout, perfil} = useContext(Context)

  console.log(perfil)

  return (
      <div>
          {perfil ? (
              <div>
                  <h3>User Logged in</h3>
                  <p>Name: {perfil.name}</p>
                  <p>Email Address: {perfil.email}</p>
                  <br />
                  <br />
                  <button onClick={logout}>Log out</button>
              </div>
          ) : (
              <button onClick={login}>Sign in with Google 🚀 </button>
          )}
      </div>
  );
}


export default Login;
