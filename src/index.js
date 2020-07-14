import React from "react";

import {createStore} from 'redux'

import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import rootReducer from './reducers'


const store = createStore(rootReducer);

// console.log("Before action", store.getState());

// store.dispatch({
//   type:"ADD_MOVIES",
//   movies:["m1", "m2", "m3"]
// })



// console.log("After action", store.getState());



ReactDOM.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>,
  document.getElementById("root")
);
