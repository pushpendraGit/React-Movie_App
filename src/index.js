import React, { createContext } from "react";

import { createStore, applyMiddleware } from "redux";

import {Provider} from 'react-redux';


import thunk from "redux-thunk";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import combineReducers from "./reducers";

const logger = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      if (typeof action !== "function") {
        console.log("Action Type", action.type);
      }

      next(action);
    };
  };
};

//Now we have passed inbuilt thunk

// const thunk = function ({dispatch, getState}){

//   return function(next){

//     return function(action){

//      if(typeof action === 'function')
//      {
//        action(dispatch);

//        return;
//      }

//       next(action);
//     }
//   }
// }

const store = createStore(combineReducers, applyMiddleware(logger, thunk));

// console.log("Before action", store.getState());

// store.dispatch({
//   type:"ADD_MOVIES",
//   movies:["m1", "m2", "m3"]
// })

// export const storeContext = createContext();

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;

//     return (
//       <storeContext.Provider value={store}>
//         {this.props.children}
//       </storeContext.Provider>
//     );
//   }
// }


// const connectedComponent = connect(callback)(App);

//Here we will use react-redux connect function


// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <storeContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </storeContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }




// console.log("After action", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
