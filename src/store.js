import { debug, action, createContextStore } from 'easy-peasy'
import kindOf from 'kind-of'
import * as colors from './store/colors'

// Used for toggling all the different boolean
// states held in the store.
const toggleStateBoolean = (key) => {
  return action((state, args) => {
    const isBoolean = kindOf(args) === 'boolean'
    const value = isBoolean ? args : !state[key]
    state[key] = value
  })
}

export const Store = createContextStore({
  atoms: [],
  molecules: [],
  organisms: [],
  
  colors: colors.state,
  ...colors.actions,

  fonts: [],
  assets: [],
  component: null,

  isColorManagerDirty: false,
  isColorManagerShown: false,
  isElementManagerShown: false,
  isElementManagerDirty: false,
  isAssetManagerShown: false,
  isAssetManagerDirty: false,
  isFontManagerShown: false,
  isFontManagerDirty: false,

  toggleColorManager: toggleStateBoolean('isColorManagerShown'),
  toggleElementManager: toggleStateBoolean('isElementManagerShown'),
  toggleAssetManager: toggleStateBoolean('isAssetManagerShown'),
  toggleFontManager: toggleStateBoolean('isFontManagerShown'),
})