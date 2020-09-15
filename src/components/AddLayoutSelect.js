import * as React from "react"
import { SelectMenu, Button } from "evergreen-ui"

export const AddLayoutSelect = (props) => {
  const [selected, setSelected] = React.useState()

  return (
    <SelectMenu title='Add Component' options={layouts} selected={selected} onSelect={setSelected}>
      <Button>Add Layout</Button>
    </SelectMenu>
  )
}

const layouts = [
  {
    label: "Grid",
    value: {
      layout: "grid",
    },
  },
  {
    label: "Row",
    value: {
      layout: "row",
    },
  },
  {
    label: "Column",
    value: {
      layout: "column",
    },
  },
]
