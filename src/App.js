import React from "react"
import "./styles.css"

import { AddComponentSelect } from "./components/AddComponentSelect"
import { Button, Text } from "evergreen-ui"
import { ColorManager } from "./components/ColorManager"
import { ComponentPreview } from "./components/ComponentPreview"
import { Store } from "./store"
import { ElementTree } from "./components/ElementTree"
import { AddLayoutSelect } from "./components/AddLayoutSelect"

export const App = () => {
  const store = Store.useStoreState((store) => ({
    atoms: store.atoms,
    component: store.component,
  }))

  const actions = Store.useStoreActions((store) => ({
    toggleColorManager: store.toggleColorManager,
    createColor: store.createColor,
    addElement: store.addElement,
  }))

  return (
    <div className='App'>
      <ColorManager />
      <ToolBar />
      {/* <ElementTree /> */}
      <ComponentPreview />
    </div>
  )
}

const ToolBar = () => {
  const state = Store.useStoreState((state) => ({
    scale: state.component.previewSettings.scale,
  }))

  const actions = Store.useStoreActions((store) => ({
    toggleColorManager: store.toggleColorManager,
    createColor: store.createColor,
    addElement: store.addElement,
  }))

  return (
    <div className='toolbar'>
      <Button onClick={() => actions.addElement({ tag: "div" })}>Add Box</Button>
      <Button onClick={() => actions.addElement({ tag: "p" })}>Add Heading</Button>
      <Button onClick={() => actions.addElement({ tag: "div" })}>Add Section</Button>
      <AddComponentSelect />
      <AddLayoutSelect />
      <Button onClick={actions.toggleColorManager}>Colors</Button>
      <Text size={400}>Zoom: {Number.parseFloat(state.scale * 100).toFixed(0)}%</Text>
    </div>
  )
}
