import classcat from "classcat"
import {
  CaretDownIcon,
  Heading,
  Pane,
  Paragraph,
  Button,
  Tab,
  SelectMenu,
  Tablist,
  TextInputField,
  Text,
  AddIcon,
} from "evergreen-ui"
import { observer } from "mobx-react"
import { isRoot } from "mobx-state-tree"
import React from "react"
import { appState } from "../../state"
import * as localHooks from "./localHooks"

export const ComponentEditorView = observer((props) => {
  const { projectUid, componentUid } = props.params
  const activeProject = appState.activeProject
  const activeComponent = appState.activeProject?.activeComponent

  !activeProject && appState.setActiveProject(projectUid)
  !activeComponent && appState.activeProject.setActiveComponent(componentUid)

  const component = appState.activeProject.activeComponent
  const selectedElement = component.selectedElement || {}
  const rootElement = component.elements[0]

  localHooks.useComponentEditorHotkeys()
  localHooks.useDebuggers()

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

  console.log(props.element)

  const Children = (() => {
    if (props.element.innerText) {
      console.log("innerText", props.element)
      return props.element.innerText
    }

    return props.element.children.map((element) => (
      <Element
        key={element.uid}
        element={element}
        selectedElement={props.selectedElement}
        component={props.component}
      />
    ))
  })()

  const Tag = props.element.tag

  return (
    <Tag
      style={{ ...props.element.style }}
      className={classNames}
      data-testid='Element'
      onClick={onElementClick}
    >
      {Children}
    </Tag>
  )
})

const StyledEditorPane = observer((props) => {
  return (
    <Pane flex='1' overflowY='scroll' background='tint1'>
      <SizeEditor />
      <MarginEditor />
      <PaddingEditor />
      <LayoutEditor />
    </Pane>
  )
})

const ActionsEditorPane = (props) => {
  return (
    <Pane flex='1' overflowY='scroll' background='tint1'>
      <Text size={700}>ActionsEditorPane</Text>
    </Pane>
  )
}

const ElementsEditorPane = (props) => {
  return (
    <Pane flex='1' overflowY='scroll' background='tint1'>
      <ElementsEditor />
    </Pane>
  )
}

const tabs = {
  Styles: StyledEditorPane,
  Actions: ActionsEditorPane,
  Elements: ElementsEditorPane,
}

const ElementEditorPane = observer((props) => {
  const tabNames = ["Styles", "Elements", "Actions"]
  const [selectedTab, setSelectedTab] = React.useState(tabNames[0])
  const ActiveTab = tabs[selectedTab]

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
            {tabNames.map((tab) => (
              <Tab key={tab} isSelected={selectedTab === tab} onSelect={() => setSelectedTab(tab)}>
                {tab}
              </Tab>
            ))}
          </Tablist>
        </Pane>
      </Pane>
      <ActiveTab />
    </Pane>
  )
})

const ElementsEditor = observer((props) => {
  const activeComponent = appState.activeComponent

  return (
    <EditorSection>
      <Heading size={400} marginBottom='8px'>
        Add Elements
      </Heading>
      <Pane display='flex' flexDirection='column' style={{ gap: "16px" }}>
        <Pane border='default' background='#fff' padding='8px'>
          <Pane display='flex' justifyContent='space-between'>
            <Text size={500}>Row Layout</Text>
            <AddIcon onClick={activeComponent.createRowElement} />
          </Pane>
        </Pane>
        <Pane border='default' background='#fff' padding='8px'>
          <Pane display='flex' justifyContent='space-between'>
            <Text size={500}>Column Layout</Text>
            <AddIcon onClick={console.log} />
          </Pane>
        </Pane>
        <Pane border='default' background='#fff' padding='8px'>
          <Pane display='flex' justifyContent='space-between'>
            <Text size={500}>Text</Text>
            <AddIcon onClick={activeComponent.createTextElement} />
          </Pane>
        </Pane>
      </Pane>
    </EditorSection>
  )
})

const PaddingEditor = observer((props) => {
  const selectedElement = appState.activeComponent.selectedElement
  const style = selectedElement.style
  const setStyle = style.setStyle

  return (
    <EditorSection>
      <Heading size={400} marginBottom='8px'>
        Padding
      </Heading>
      <Pane display='flex' justifyContent='space-between'>
        <TextInputField
          label='top'
          placeholder=''
          inputWidth={72}
          marginBottom={8}
          value={style.paddingTop}
          onChange={(event) => {
            setStyle("paddingTop", event.target.value)
          }}
        />
        <TextInputField
          label='right'
          placeholder=''
          inputWidth={72}
          marginBottom={8}
          value={style.paddingRight}
          onChange={(event) => {
            setStyle("paddingRight", event.target.value)
          }}
        />
        <TextInputField
          label='bottom'
          placeholder=''
          inputWidth={72}
          marginBottom={8}
          value={style.paddingBottom}
          onChange={(event) => {
            setStyle("paddingBottom", event.target.value)
          }}
        />
        <TextInputField
          label='left'
          placeholder=''
          inputWidth={72}
          marginBottom={8}
          value={style.paddingLeft}
          onChange={(event) => {
            setStyle("paddingLeft", event.target.value)
          }}
        />
      </Pane>
    </EditorSection>
  )
})

const RootElementMarginInfo = (props) => {
  return (
    <Text color='muted' size={400}>
      Root element's margin can not be modified at the component level.
    </Text>
  )
}

const MarginEditor = observer((props) => {
  const isRootSelected = appState.activeProject.activeComponent.isRootElementSelected

  const children = isRootSelected ? (
    <RootElementMarginInfo />
  ) : (
    <>
      <EditorInputField label='top' placeholder='' inputWidth={72} marginBottom={8} />
      <EditorInputField label='right' placeholder='' inputWidth={72} marginBottom={8} />
      <EditorInputField label='bottom' placeholder='' inputWidth={72} marginBottom={8} />
      <EditorInputField label='left' placeholder='' inputWidth={72} marginBottom={8} />
    </>
  )

  return (
    <EditorSection>
      <Heading size={400} marginBottom='8px'>
        Margin
      </Heading>
      <Pane display='flex' justifyContent='space-between'>
        {children}
      </Pane>
    </EditorSection>
  )
})

const EditorSection = (props) => {
  return (
    <Pane elevation={0} display='flex' flexDirection='column' paddingX='16px' paddingY='16px'>
      {props.children}
    </Pane>
  )
}

const LayoutEditor = observer((props) => {
  const options0 = [
    { label: "Start", value: "flex-start" },
    { label: "End", value: "flex-end" },
    { label: "Center", value: "center" },
    { label: "Stretch", value: "stretch" },
    { label: "Space Between", value: "space-between" },
    { label: "Space Evenly", value: "space-evenly" },
    { label: "Space Around", value: "space-around" },
  ]

  const options1 = [
    { label: "Start", value: "flex-start" },
    { label: "End", value: "flex-end" },
    { label: "Center", value: "center" },
    { label: "Stretch", value: "stretch" },
    { label: "Space Between", value: "space-between" },
    { label: "Space Evenly", value: "space-evenly" },
    { label: "Space Around", value: "space-around" },
  ]

  const [selectedOption0, setSelectedOption0] = React.useState(options0[0])
  const [selectedOption1, setSelectedOption1] = React.useState(options1[0])

  const selectedElement = appState.activeComponent.selectedElement
  const style = selectedElement.style
  const setStyle = style.setStyle

  const setVerticalOption = (option) => {
    setSelectedOption0(option)
    setStyle("alignItems", option.value)
  }

  const setHorizontalOption = (option) => {
    setSelectedOption1(option)
    setStyle("justifyContent", option.value)
  }

  return (
    <EditorSection>
      <Pane display='flex' justifyContent='space-between' marginBottom='16px'>
        <Heading size={400}>Children Layout</Heading>
      </Pane>
      <Pane>
        <SelectMenu
          height='auto'
          hasTitle={false}
          hasFilter={false}
          options={options0}
          selected={selectedOption0}
          onSelect={(option) => setVerticalOption(option)}
          closeOnSelect
        >
          <Button height={24} appearance='minimal' iconAfter={CaretDownIcon}>
            Vertical: {selectedOption0.label}
          </Button>
        </SelectMenu>
        <SelectMenu
          height='auto'
          hasTitle={false}
          hasFilter={false}
          options={options1}
          selected={selectedOption1}
          onSelect={(option) => setHorizontalOption(option)}
          closeOnSelect
        >
          <Button height={24} appearance='minimal' iconAfter={CaretDownIcon}>
            Horizontal: {selectedOption1.label}
          </Button>
        </SelectMenu>
      </Pane>
    </EditorSection>
  )
})

const SizeEditor = observer((props) => {
  const options = [
    { label: "Custom", value: "Custom" },
    { label: "Auto", value: "Auto" },
  ]

  const [selectedOption, setSelectedOption] = React.useState(options[0])

  const selectedElement = appState.activeComponent.selectedElement
  const style = selectedElement.style
  const setStyle = style.setStyle

  return (
    <EditorSection>
      <Pane display='flex' justifyContent='space-between' marginBottom='16px'>
        <Heading size={400}>Size</Heading>
        <SelectMenu
          height='auto'
          hasTitle={false}
          hasFilter={false}
          options={options}
          selected={selectedOption}
          onSelect={(option) => setSelectedOption(option)}
          closeOnSelect
        >
          <Button height={24} appearance='minimal' iconAfter={CaretDownIcon}>
            {selectedOption.label}
          </Button>
        </SelectMenu>
      </Pane>
      <Pane display='flex' justifyContent='space-between' style={{ gap: 16 }}>
        <EditorInputField
          label='min width'
          placeholder=''
          marginBottom={8}
          value={style.minWidth}
          onChange={(event) => setStyle("minWidth", event.target.value)}
        />
        <EditorInputField
          label='width'
          placeholder=''
          marginBottom={8}
          value={style.width}
          onChange={(event) => setStyle("width", event.target.value)}
        />
        <EditorInputField
          label='max width'
          placeholder=''
          marginBottom={8}
          value={style.maxWidth}
          onChange={(event) => setStyle("maxWidth", event.target.value)}
        />
      </Pane>
      <Pane display='flex' justifyContent='space-between' style={{ gap: 16 }}>
        <EditorInputField
          label='min height'
          placeholder=''
          marginBottom={8}
          value={style.minHeight}
          onChange={(event) => setStyle("minHeight", event.target.value)}
        />
        <EditorInputField
          label='height'
          placeholder=''
          marginBottom={8}
          value={style.height}
          onChange={(event) => setStyle("height", event.target.value)}
        />
        <EditorInputField
          label='max height'
          placeholder=''
          marginBottom={8}
          value={style.maxHeight}
          onChange={(event) => setStyle("maxHeight", event.target.value)}
        />
      </Pane>
    </EditorSection>
  )
})

const EditorInputField = (props) => {
  return <TextInputField {...props} marginBottom='4px' inputHeight={32} />
}
