import React from "react"
import ReactDOM from "react-dom"
import { Store } from "./store"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { AsyncNodeModulesProvider } from "./utilities/useAsyncNodeModule"
import { App } from "./App"

const rootElement = document.getElementById("root")

ReactDOM.render(
  <>
    <DndProvider backend={HTML5Backend}>
      <Store.Provider>
        <AsyncNodeModulesProvider>
          <App />
        </AsyncNodeModulesProvider>
      </Store.Provider>
    </DndProvider>
  </>,
  rootElement
)
