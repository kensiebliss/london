import { debug, action, computed, createContextStore } from "easy-peasy"
import kindOf from "kind-of"
import { createUid } from "../utilities/createUid"
import { minMax } from "../utilities/minMax"

import {
  DEFAULT_BRAND_COLORS,
  DEFAULT_NEUTRAL_COLORS,
  DEFAULT_FUNCTIONAL_COLORS,
  DEFAULT_INTENTFUL_COLORS,
} from "../consts/colors"

const zoomMinMax = minMax(0.1, 2.0)

const findById = (list = [], id) => {
  return list.find((item) => item.id === id || item.uid === id)
}

const getTopLevelElements = (state) => {
  return state.editor.component.elements.list.filter((element) => {
    return element.parentUid === state.elements.root.uid
  })
}

const getElementChildren = (state, parentUid) => {
  return state.editor.component.elements.list.filter((element) => {
    return element.parentUid === parentUid
  })
}

// state.editor.component.elements.root
// state.editor.component.elements.list
// state.editor.component.elements.tree
// state.editor.component.elements.selection
// state.editor.component.elements.selection.selectedElementUid

export const Store = createContextStore({
  project: {
    colors: {
      brand: DEFAULT_BRAND_COLORS,
      neutral: DEFAULT_NEUTRAL_COLORS,
      functional: DEFAULT_FUNCTIONAL_COLORS,
      intentful: DEFAULT_INTENTFUL_COLORS,
      other: [],
      isColorManagerDirty: false,
      isColorManagerShown: false,

      addColor: action((state, args) => {
        const { category, title = "new color", hex = "#1070CA" } = args

        state.project.colors[category].push({
          id: createUid(),
          title,
          hex,
        })
      }),

      deleteColor: action((state, args) => {
        const { category, id } = args
        const categoryColors = state.project.colors[category]

        state.project.colors[category] = categoryColors.filter((color) => {
          return color.uid !== id
        })
      }),

      editColor: action((state, args) => {
        const { category, ...color } = args
        const categoryColors = state.project.colors[category]

        for (const item of categoryColors) {
          if (item.uid === color.uid) {
            Object.assign(item, color)
            break
          }
        }
      }),

      duplicateColor: action((state, args) => {
        const { category, id } = args
        const categoryColors = state.project.colors[category]

        const target = findById(categoryColors, id)

        state.project.colors[category].push({
          ...target,
          uid: createUid(),
        })
      }),
    },
  },

  editor: {
    isElementManagerShown: false,
    isElementManagerDirty: false,
    isAssetManagerShown: false,
    isAssetManagerDirty: false,
    isFontManagerShown: false,
    isFontManagerDirty: false,

    component: {
      uid: null,
      type: null,
      name: null,

      setEditorComponentName: action((state, value) => {
        state.editor.component.name = value
      }),

      setEditorComponentType: action((state, type) => {
        state.editor.component.type = type
      }),

      elements: {
        root: {
          uid: "__root",
          width: "980px",
          height: "1200px",
          padding: "0px 0px 0px 0px",
        },

        list: [],

        // When state.editor.component.elements.list changes,
        // this auto-generates a new element tree.
        tree: computed((state) => {
          const buildTree = (targetElements) => {
            return targetElements.map((element) => {
              const elementChildren = getElementChildren(state, element.uid)
              const children = elementChildren.length ? buildTree(elementChildren) : elementChildren
              return { ...element, children }
            })
          }

          const topLevelElements = getTopLevelElements(state)
          return buildTree(topLevelElements)
        }),

        // Add an element to state.editor.component.elements.list.
        addElement: action((state, element) => {
          state.editor.component.elements.list.push(element)
        }),

        updateElementStyles: action((state, [uid, change]) => {
          const element = findById(state.editor.component.elements.list, uid)
          element.style = {
            ...element.style,
            ...change,
          }
        }),

        selection: {
          selectedElementUid: "",

          // When state.selection.selectedElementUid changes,
          // this auto-updates to reference the correct element.
          selectedElement: computed((state) => {
            return state.elements.find((element) => {
              return element.uid === state.selection.selectedElementUid
            })
          }),

          // Sets state.selection.selectedElementUid
          selectElementByUid: action((state, uid) => {
            state.selection.selectedElementUid = uid
          }),

          // Returns state.selection.selectedElementUid to
          // reference the root element.
          deselectElement: action((state) => {
            const rootUid = state.elements.root.uid
            state.selection.selectedElementUid = rootUid
          }),
        },
      },
    },

    zoom: {
      scale: 1,

      // Increment state.zoom.scale by 0.1.
      zoomIn: action((state) => {
        const newValue = zoomMinMax(state.zoom.scale + 0.1)
        state.zoom.scale = newValue
      }),

      // Decrement state.zoom.scale by 0.1.
      zoomOut: action((state) => {
        const newValue = zoomMinMax(state.zoom.scale - 0.1)
        state.zoom.scale = newValue
      }),
    },
  },
})
