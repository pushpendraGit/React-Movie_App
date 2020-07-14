import React from "react";

import {createStore, applyMiddleware} from 'redux'

import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import combineReducers from './reducers'


const logger = function ({dispatch, getState}){

  return function(next){

    return function(action){

     console.log('Action Type', action.type)

      next(action);
    }
  }
}






const store = createStore(combineReducers,applyMiddleware(logger));

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
