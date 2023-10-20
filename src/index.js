import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from '../src/src/serviceWorkerRegistration';
import { BrowserRouter as Router } from "react-router-dom";
import { Auth } from "aws-amplify";
import axios from "axios";


async function getToken() {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  return token;
}

axios.interceptors.request.use(async (request) => {
  const token = await getToken();
  request.headers.Authorization = token;
  return request;
});

axios.interceptors.response.use(async (response) => {
  const token = await getToken(); // Await the getToken() function
  response.headers.Authorization = token;
  return response;
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
   
);

serviceWorkerRegistration.register();
