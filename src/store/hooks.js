import Store from "./store"

export const useRootElement = () => {
  const { rootElement } = Store.useStoreState((state) => ({
    rootElement: state.editor.component.elements.root,
  }))

  return rootElement
}

export const useElementList = () => {
  const { elementList } = Store.useStoreState((state) => ({
    elementList: state.editor.component.elements.list,
  }))

  return elementList
}

export const useElementTree = () => {
  const { elementTree } = Store.useStoreState((state) => ({
    elementTree: state.editor.component.elements.tree,
  }))

  return elementTree
}

export const useSelectedElement = () => {
  const { selectedElement } = Store.useStoreState((state) => ({
    selectedElement: state.editor.component.elements.selection.selectedElement,
  }))

  return selectedElement
}
