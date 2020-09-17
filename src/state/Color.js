import { types } from "mobx-state-tree"
import { uidType } from "./utilities/customTypes"

const model = {
  uid: uidType("color"),
  title: types.string,
  hex: types.string,
}

const actions = (self) => {
  const setName = (name) => (self.name = name)
  const setHex = (hex) => (self.hex = hex)

  return {
    setName,
    setHex,
    afterCreate() {},
  }
}

export const Color = types.model(model).actions(actions)
