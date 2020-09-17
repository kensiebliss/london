import makeInspectable from "mobx-devtools-mst"
import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ReactDOM from "react-dom"
// import { AsyncNodeModulesProvider } from "./utilities/useAsyncNodeModule"
import { App } from "./App"
import { appState } from "./state"

const rootElement = document.getElementById("root")
makeInspectable(appState)

ReactDOM.render(
  <>
    <DndProvider backend={HTML5Backend}>
      {/* <AsyncNodeModulesProvider> */}
      <App />
      {/* </AsyncNodeModulesProvider> */}
    </DndProvider>
  </>,
  rootElement
)
