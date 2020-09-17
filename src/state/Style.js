import { types } from "mobx-state-tree"

const model = {
  paddingTop: types.optional(types.string, "unset"),
  paddingLeft: types.optional(types.string, "unset"),
  paddingRight: types.optional(types.string, "unset"),
  paddingBottom: types.optional(types.string, "unset"),

  marginTop: types.optional(types.string, "unset"),
  marginLeft: types.optional(types.string, "unset"),
  marginRight: types.optional(types.string, "unset"),
  marginBottom: types.optional(types.string, "unset"),

  minWidth: types.optional(types.string, "50px"),
  width: types.optional(types.string, "auto"),
  maxWidth: types.optional(types.string, "unset"),

  minHeight: types.optional(types.string, "20px"),
  height: types.optional(types.string, "auto"),
  maxHeight: types.optional(types.string, "unset"),

  display: types.optional(types.string, "flex"),
  flexDirection: types.optional(types.string, "row"),
  flexWrap: types.optional(types.string, "nowrap"),
  alignItems: types.optional(types.string, "flex-start"),
  justifyContent: types.optional(types.string, "flex-start"),

  boxShadow: types.optional(types.string, "unset"),
  background: types.optional(types.string, "#ffffff"),

  position: types.optional(types.string, "relative"),
  top: types.optional(types.string, "unset"),
  right: types.optional(types.string, "unset"),
  left: types.optional(types.string, "unset"),
  bottom: types.optional(types.string, "unset"),

  fontFamily: types.optional(types.string, ""),
  fontSize: types.optional(types.string, ""),
  fontWeight: types.optional(types.string, ""),
  letterSpacing: types.optional(types.string, ""),
  color: types.optional(types.string, ""),
  textShadow: types.optional(types.string, ""),
}

const actions = (self) => {
  const setStyle = (key, value) => {
    // const passes = validators[key](value)
    // if (passes) self[key] = value
    self[key] = value
  }

  return {
    setStyle,
  }
}

export const Style = types.model(model).actions(actions)

const isValidPixelValue = (target) => /\d+px/.test(target)
const isValidPercentMatch = (target) => /\d+%/.test(target)
const isAutoMatch = (target) => /(auto)/.test(target)
const isFitContentMatch = (target) => /(fit-content)/.test(target)
const isBlankMatch = (target) => target.length === 0

const onePasses = (fns) => {
  for (const fn of fns) {
    const result = fn()
    if (result) return true
  }
}

const validators = {
  paddingTop(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  paddingRight(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  paddingBottom(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  paddingLeft(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  width(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  height(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  minWidth(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  minHeight(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  maxWidth(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },

  maxHeight(value) {
    return onePasses([
      () => isValidPixelValue(value),
      () => isValidPercentMatch(value),
      () => isAutoMatch(value),
      () => isFitContentMatch(value),
      () => isBlankMatch(value),
    ])
  },
}
