import * as React from 'react'
import { Pane, Heading, Button, SideSheet, Position } from 'evergreen-ui'
import { Store } from '../store'

export const SideMenu = (props) => {
  const stateKey = props.toggleStateKey
  const togglerKey = props.toggleActionKey

  const store = Store.useStoreState((store) => ({
    [stateKey]: store[stateKey],
  }))

  const actions = Store.useStoreActions((actions) => ({
    [togglerKey]: actions[togglerKey],
  }))

  return (
    <>
      <SideSheet
        isShown={store[stateKey]}
        onCloseComplete={actions[togglerKey]}
        shouldCloseOnOverlayClick
        shouldCloseOnEscapePress
        preventBodyScrolling
        position={Position.RIGHT}
        width="400px"
      >
        <Pane padding={16}>
          <Heading size={600}>{props.title}</Heading>
        </Pane>
        {props.children}
      </SideSheet>
    </>
  )
}
