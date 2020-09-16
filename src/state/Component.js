import { types, getSnapshot } from "mobx-state-tree"

import { Element } from "./Element"

import {
  nameType,
  uidType,
  optionalArrayType,
  createInPlaceType,
  optionalReferenceType,
} from "./utilities"

const model = {
  type: types.optional(types.string, "component"),
  uid: uidType("component"),
  title: nameType("My Component"),
  elements: optionalArrayType(Element),
  selectedElement: optionalReferenceType(Element),
  zoom: types.optional(types.number, 1.0),
}

const actions = (self) => {
  const setTitle = (title) => (self.title = title)
  const createElement = (data) => Element.create(data)
  const addElement = (element) => self.elements.push(element)
  const setSelectedElement = (element) => (self.selectedElement = element)
  const deselectElement = () => (self.selectedElement = null)
  const zoomIn = () => (self.zoom = Number(Number.parseFloat(self.zoom + 0.1).toFixed(1)))
  const zoomOut = () => (self.zoom = Number(Number.parseFloat(self.zoom - 0.1).toFixed(1)))

  const addChildElement = (data) => {
    const element = self.createElement(data)
    self.selectedElement.children.push(element)
  }

  const prepareRootElement = () => {
    const rootElement = self.createElement({
      uid: self.uid + "__root",
      tag: "div",
    })

    self.elements.push(rootElement)
    self.setSelectedElement(rootElement)
  }

  return {
    setTitle,
    createElement,
    addElement,
    setSelectedElement,
    deselectElement,
    addChildElement,
    prepareRootElement,
    zoomIn,
    zoomOut,

    afterCreate() {
      prepareRootElement()
    },
  }
}

export const Component = types.model(model).actions(actions)
