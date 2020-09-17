import { Color } from "./Color"
import { Colors } from "./Colors"
import { Component } from "./Component"
import { Element } from "./Element"
import { Project } from "./Project"
import { State } from "./State"
import { Style } from "./Style"
import { actionLoggerMiddleware } from "./utilities/actionLoggerMiddleware"

export const Models = {
  State,
  Project,
  Component,
  Element,
  Colors,
  Color,
  Style,
}

const createDevAppState = () => {
  const appState = State.create({
    projects: [
      Project.create({
        uid: "project12345678",
        components: [
          Component.create({
            uid: "component12345678",
            type: "component",
          }),
        ],
      }),
    ],
  })

  actionLoggerMiddleware(appState)

  return appState
}

export const appState =
  process.env.NODE_ENV === "development" ? createDevAppState() : State.create()
