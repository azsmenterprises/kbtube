
import './App.css';

import React, { Fragment } from "react";
import { getUser } from "./AuthUser";
import AllRoute from './router';
function App() {
    
let userData=getUser(); 
  return (
    <div>
      <React.StrictMode>
        <Fragment>
          <AllRoute userData={userData} />
        </Fragment>
      </React.StrictMode>
    </div>
  );
}

export default App;