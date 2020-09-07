import * as React from "react"
import { SelectMenu, Button } from "evergreen-ui"

export const AddComponentSelect = (props) => {
  const [selected, setSelected] = React.useState()

  return (
    <SelectMenu
      title='Add Component'
      options={[{ label: "Heading1", value: () => <h1>heading 1</h1> }]}
      selected={selected}
      onSelect={setSelected}
    >
      <Button>ADD COMPONENT</Button>
    </SelectMenu>
  )
}
