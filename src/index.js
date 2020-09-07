import React from "react";
import ReactDOM from "react-dom";
import { Store } from "./store";

import { AsyncNodeModulesProvider } from "./utilities/useAsyncNodeModule";
import { App } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <Store.Provider>
      <AsyncNodeModulesProvider>
        <App />
      </AsyncNodeModulesProvider>
    </Store.Provider>
  </>,
  rootElement
);
