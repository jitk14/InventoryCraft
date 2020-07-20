import React from 'react';
import './styles/App.scss';
import { Provider } from 'react-redux';
import appStore from './store/app.store';
import {Login} from "./components/login/login";
import {AppLayout} from "./components/layout/app-layout";

function App() {
    return (
      <div className="App flex-child flex-container flex-col">
        <Provider store={appStore}>
            { false ? <Login/> : null }
            <AppLayout/>
        </Provider>
      </div>
  );
}

export default App;
