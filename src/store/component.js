import { thunk, debug, action } from "easy-peasy"
import { nanoid } from "nanoid"
import * as arrayUtils from "../utilities/array"

// import { A_CONST } from "../consts/component";

export const state = {
  tree: {},
  selectedElement: "root",
  elements: [],
  previewSettings: {
    boxShadow: "0px 2px 24px -4px rgba(0,0,0,0.15)",
    background: "#ffffff",
    width: 600,
    height: 400,
    scale: 1,
  },
}

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

const createTextStyle = () => {
  return {
    color: "#000",
    fontWeight: 700,
  }
}

const createBoxStyle = () => {
  return
}

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
  const selectedElement = state.component.selectedElement

  state.component.elements.push(
    args.tag === "p"
      ? createTextElement(args.tag, selectedElement)
      : createBoxElement(selectedElement)
  )
})

const deleteElement = action((state, uid) => {
  const _uid = uid || state.component.selectedElement
  state.component.elements = arrayUtils.removeById(state.component.elements, _uid)
})

const copyElement = action((state, uid) => {
  const element = arrayUtils.findById(state.component.elements, uid)
  state.component.elements.push({ ...element, uid: nanoid(8) })
})

const selectElement = action((state, uid) => {
  console.log("selecting", uid)
  state.component.selectedElement = uid
})

const deselectElement = action((state) => {
  state.component.selectedElement = null
})

export const actions = {
  addElement,
  deleteElement,
  copyElement,
  selectElement,
  deselectElement,
  setPreviewWidth,
  setPreviewHeight,
  setPreviewScale,
  zoomIn,
  zoomOut,
}
