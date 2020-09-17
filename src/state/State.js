import { types } from "mobx-state-tree"
import { Project } from "./Project"
import { optionalArrayType, optionalReferenceType } from "./utilities/customTypes"
import getValue from "get-value"

const model = {
  name: "State",
  projects: optionalArrayType(Project),
  activeProject: optionalReferenceType(Project),
}

const actions = (self) => {
  const createProject = (data) => Project.create(data)
  const addProject = (project) => self.projects.push(project)
  const createAndAddProject = (data) => addProject(createProject(data))

  const setActiveProject = (uid) => {
    self.activeProject = self.projects.find((project) => project.uid === uid)
  }

  return {
    createProject,
    addProject,
    createAndAddProject,
    setActiveProject,
    afterCreate() {},
  }
}

const views = (self) => {
  return {
    get projectCount() {
      return self.projects.length
    },

    get activeComponent() {
      return getValue(self.activeProject, "activeComponent")
    },
  }
}

export const State = types.model(model).actions(actions).views(views)
