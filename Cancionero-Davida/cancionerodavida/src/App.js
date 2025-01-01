import Router1 from "./routers/Router1";
import Provider from "./context/Provider";
import { CookiesProvider } from "react-cookie";

function App() {

  
  return (
    <Provider>
      <CookiesProvider>
        <Router1/>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
