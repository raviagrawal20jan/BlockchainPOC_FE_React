import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Helmet } from 'react-helmet'

import Login from './Login';
import LoginLexisNexis from './LoginLexisNexis';
import FerrariLogin from './FerrariLogin';
import FiservLogin from './FiservLogin';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

if(window.location.href.indexOf("PorscheBlocks") > -1){
ReactDOM.render(
  <React.StrictMode>
    <Login type="1"/>
  </React.StrictMode>,
  document.getElementById('root')
);
}
else if(window.location.href.indexOf("LexisNexis") > -1){
     ReactDOM.render(
       <React.StrictMode>
         <LoginLexisNexis type="2"/>
       </React.StrictMode>,
       document.getElementById('root')
     );
     }
     else if(window.location.href.indexOf("Ferrari") > -1){
          ReactDOM.render(
            <React.StrictMode>
              <FerrariLogin type="3" />
            </React.StrictMode>,
            document.getElementById('root')
          );
          }
           else if(window.location.href.indexOf("Fiserv") > -1){
                    ReactDOM.render(
                      <React.StrictMode>
                        <FiservLogin type="4" />
                      </React.StrictMode>,
                      document.getElementById('root')
                    );
                    }




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();