import * as React from "react";
import hexAlpha from "hex-alpha";
import { useBoolean } from "react-hanger";
import { useDebounce } from "use-debounce";
import { useDebouncedEffect } from "@huse/debounce";

import {
  Pane,
  Heading,
  Text,
  Paragraph,
  Button,
  Popover,
  Tooltip,
  Position,
  TrashIcon,
  DuplicateIcon,
  EditIcon,
  TextInput,
} from "evergreen-ui";

import { Icon } from "./Icon";

import { SketchPicker } from "react-color";

export const Swatch = (props) => {
  const Component = props.kind === "circle" ? CircleSwatch : ButtonSwatch;
  return <Component {...props} />;
};

Swatch.defaultProps = {
  kind: "circle",
  isEditable: true,
};

const ColorPickerPane = (props) => {
  const originalRef = React.useRef(props.color);
  const [hex, setHex] = React.useState(props.color.hex);
  const [debouncedHex] = useDebounce(hex, 750);

  const isHexDirty = hex !== originalRef.current.hex;
  const isTitleDirty = props.color.title !== originalRef.current.title;
  const isDirty = isHexDirty || isTitleDirty;

  const changeColor = () => {
    props.editColor({
      ...props.color,
      category: props.category,
      hex,
    });
  };

  useDebouncedEffect(changeColor, hex, 350);

  const resetChanges = () => {
    setHex(originalRef.current.hex);

    props.editColor({
      category: props.category,
      ...originalRef.current,
    });
  };

  const onTitleChange = (event) => {
    props.editColor({
      ...props.color,
      category: props.category,
      title: event.target.value,
    });
  };

  const onChange = (color) => {
    setHex(hexAlpha(color.hex, color.rgb.a || 1));
  };

  return (
    <Pane flexDirection="column" display="flex">
      <Pane
        padding="16px"
        paddingBottom="4px"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
      >
        <TextInput
          width="50%"
          name="text-input-name"
          value={props.color.title}
          placeholder="title"
          onChange={onTitleChange}
        />
        <Icon
          iconName="TrashIcon"
          title="delete"
          size={16}
          color="#66788A"
          onClick={props.deleteColor}
        />
        <Icon
          onClick={props.duplicateColor}
          iconName="DuplicateIcon"
          title="duplicate"
          size={16}
          color="#66788A"
        />
        <Icon
          iconName="UndoIcon"
          disabled={!isDirty}
          title="undo changes"
          size={16}
          marginRight={8}
          color="#66788A"
          onClick={resetChanges}
        />
      </Pane>
      <SketchPicker width={320} color={hex} onChange={onChange} />
    </Pane>
  );
};

export const CircleSwatch = (props) => {
  const Component = props.isEditable ? Popover : React.Fragment;
  const isColorDeleting = useBoolean(false);
  const isColorPickerPaneOpen = useBoolean(false);
  const isDeleting = isColorDeleting.value;
  const isColorPickerOpen = isColorPickerPaneOpen.value;

  const toggleColorPickerPane = (bool) => {
    if (typeof bool === "boolean") isColorPickerPaneOpen.setValue(bool);
    else
      isColorPickerOpen
        ? isColorPickerPaneOpen.setFalse()
        : isColorPickerPaneOpen.setTrue();
  };

  const deleteColor = () => {
    props.deleteColor({
      category: props.category,
      id: props.color.id,
    });
  };

  const duplicateColor = () => {
    toggleColorPickerPane(false);

    props.duplicateColor({
      category: props.category,
      id: props.color.id,
    });
  };

  const stageDelete = () => {
    isColorDeleting.setTrue();
  };

  React.useEffect(() => {
    isDeleting && setTimeout(deleteColor, 500);
  }, [isDeleting]);

  const animatedStyles = {
    transform: isDeleting ? "scale(0)" : "scale(1)",
    transition: `transform ${isDeleting ? "400ms" : "100ms"} ease 0s`,
  };

  const isPaneShown = isDeleting ? false : isColorPickerOpen;

  return (
    <>
      <Component
        isShown={isPaneShown}
        onClose={() => toggleColorPickerPane(false)}
        shouldCloseOnExternalClick
        content={() => (
          <ColorPickerPane
            {...props}
            duplicateColor={duplicateColor}
            isDeleting={isDeleting}
            deleteColor={stageDelete}
          />
        )}
      >
        <Pane
          title={props.color.title}
          cursor="pointer"
          className="CircleSwatch"
          width="28px"
          height="28px"
          marginRight="8px"
          marginBottom="8px"
          background={props.color.hex}
          borderRadius="50px"
          boxShadow="0px 1px 4px rgba(0,0,0,0.25)"
          {...animatedStyles}
        >
          <Pane
            onClick={toggleColorPickerPane}
            className="innerCircleSwatch"
            background="#0000"
            height="100%"
            width="100%"
            cursor="pointer"
            position="relative"
            outline="none"
            borderRadius="50px"
            boxShadow={`${props.color.hex} 0px 0px 0px 14px inset`}
            transition="box-shadow 100ms ease 0s"
            background={props.color.hex}
          />
        </Pane>
      </Component>
    </>
  );
};

export const ButtonSwatch = (props) => {
  const Component = props.isEditable ? Popover : React.Fragment;

  return (
    <Component content={() => <SketchPicker color={props.color.hex} />}>
      <Tooltip
        content={props.color.title}
        position={Position.TOP}
        key={props.color.hex}
      >
        <Pane
          ref={props.innerRef}
          padding="5px"
          background="#fff"
          borderRadius="1px"
          boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
          display="inline-block"
          cursor="pointer"
        >
          <Pane
            width="36px"
            height="14px"
            borderRadius="2px"
            boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
            background={props.color.hex}
          />
        </Pane>
      </Tooltip>
    </Component>
  );
};
