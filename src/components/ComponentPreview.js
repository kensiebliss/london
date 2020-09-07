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
  const state = Store.useStoreState((state) => ({
    component: state.component,
    previewSettings: state.component.previewSettings,
    selectedElement: state.component.selectedElement,
    elements: state.component.elements,
  }))

  const getChildren = (uid) => {
    return state.elements.filter((element) => {
      return element.parentUid === uid
    })
  }

  const getElementById = (uid) => {
    return state.elements.find((element) => {
      return element.uid === uid
    })
  }

  const findElementParent = (uid) => {
    return state.elements.find((element) => {
      return element.children.find((child) => {
        return child.uid === uid
      })
    })
  }

  // turned out aite. less complex.
  const getElementPath = (currentUid) => {
    if (currentUid === "root") return []
    const { tag, uid, parentUid } = getElementById(currentUid)
    return [...getElementPath(parentUid), { tag, uid, parentUid }]
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

    getChildren,
    getElementPath,
  }))

  return { state, actions }
}

export const ComponentPreview = (props) => {
  const { state, actions } = useComponentStore()
  const [hoveredUid, setHoveredUid] = React.useState("")

  console.log({ hoveredUid })

  useHotkeys("Delete", () => {
    actions.deleteElement()
  })

  useHotkeys("Control+ArrowUp", () => {
    actions.zoomIn()
  })

  useHotkeys("Control+ArrowDown", () => {
    actions.zoomOut()
  })

  const isSelected = state.component.selectedElement === "root"

  return (
    <Pane
      zIndex='1'
      width='100%'
      height='100%'
      position='fixed'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <ElementPath state={state} actions={actions} setHoveredUid={setHoveredUid} />
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
        onClick={() => actions.selectElement("root")}
      >
        <>
          {actions.getChildren("root").map((child) => (
            <Element
              key={child.uid}
              state={state}
              hoveredUid={hoveredUid}
              actions={actions}
              {...child}
            />
          ))}
        </>
      </Pane>
    </Pane>
  )
}

const ElementPath = (props) => {
  const [elementPath, setElementPath] = React.useState([])

  React.useEffect(() => {
    if (props.state.selectedElement && props.state.selectedElement !== "root") {
      setElementPath(props.actions.getElementPath(props.state.selectedElement))
    } else {
      setElementPath([])
    }
  }, [props.state.selectedElement])

  return (
    <Pane display='flex' marginBottom='16px'>
      <Text
        size={500}
        marginRight='16px'
        onMouseLeave={() => props.setHoveredUid()}
        onMouseEnter={() => props.setHoveredUid("root")}
        onClick={() => props.actions.selectElement("root")}
      >
        root
        {elementPath.length ? "  > " : ""}
      </Text>
      {elementPath.map((pathPart, index) => (
        <Text
          key={pathPart.uid}
          size={500}
          marginRight='16px'
          onMouseLeave={() => props.setHoveredUid()}
          onMouseEnter={() => props.setHoveredUid(pathPart.uid)}
          onClick={() => props.actions.selectElement(pathPart.uid)}
        >
          {pathPart.tag}
          {index < elementPath.length - 1 ? "  > " : ""}
        </Text>
      ))}
    </Pane>
  )
}

const Element = (props) => {
  const children = props.actions.getChildren(props.uid)
  const [showBorder, setShowBorder] = React.useState(false)
  const isSelected = props.state.selectedElement === props.uid

  React.useEffect(() => {
    setTimeout(() => {
      setShowBorder(true)
    }, 500)
  }, [props.uid])

  const onClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    props.actions.selectElement(props.uid)
  }

  const Children = () => {
    if (props.innerText) return props.innerText

    if (!children.length) {
      return children.map((child) => child)
    }

    return children.map((child) => (
      <Element
        state={props.state}
        actions={props.actions}
        key={child.uid}
        {...child}
        hoveredUid={props.hoveredUid}
        getChildren={props.getChildren}
      />
    ))
  }

  const style = {
    ...props.style,
    outline: showBorder ? "2px dotted #d8709300" : undefined,
  }

  return (
    <props.tag
      className={`Element ${props.hoveredUid === props.uid ? "hoverFinder" : ""}`}
      style={style}
      data-uid={props.uid}
      onClick={onClick}
      data-isSelectedElement={isSelected}
    >
      <Children />
    </props.tag>
  )
}

const ComponentChildren = (props) => {
  const currentUid = props.uid || "root"
  const children = props.getChildren(currentUid)

  return children.map((child) => (
    <ComponentChildren style={child.style} data-uid={child.uid} data-parent-uid={child.parentUid} />
  ))
}
