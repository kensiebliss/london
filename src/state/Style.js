import { types } from "mobx-state-tree"

export const Style = types.model({
  paddingTop: types.optional(types.string, "0px"),
  paddingLeft: types.optional(types.string, "0px"),
  paddingRight: types.optional(types.string, "0px"),
  paddingBottom: types.optional(types.string, "0px"),

  marginTop: types.optional(types.string, "0px"),
  marginLeft: types.optional(types.string, "0px"),
  marginRight: types.optional(types.string, "0px"),
  marginBottom: types.optional(types.string, "0px"),

  minWidth: types.optional(types.string, "250px"),
  width: types.optional(types.string, "250px"),
  maxWidth: types.optional(types.string, "250px"),

  minHeight: types.optional(types.string, "250px"),
  height: types.optional(types.string, "250px"),
  maxHeight: types.optional(types.string, "250px"),

  display: types.optional(types.string, "flex"),
  flexDirection: types.optional(types.string, "row"),
  flexWrap: types.optional(types.string, "nowrap"),

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
})

Style.actions((self) => {
  const setStyle = (key, value) => (self[key] = value)

  return {
    setStyle,
  }
})
