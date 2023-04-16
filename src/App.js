import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from "./components/layout/Routing";
import LoginRouting from "./components/layout/LoginRouting";


import MainLayout from "./components/layout/Layout";

function App() {
  const [loggedin, setLoggedin] = useState(true);

  return (
    <div className="">
      <BrowserRouter>
        {
          loggedin ? 
          <MainLayout>
            <Routing/>
          </MainLayout> 
          : 
          <LoginRouting/>
        }
        

        
      </BrowserRouter>
    </div>
  );
}

export default App;
