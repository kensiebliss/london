import React from "react"
import "./styles.css"

import { Button, Heading, Pane, TextInput, TextInputField } from "evergreen-ui"
import { Router, Route, Link } from "wouter"
import { observer } from "mobx-react"
import { appState } from "./state"

import { ComponentEditorView } from "./components/views/ComponentEditorView"

export const App = () => {
  return (
    <Pane
      data-testid='App'
      className='withCheckeredBackground'
      width='100%'
      height='100%'
      position='absolute'
      top='0px'
      left='0px'
    >
      <Routing />
    </Pane>
  )
}

const Routing = (props) => {
  return (
    <Router>
      <Route path='/' component={DashboardView} />
      <Route path='/projects/:projectUid' component={ProjectView} />
      <Route path='/projects/:projectUid/component/:componentUid' component={ComponentEditorView} />
    </Router>
  )
}

const NonEditorView = (props) => {
  return (
    <Pane data-testid={props.testId} background='#fff' width='100%' height='100%'>
      <Pane maxWidth='980px' marginX='auto' paddingX='24px' paddingY='48px'>
        {props.children}
      </Pane>
    </Pane>
  )
}

const ProjectView = observer((props) => {
  return (
    <NonEditorView testid='ProjectView' background='#fff' width='100%' height='100%'>
      <Pane display='flex' justifyContent='space-between'>
        <Heading size={900}>Project: {appState.activeProject.title}</Heading>
      </Pane>

      <Pane padding='24px' display='flex' flexDirection='column'>
        <Pane display='flex' justifyContent='space-between'>
          <Heading size={700}>Components</Heading>
          <CreateComponentPane />
        </Pane>

        {appState.activeProject.components.map((component) => (
          <ComponentCard
            key={component.uid}
            projectUid={props.params.projectUid}
            component={component}
          />
        ))}
      </Pane>
    </NonEditorView>
  )
})

const DashboardView = observer((props) => {
  return (
    <NonEditorView testid='DashboardView' background='#fff' width='100%' height='100%'>
      <Pane display='flex' justifyContent='space-between'>
        <Heading size={900}>Dashboard</Heading>
      </Pane>

      <Pane padding='24px' display='flex' flexDirection='column'>
        <Pane display='flex' justifyContent='space-between'>
          <Heading size={700}>Projects</Heading>
          <CreateProjectPane />
        </Pane>

        {appState.projects.map((project) => (
          <ProjectCard key={project.uid} project={project} />
        ))}
      </Pane>
    </NonEditorView>
  )
})

const CreateProjectPane = observer((props) => {
  const [inputValue, setInputValue] = React.useState("")

  const create = () => {
    appState.createAndAddProject({ title: inputValue })
    setInputValue("")
  }

  return (
    <Pane display='flex' alignItems='center'>
      <TextInput
        value={inputValue}
        marginRight='16px'
        onChange={(event) => setInputValue(event.target.value)}
        placeholder='New Project Title'
      />
      <Button onClick={create}>Create a Project</Button>
    </Pane>
  )
})

const CreateComponentPane = observer((props) => {
  const [inputValue, setInputValue] = React.useState("")

  const create = () => {
    appState.activeProject.createAndAddComponent({ title: inputValue })
    setInputValue("")
  }

  return (
    <Pane display='flex' alignItems='center'>
      <TextInput
        marginRight='8px'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder='New Component Title'
      />
      <Button onClick={create}>Create Component</Button>
    </Pane>
  )
})

const ProjectCard = observer((props) => {
  const linkHref = `/projects/${props.project.uid}`

  const setActiveProject = () => {
    appState.setActiveProject(props.project.uid)
  }

  return (
    <Link href={linkHref} onClick={setActiveProject}>
      <Pane
        padding='16px'
        borderRadius='2px'
        borderWidth='1px'
        borderStyle='solid'
        borderColor='#E4E7EB'
        marginTop='16px'
      >
        <Heading size={500}>{props.project.title}</Heading>
      </Pane>
    </Link>
  )
})

const ComponentCard = observer((props) => {
  const linkHref = `/projects/${props.projectUid}/component/${props.component.uid}`

  const setActiveComponent = () => {
    appState.activeProject.setActiveComponent(props.component.uid)
  }

  return (
    <Link href={linkHref} onClick={setActiveComponent}>
      <Pane
        padding='16px'
        borderRadius='2px'
        borderWidth='1px'
        borderStyle='solid'
        borderColor='#E4E7EB'
        marginTop='16px'
      >
        <Heading size={500}>{props.component.title}</Heading>
      </Pane>
    </Link>
  )
})
