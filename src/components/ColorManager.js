import * as React from 'react'
import { Pane, Heading, Text, Paragraph, Button, Popover, Tooltip, Position } from 'evergreen-ui'
import { SketchPicker } from 'react-color'

import { SideMenu } from './SideMenu'
import { ColorSwatches } from './ColorSwatches'
import { Swatch } from './Swatch'
import { Store } from '../store'

export const ColorManager = (props) => {
  const store = Store.useStoreState((store) => ({
    colors: store.colors,
  }))

  const actions = Store.useStoreActions((actions) => ({
    editColor: actions.editColor
  }))

  return (
    <SideMenu
      title="Color Manager"
      toggleStateKey="isColorManagerShown"
      toggleActionKey="toggleColorManager"
      buttonText="Color Manager"
    >
      <Pane background="#fff" paddingBottom="24px">
        <ColorSwatches title="Brand Colors" category="brand" colors={store.colors.brand} editColor={actions.editColor} />
        <ColorSwatches title="Neutral Colors" category="neutral" colors={store.colors.neutral} editColor={actions.editColor} />
        <ColorSwatches title="Functional Colors" category="functional" colors={store.colors.functional} editColor={actions.editColor} />
        <ColorSwatches title="Intentful Colors" category="intentful" colors={store.colors.intentful} editColor={actions.editColor} />
        <ColorSwatches title="Other Colors" category="other" colors={store.colors.other} editColor={actions.editColor} />
      </Pane>
    </SideMenu>
  )
}
