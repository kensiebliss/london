import { nanoid } from "nanoid";
import { thunk, debug, action } from "easy-peasy";
import { getColorInfo } from "../utilities/getColorInfo";

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
  return list.find((item) => item.id === id);
};

const deleteColor = action((state, args) => {
  const { category, id } = args;

  state.colors[category] = state.colors[category].filter((color) => {
    return color.id !== id;
  });
});

const addColor = action((state, args) => {
  const { category, title = "new color", hex = "#1070CA" } = args;

  state.colors[category].push({
    id: nanoid(8),
    title,
    hex,
  });
});

const duplicateColor = action((state, args) => {
  const { category, id } = args;
  const target = findById(state.colors[category], id);

  state.colors[category].push({
    ...target,
    id: nanoid(8),
  });
});

const createColor = thunk(async (actions, args) => {
  const { value, category } = args;
  const info = await getColorInfo([value]);

  actions.addColor({
    category,
    ...info,
  });
});

const editColor = action((state, args) => {
  const { category, ...color } = args;

  for (const item of state.colors[category]) {
    if (item.id === color.id) {
      Object.assign(item, color);
      break;
    }
  }
});

export const actions = {
  deleteColor,
  addColor,
  createColor,
  editColor,
  duplicateColor,
};
