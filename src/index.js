import React from "react"
import ReactDOM from "react-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { AsyncNodeModulesProvider } from "./utilities/useAsyncNodeModule"
import { App } from "./App"
import { appState } from "./state"
import makeInspectable from "mobx-devtools-mst"

const rootElement = document.getElementById("root")
makeInspectable(appState)

ReactDOM.render(
  <>
    <DndProvider backend={HTML5Backend}>
      <AsyncNodeModulesProvider>
        <App />
      </AsyncNodeModulesProvider>
    </DndProvider>
  </>,
  rootElement
)
