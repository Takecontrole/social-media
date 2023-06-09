import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store'
import { StateProvider } from "./Context/StateProvider";
import { initialState } from "./Context/initalState";
import reducer from "./Context/reducer";
ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
     <StateProvider initialState={initialState} reducer={reducer}>
      <App />
      </StateProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
