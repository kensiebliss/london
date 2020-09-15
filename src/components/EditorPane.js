import * as React from "react"
import { Pane, Heading, Text, Paragraph, Button, Popover, Tooltip, Position } from "evergreen-ui"
import { SketchPicker } from "react-color"

import { SideMenu } from "./SideMenu"
import { ColorSwatches } from "./ColorSwatches"
import { Swatch } from "./Swatch"
import { Store } from "../store"

const useSelectedElement = () => {
  const { element } = Store.useStoreState((state) => ({
    element: state.componenet.elements.find((element) => {
      return element.uid === state.component.selectedUid
    }),
  }))

  return element
}

export const EditorPane = (props) => {
  const element = useSelectedElement()

  const actions = Store.useStoreActions((actions) => ({
    editColor: actions.editColor,
    addColor: actions.addColor,
    deleteColor: actions.deleteColor,
    duplicateColor: actions.duplicateColor,
  }))

  return (
    <SideMenu
      title='Color Manager'
      toggleStateKey='isColorManagerShown'
      toggleActionKey='toggleColorManager'
      buttonText='Color Manager'
    >
      <Pane background='#fff' paddingBottom='24px'>
        <ColorSwatches
          title='Brand Colors'
          category='brand'
          colors={store.colors.brand}
          {...actions}
        />
        <ColorSwatches
          title='Neutral Colors'
          category='neutral'
          colors={store.colors.neutral}
          {...actions}
        />
        <ColorSwatches
          title='Functional Colors'
          category='functional'
          colors={store.colors.functional}
          {...actions}
        />
        <ColorSwatches
          title='Intentful Colors'
          category='intentful'
          colors={store.colors.intentful}
          {...actions}
        />
        <ColorSwatches
          title='Other Colors'
          category='other'
          colors={store.colors.other}
          {...actions}
        />
      </Pane>
    </SideMenu>
  )
}
