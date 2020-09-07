import React from 'react'
import './styles.css'

import { Button } from 'evergreen-ui'
import { ColorManager } from './components/ColorManager'
import { Store } from './store'

export default function App() {
  const store = Store.useStoreState((store) => ({
    atoms: store.atoms,
  }))

  const actions = Store.useStoreActions((store) => ({
    toggleColorManager: store.toggleColorManager,
    createColor: store.createColor,
  }))

  return (
    <div className="App">
      {store.atoms.length}
      <ColorManager />
      <div className="toolbar">
        <Button onClick={actions.toggleColorManager}>Colors</Button>
      </div>
    </div>
  )
}
