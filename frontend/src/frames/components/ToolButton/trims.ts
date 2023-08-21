import {
  DefaultToolButtonTrim,
  ToolButtonS,
} from '/src/frames/components/ToolButton';
import { createTrim } from '/src/utils/trim';

export const ModestToolButtonTrim = createTrim(DefaultToolButtonTrim, {
  base: {
    componentName: 'Modest-ToolButton',
    root: {},
    Icon: {
      margin: ToolButtonS.Icon.margin.none(),
      color: ToolButtonS.Icon.color.grayFill(),
    },
  },
  disabled: {
    root: {
      color: ToolButtonS.color.grayDisabled(),
    },
    Icon: {
      color: ToolButtonS.Icon.color.grayFillDisabled(),
    },
  },
});
