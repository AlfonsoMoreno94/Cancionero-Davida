import React, { useContext} from 'react';
import Context from '../context/Context';


function Login() {
  const {login, perfil} = useContext(Context)

  console.log(perfil)

  return (
      <div>
          {perfil ? (
              <div>
              </div>
          ) : (
              <button className="button1" onClick={login}>Sign in with Google 🚀 </button>
          )}
      </div>
  );
}


export default Login;
