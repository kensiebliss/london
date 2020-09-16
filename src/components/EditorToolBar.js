import React from "react"

import { AddComponentSelect } from "./AddComponentSelect"
import { Button, Text } from "evergreen-ui"
import { AddLayoutSelect } from "./AddLayoutSelect"
import { Store } from "../store/store"
import { observer } from "mobx-state-tree"
import { project } from "../state"

export const EditorToolBar = observer(() => {
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
})
