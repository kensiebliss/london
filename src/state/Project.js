import { types, getSnapshot } from "mobx-state-tree"

import { Component } from "./Component"
import { Colors } from "./Colors"

import {
  nameType,
  uidType,
  optionalArrayType,
  createInPlaceType,
  optionalReferenceType,
} from "./utilities"

const model = {
  uid: uidType("project"),
  title: nameType("My Project"),
  components: optionalArrayType(Component),
  colors: createInPlaceType(Colors),
  activeComponent: optionalReferenceType(Component),
}

const actions = (self) => {
  const setTitle = (title) => (self.title = title)
  const createComponent = (data) => Component.create(data)
  const addComponent = (component) => self.components.push(component)
  const createPageComponent = (data) => self.createComponent({ ...data, type: "page" })
  const createAndAddComponent = (data) => self.addComponent(self.createComponent(data))

  const setActiveComponent = (uid) => {
    self.activeComponent = self.components.find((component) => {
      return component.uid === uid
    })
  }

  return {
    setTitle,
    createComponent,
    addComponent,
    createPageComponent,
    createAndAddComponent,
    setActiveComponent,

    afterCreate() {},
  }
}

const views = (self) => {
  return {
    get componentCount() {
      return self.components.length
    },
  }
}

export const Project = types.model(model).actions(actions).views(views)
