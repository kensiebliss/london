import useHotkeys from "@reecelucas/react-use-hotkeys"
import * as React from "react"
import { appState } from "../../state"

export const useDebuggers = (data) => {
  const component = appState.activeProject.activeComponent
  const selectedElement = component.selectedElement || {}
  const rootElement = component.elements[0]

  React.useDebugValue(component ? "✔ component" : "❌ component")
  React.useDebugValue(selectedElement ? "✔ selectedElement" : "❌ selectedElement")
  React.useDebugValue(rootElement ? "✔ rootElement" : "❌ rootElement")
}

export const useComponentEditorHotkeys = () => {
  const component = appState.activeProject.activeComponent
  const selectedElement = component.selectedElement || {}
  // const rootElement = component.elements[0]

  useHotkeys("Delete", () => {
    !selectedElement.uid.includes("root") && selectedElement.destroy()
  })

  useHotkeys("Control+ArrowUp", () => {
    component.zoomIn()
  })

  useHotkeys("Control+ArrowDown", () => {
    component.zoomOut()
  })
}
