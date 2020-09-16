import { types, getSnapshot } from "mobx-state-tree"
import { nanoid } from "nanoid"

import { nameType, uidType, optionalArrayType, optionalReferenceType } from "./utilities"

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
