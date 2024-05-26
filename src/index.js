import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import {Authcontextprovider} from "./Components/Store/Authcontext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Authcontextprovider>
<React.StrictMode>
    <App /> 
    </React.StrictMode>
    </Authcontextprovider>
   
    )
  