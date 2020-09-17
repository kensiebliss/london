import { types } from "mobx-state-tree"

import {
  DEFAULT_BRAND_COLORS,
  DEFAULT_FUNCTIONAL_COLORS,
  DEFAULT_INTENTFUL_COLORS,
  DEFAULT_NEUTRAL_COLORS,
} from "../consts/colors"

import { Color } from "./Color"
import { optionalArrayType, uidType } from "./utilities/customTypes"

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
