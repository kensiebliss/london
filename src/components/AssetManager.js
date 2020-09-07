import * as React from 'react'
import { Pane, Paragraph } from 'evergreen-ui'

import { SideMenu } from './SideMenu'
import { Store } from '../store'

export const AssetManager = (props) => {
  const store = Store.useStoreState((store) => ({
    assets: store.assets,
  }))

  return (
    <SideMenu
      title="Asset Manager"
      toggleStateKey="isAssetManagerShown"
      toggleActionKey="toggleAssetManager"
      buttonText="Asset Manager"
    >
      <Pane background="#F9F9FB" paddingY="24px">
        <Paragraph>Asset Manager...</Paragraph>
      </Pane>
    </SideMenu>
  )
}
