import React from "react"

import {
  Button,
  Heading,
  SideSheet,
  Paragraph,
  Pane,
  TextInput,
  TextInputField,
  Tablist,
  Tab,
  Card,
} from "evergreen-ui"

import useHotkeys from "@reecelucas/react-use-hotkeys"
import { Router, Route, Link } from "wouter"
import { observer } from "mobx-react"
import { appState } from "../../state"
import classcat from "classcat"

export const ComponentEditorView = observer((props) => {
  const component = appState.activeProject.activeComponent
  const selectedElement = component.selectedElement || {}
  const rootElement = component.elements[0]

  useHotkeys("Delete", () => {
    selectedElement.destroy()
  })

  useHotkeys("Control+ArrowUp", () => {
    component.zoomIn()
  })

  useHotkeys("Control+ArrowDown", () => {
    component.zoomOut()
  })

  const onBackdropClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    component.deselectElement()
  }

  return (
    <Pane width='100%' height='100%' display='flex'>
      <Pane
        width='calc(100% - 400px)'
        padding='48px'
        onClick={onBackdropClick}
        transform={`scale(${component.zoom})`}
        // overflow='scroll'
      >
        <Element
          selectedElement={selectedElement}
          element={rootElement}
          isRootElement={true}
          component={component}
        />
      </Pane>
      <ElementEditorPane selectedElement={selectedElement} component={component} />
    </Pane>
  )
})

const Element = observer((props) => {
  const isSelectedElement = props.selectedElement.uid === props.element.uid

  const classNames = classcat({
    Element: true,
    RootElement: props.isRootElement,
    isSelectedElement,
  })

  const onElementClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    props.component.setSelectedElement(props.element)
  }

  return (
    <Pane
      style={props.element.style}
      className={classNames}
      data-testid='Element'
      onClick={onElementClick}
    >
      {props.element.children.map((element) => (
        <Element
          key={element.uid}
          element={element}
          selectedElement={props.selectedElement}
          component={props.component}
        />
      ))}
    </Pane>
  )
})

const ElementEditorPane = observer((props) => {
  const tabNames = ["Styles", "Actions", "Settings"]
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const onTabSelect = (index) => () => {
    setSelectedIndex(index)
  }

  return (
    <Pane
      width='400px'
      height='100%'
      display='flex'
      flexDirection='column'
      background='white'
      className='boxShadowX'
    >
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor='white'>
        <Pane padding={16} borderBottom='muted'>
          <Heading size={600}>Element</Heading>
          <Paragraph size={400} color='muted'>
            {props.selectedElement.uid}
          </Paragraph>
        </Pane>
        <Pane display='flex' padding={8}>
          <Tablist>
            {tabNames.map((tab, index) => (
              <Tab key={tab} isSelected={selectedIndex === index} onSelect={onTabSelect(index)}>
                {tab}
              </Tab>
            ))}
          </Tablist>
        </Pane>
      </Pane>
      <Pane flex='1' overflowY='scroll' background='tint1'>
        <MarginEditor />
        <PaddingEditor />
      </Pane>
    </Pane>
  )
})

const PaddingEditor = observer((props) => {
  return (
    <Pane elevation={0} display='flex' flexDirection='column' paddingX='16px' paddingY='8px'>
      <Heading size={400} marginBottom='8px'>
        Padding
      </Heading>
      <Pane display='flex' justifyContent='space-between'>
        <TextInputField label='top' placeholder='' inputWidth={72} marginBottom={8} />
        <TextInputField label='right' placeholder='' inputWidth={72} marginBottom={8} />
        <TextInputField label='bottom' placeholder='' inputWidth={72} marginBottom={8} />
        <TextInputField label='left' placeholder='' inputWidth={72} marginBottom={8} />
      </Pane>
    </Pane>
  )
})

const MarginEditor = observer((props) => {
  return (
    <Pane elevation={0} display='flex' flexDirection='column' paddingX='16px' paddingY='8px'>
      <Heading size={400} marginBottom='8px'>
        Margin
      </Heading>
      <Pane display='flex' justifyContent='space-between'>
        <TextInputField label='top' placeholder='' inputWidth={72} marginBottom={8} />
        <TextInputField label='right' placeholder='' inputWidth={72} marginBottom={8} />
        <TextInputField label='bottom' placeholder='' inputWidth={72} marginBottom={8} />
        <TextInputField label='left' placeholder='' inputWidth={72} marginBottom={8} />
      </Pane>
    </Pane>
  )
})
