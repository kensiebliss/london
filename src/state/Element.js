import { types } from "mobx-state-tree"
import { Style } from "./Style"
import { nameType, uidType } from "./utilities/customTypes"

const model = {
  tag: types.string,
  uid: uidType("element"),
  title: nameType("Element"),
  parentUid: types.optional(types.string, () => "__root"),
  style: types.optional(Style, () => Style.create({})),
  innerText: types.optional(types.string, ""),
  children: types.optional(types.array(types.late(() => Element)), []),
}

const actions = (self) => {
  const setTitle = (title) => (self.title = title)
  const setParentUid = (uid) => (self.parentUid = uid)

  return {
    setTitle,
    setParentUid,
  }
}

export const Element = types.model(model).actions(actions)
