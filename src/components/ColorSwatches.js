import * as React from "react";
import {
  AddIcon,
  Pane,
  Heading,
  Text,
  Paragraph,
  Button,
  Popover,
  Tooltip,
  Position,
} from "evergreen-ui";

import { Icon } from "./Icon";
import { Swatch } from "./Swatch";
import { Store } from "../store";

export const ColorSwatches = (props) => {
  const addNewColor = () => {
    props.addColor({
      category: props.category,
    });
  };

  return (
    <Pane className="ColorSwatches">
      <Text size={500}>{props.title}</Text>
      <Pane marginTop="24px" className="swatchGrid">
        {props.colors.map((color) => (
          <Swatch
            key={color.id}
            color={color}
            category={props.category}
            editColor={props.editColor}
            deleteColor={props.deleteColor}
            duplicateColor={props.duplicateColor}
            isEditable
          />
        ))}

        <Icon
          iconName="AddIcon"
          size={24}
          color="#66788A"
          marginTop="3px"
          onClick={addNewColor}
        />
      </Pane>
    </Pane>
  );
};
