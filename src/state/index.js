import { autorun } from "mobx"
import { getSnapshot } from "mobx-state-tree"
import localForage from "localforage"
import { persist } from "mst-persist"

import { State } from "./State"
import { Project } from "./Project"
import { Component } from "./Component"
import { Element } from "./Element"
import { Colors } from "./Colors"
import { Color } from "./Color"
import { Style } from "./Style"

export const appState = State.create()

export const Models = {
  State,
  Project,
  Component,
  Element,
  Colors,
  Color,
  Style,
}
