import * as React from "react";

import { useAsyncNodeModule } from '../utilities/useAsyncNodeModule'

export const Icon = (props) => {
  const { iconName, ...otherProps } = props;

  const Icon = useAsyncNodeModule({
    import: import(`evergreen-ui/commonjs/icons/generated/${iconName}.js`),
    path: `evergreen-ui/commonjs/icons/generated/${iconName}.js`,
    exportName: iconName
  })

  return Icon ? <Icon {...otherProps} /> : null;
};