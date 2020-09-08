import * as React from "react"
import { Pane, Text } from "evergreen-ui"

import { Store } from "../store"
import { computed } from "easy-peasy"

export const ElementTree = (props) => {
  const { state, actions } = useStore()

  const onLayoutChange = () => {
    console.log("onLayoutChange")
  }

  return (
    <Pane
      position='fixed'
      left='0px'
      top='200px'
      zIndex='19'
      width='320px'
      height='500px'
      background='#fff'
      boxShadow='0px 2px 24px -4px rgba(0,0,0,0.15)'
    >
      <Pane padding='24px'>
        <Text size={700}>Layers</Text>
      </Pane>
      <Pane paddingX='24px'>
        {state.component.tree.map((element) => (
          <Branch key={element.uid} state={state} actions={actions} element={element} />
        ))}
      </Pane>
    </Pane>
  )
}

const Branch = (props) => {
  const children = props.element.children || []
  const selectElement = () => props.actions.selectElement(props.element)
  const setElementHovered = () => props.actions.setHoverIndicators(props.element)
  const clearItemHovered = () => props.actions.setHoverIndicators()

  return (
    <Pane key={props.element.uid} paddingX='8px'>
      <Text
        size={400}
        onClick={selectElement}
        onMouseEnter={setElementHovered}
        onMouseLeave={clearItemHovered}
      >
        {props.element.tag}.{props.element.uid}
      </Text>
      {children.map((child) => (
        <Branch
          key={child.uid}
          element={child}
          state={props.state}
          actions={props.actions}
        />
      ))}
    </Pane>
  )
}

const useStore = () => {
  const state = Store.useStoreState((x) => x)
  const actions = Store.useStoreActions((x) => x)

  return {
    state,
    actions,
  }
}
