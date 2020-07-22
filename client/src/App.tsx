import React from 'react';
import './styles/App.scss';
import { Provider } from 'react-redux';
import appStore from './store/app.store';
import {AppLayout} from "./components/layout/app-layout";
import { AvailabilityColorCode, AvailabilityColorContext} from "./AppContexts";

function App() {
    return (
      <div className="App flex-child flex-container flex-col">
        <Provider store={appStore}>
            <AvailabilityColorContext.Provider value={AvailabilityColorCode.getColorCode}>
                <AppLayout/>
            </AvailabilityColorContext.Provider>
        </Provider>
      </div>
  );
}

export default App;