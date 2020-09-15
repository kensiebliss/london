import * as React from "react"
import { Store } from "../store"
import {
  Pane,
  SelectMenu,
  Heading,
  Text,
  Paragraph,
  Button,
  Popover,
  Tooltip,
  Position,
} from "evergreen-ui"
import useHotkeys from "@reecelucas/react-use-hotkeys"

const useComponentStore = () => {
  const state = Store.useStoreState((state) => state)

  const getChildren = (uid) => {
    return state.component.elements.filter((element) => {
      return element.parentUid === uid
    })
  }

  const getElementById = (uid) => {
    return state.component.elements.find((element) => {
      return element.uid === uid
    })
  }

  const findElementParent = (uid) => {
    return state.component.elements.find((element) => {
      return element.children.find((child) => {
        return child.uid === uid
      })
    })
  }

  // turned out aite. less complex.
  const getElementPath = (currentUid) => {
    if (currentUid === "root") return []
    const element = getElementById(currentUid)
    return [...getElementPath(element.parentUid), element]
  }

  const actions = Store.useStoreActions((actions) => ({
    addElement: actions.addElement,
    deleteElement: actions.deleteElement,
    copyElement: actions.copyElement,
    selectElement: actions.selectElement,
    deselectElement: actions.deselectElement,
    setPreviewWidth: actions.setPreviewWidth,
    setPreviewHeight: actions.setPreviewHeight,
    setPreviewScale: actions.setPreviewScale,
    zoomIn: actions.zoomIn,
    zoomOut: actions.zoomOut,
    setHoverIndicators: actions.setHoverIndicators,

    getChildren,
    getElementPath,
  }))

  return { state, actions }
}

export const ComponentPreview = (props) => {
  const { state, actions } = useComponentStore()
  const isSelected = state.component.selectedUid === "root"

  useHotkeys("Delete", () => {
    actions.deleteElement()
  })

  useHotkeys("Control+ArrowUp", () => {
    actions.zoomIn()
  })

  useHotkeys("Control+ArrowDown", () => {
    actions.zoomOut()
  })

  return (
    <Pane
      className='ComponentPreview'
      padding='48px'
      zIndex='1'
      width='100%'
      // height='100%'
      position='relative'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      // alignItems='center'
      // paddingLeft='50px'
    >
      {/* <ElementPath state={state} actions={actions} /> */}
      <Pane
        data-uid='root'
        borderWidth='1px'
        borderStyle='solid'
        borderColor='#33333340'
        display='flex'
        flexDirection='column'
        data-isSelectedElement={isSelected}
        transform={`scale(${state.component.previewSettings.scale})`}
        boxShadow={state.component.previewSettings.boxShadow}
        background={state.component.previewSettings.background}
        width={state.component.previewSettings.width}
        height={state.component.previewSettings.height}
        onClick={(event) => {
          event.stopPropagation()
          actions.selectElement({ uid: "root" })
        }}
      >
        <>
          {state.component.tree.map((element) => (
            <Element key={element.uid} element={element} state={state} actions={actions} />
          ))}
        </>
      </Pane>
    </Pane>
  )
}

const ElementPath = (props) => {
  const [elementPath, setElementPath] = React.useState([])

  React.useEffect(() => {
    if (props.state.component.selectedUid && props.state.component.selectedUid !== "root") {
      setElementPath(props.actions.getElementPath(props.state.component.selectedUid))
    } else {
      setElementPath([])
    }
  }, [props.state.component.selectedUid])

  return (
    <Pane display='flex' marginBottom='16px'>
      <Text
        size={500}
        marginRight='16px'
        onMouseLeave={() => props.actions.setHoverIndicators()}
        onMouseEnter={() => props.actions.setHoverIndicators()}
        onClick={(event) => {
          event.stopPropagation()
          props.actions.selectElement({ uid: "root" })
        }}
      >
        root
        {elementPath.length ? "  > " : ""}
      </Text>
      {elementPath.map((pathPart, index) => (
        <Text
          key={pathPart.uid}
          size={500}
          marginRight='16px'
          onMouseLeave={() => props.actions.setHoverIndicators()}
          onMouseEnter={() => props.actions.setHoverIndicators(pathPart)}
          onClick={(event) => {
            event.stopPropagation()
            props.actions.selectElement(pathPart)
          }}
        >
          {pathPart.tag}
          {index < elementPath.length - 1 ? "  > " : ""}
        </Text>
      ))}
    </Pane>
  )
}

const Element = (props) => {
  const isSelected = props.state.component.selectedUid === props.element.uid
  console.log({ isSelected }, props.state.component)

  const onClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    props.actions.selectElement(props.element)
  }

  const Children = () => {
    const children = props.element.children || []
    if (props.element.innerText) return props.element.innerText

    if (!children.length) {
      return children.map((child) => child)
    }

    return children.map((child) => (
      <Element
        state={props.state}
        actions={props.actions}
        key={child.uid}
        element={child}
        getChildren={props.getChildren}
      />
    ))
  }

  return (
    <props.element.tag
      className={`Element ${
        props.state.component.hoveredElementUid === props.element.uid ? "hoverFinder" : ""
      }`}
      style={props.element.style}
      data-uid={props.element.uid}
      onClick={onClick}
      data-isSelectedElement={isSelected}
    >
      <Children />
    </props.element.tag>
  )
}
