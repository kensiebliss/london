import { types, getSnapshot } from "mobx-state-tree"

import { Color } from "./Color"

import {
  nameType,
  uidType,
  optionalArrayType,
  createInPlaceType,
  optionalReferenceType,
} from "./utilities"

import {
  DEFAULT_BRAND_COLORS,
  DEFAULT_NEUTRAL_COLORS,
  DEFAULT_FUNCTIONAL_COLORS,
  DEFAULT_INTENTFUL_COLORS,
} from "../consts/colors"

const model = {
  uid: uidType("colors"),
  brand: optionalArrayType(Color, DEFAULT_BRAND_COLORS),
  neutral: optionalArrayType(Color, DEFAULT_NEUTRAL_COLORS),
  functional: optionalArrayType(Color, DEFAULT_FUNCTIONAL_COLORS),
  intentful: optionalArrayType(Color, DEFAULT_INTENTFUL_COLORS),
  other: optionalArrayType(Color, []),
}

const actions = (self) => {
  return {
    afterCreate() {},
  }
}

export const Colors = types.model(model).actions(actions)
