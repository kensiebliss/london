import findReplace from "find-replace";

const matchesId = (item, id) => {
  return item.id === id || item.uid === id;
};

const doesntMatchId = (item, id) => {
  return !matchesId(item, id);
};

export const findById = (list, id) => {
  return list.find((item) => {
    return matchesId(item, id);
  });
};

export const removeById = (list, id) => {
  return list.filter((item) => {
    return doesntMatchId(item, id);
  });
};

export const replaceById = (list, id, replacement) => {
  return findReplace(list, (item) => matchesId(item, id), replacement);
};
