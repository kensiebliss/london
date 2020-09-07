import React from "react"
import "./styles.css"

import { AddComponentSelect } from "./components/AddComponentSelect"
import { Button } from "evergreen-ui"
import { ColorManager } from "./components/ColorManager"
import { ComponentPreview } from "./components/ComponentPreview"
import { Store } from "./store"

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

  const ToolBar = () => {
    return (
      <div className='toolbar'>
        <Button onClick={() => actions.addElement({ tag: "div" })}>Add Box</Button>
        <Button onClick={() => actions.addElement({ tag: "p" })}>Add Heading</Button>
        <AddComponentSelect />
        <Button onClick={actions.toggleColorManager}>Colors</Button>
      </div>
    )
  }

  return (
    <div className='App'>
      <ColorManager />
      <ToolBar />
      <ComponentPreview />
    </div>
  )
}
