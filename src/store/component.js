import { thunk, debug, action, computed } from "easy-peasy"
import { nanoid } from "nanoid"
import * as arrayUtils from "../utilities/array"

// import { A_CONST } from "../consts/component";

const tree = computed([(state) => state.elements], (elements) => {
  const buildTree = (targetElements) => {
    return targetElements.map((element) => {
      const elementChildren = arrayUtils.getChildren(elements, element.uid)

      const children = elementChildren.length ? buildTree(elementChildren) : elementChildren

      return {
        ...element,
        children,
      }
    })
  }

  return buildTree(arrayUtils.filterWhereKeyValue(elements, "parentUid", "root"))
})

const zoomIn = action((state) => {
  const next = state.component.previewSettings.scale + 0.1
  state.component.previewSettings.scale = Number(next.toFixed(1))
})

const zoomOut = action((state) => {
  const next = state.component.previewSettings.scale - 0.1
  state.component.previewSettings.scale = Number(next.toFixed(1))
})

const setPreviewWidth = action((state, width) => {
  state.component.previewSettings.width = width
})

const setPreviewHeight = action((state, height) => {
  state.component.previewSettings.height = height
})

const setPreviewScale = action((state, scale) => {
  state.component.previewSettings.scale = scale
})

const createTextElement = (tag, parentUid) => {
  return {
    tag,
    uid: nanoid(8),
    innerText: "this is some text",
    parentUid,
    style: {
      color: "#000",
      fontWeight: 700,
    },
  }
}

const createBoxElement = (parentUid) => {
  return {
    tag: "div",
    uid: nanoid(8),
    children: [],
    parentUid,
    style: {
      display: "flex",
      width: "90%",
      height: "90%",
    },
  }
}

const addElement = action((state, args) => {
  const selectedUid = state.component.selectedUid

  const newElement =
    args.tag === "p" ? createTextElement(args.tag, selectedUid) : createBoxElement(selectedUid)

  console.log({ selectedUid, newElement })
  state.component.elements.push(newElement)
})

const deleteElement = action((state, uid) => {
  const _uid = uid || state.component.selectedUid
  state.component.elements = arrayUtils.removeById(state.component.elements, _uid)
})

const copyElement = action((state, uid) => {
  const element = arrayUtils.findById(state.component.elements, uid)
  state.component.elements.push({ ...element, uid: nanoid(8) })
})

const selectElement = action((state, element) => {
  state.component.selectedElement = element
  state.component.selectedUid = element.uid
})

const deselectElement = action((state) => {
  state.component.selectedUid = null
})

const setHoverIndicators = action((state, element = {}) => {
  state.component.hoveredElementUid = element.uid
})

export const actions = {
  addElement,
  deleteElement,
  copyElement,
  selectElement,
  deselectElement,
  setHoverIndicators,
  setPreviewWidth,
  setPreviewHeight,
  setPreviewScale,
  zoomIn,
  zoomOut,
}

export const state = {
  hoveredElementUid: "",
  selectedElement: { uid: "root" },
  selectedUid: "root",
  elements: [],

  previewSettings: {
    boxShadow: "0px 2px 24px -4px rgba(0,0,0,0.15)",
    background: "#ffffff",
    width: 980,
    height: 1200,
    scale: 1,
  },

  tree,
}
