import { appState, Models } from "../"

export const createRowElement = () => {
  const style = Models.Style.create({
    display: "flex",
    flexDirection: "row",
  })

  const element = {
    tag: "div",
    title: "Row Layout",
    style,
  }

  appState.activeComponent.addChildElement(element)
}

export const createTextElement = () => {
  const style = Models.Style.create({
    height: "fit-content",
    width: "fit-content",
  })

  const element = {
    tag: "p",
    title: "Text",
    innerText: "This Text Rocks",
    style,
  }

  appState.activeComponent.addChildElement(element)
}
