import { types, getSnapshot } from "mobx-state-tree"
import { nanoid } from "nanoid"

export const uidType = (prefix) => types.optional(types.identifier, () => `${prefix}${nanoid()}`)

export const nameType = (defaultName) => types.optional(types.string, defaultName)

export const optionalArrayType = (type, defaultArray = []) =>
  types.optional(types.array(type), defaultArray)

export const optionalReferenceType = (type, fallback = null) =>
  types.optional(types.maybeNull(types.reference(type)), fallback)

export const createInPlaceType = (type, options = {}) =>
  types.optional(type, () => type.create(options))
