import * as React from 'react'
import { AddIcon, Pane, Heading, Text, Paragraph, Button, Popover, Tooltip, Position } from 'evergreen-ui'

import { Icon } from './Icon'
import { Swatch } from './Swatch'
import { Store } from '../store'

export const ColorSwatches = (props) => {
  return (
    <Pane className="ColorSwatches">
      <Text size={500}>{props.title}</Text>
      <Pane marginTop="24px" className="swatchGrid">
        {props.colors.map((color) => (
          <Swatch key={color.id} color={color} category={props.category} editColor={props.editColor} isEditable />
        ))}
        <Icon iconName="AddIcon" size={24} color="#66788A" marginTop="3px" />
      </Pane>
    </Pane>
  )
}
