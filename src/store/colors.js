import kindOf from "kind-of";
import { nanoid } from "nanoid";
import { thunk, debug, action, createContextStore } from "easy-peasy";
import { getColorInfo } from "../utilities/getColorInfo";
import hexAlpha from 'hex-alpha'

import {
  DEFAULT_BRAND_COLORS,
  DEFAULT_NEUTRAL_COLORS,
  DEFAULT_FUNCTIONAL_COLORS,
  DEFAULT_INTENTFUL_COLORS,
} from "../consts/colors";

export const state = {
  brand: DEFAULT_BRAND_COLORS,
  neutral: DEFAULT_NEUTRAL_COLORS,
  functional: DEFAULT_FUNCTIONAL_COLORS,
  intentful: DEFAULT_INTENTFUL_COLORS,
  other: [],
};

const findById = (list, id) => {
  return list
}

const deleteColor = action((state, { category, id }) => {
  state.colors[category] = state.colors[category].filter((color) => {
    return color.id !== id;
  });
});

const addColor = action((state, { category, title, hex }) => {
  state.colors[category].push({
    id: nanoid(8),
    title,
    hex,
  });
});

const createColor = thunk(
  async (actions, { value, category }, { getState }) => {
    const info = await getColorInfo([value]);

    actions.addColor({
      category,
      ...info,
    });
  }
);

const editColor = action((state, { category, ...color}) => {
  for (const item of state.colors[category]) {
    if (item.id === color.id) {
      Object.assign(item, color)
    }
  }
})

export const actions = {
  deleteColor,
  addColor,
  createColor,
  editColor
};
