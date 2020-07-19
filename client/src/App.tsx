import React from 'react';
import './styles/App.scss';
import { Provider } from 'react-redux';
import appStore from './store/app.store';
import {Login} from "./components/login/login";

function App() {
    return (
      <div className="App">
        <Provider store={appStore}>
            <Login/>
        </Provider>
      </div>
  );
}

export default App;
