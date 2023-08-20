import { ToolButtonS } from '/src/frames/components/ToolButton/ToolButton';
import { cn } from '/src/utils/classnames';

export const ModestToolButtonTrim = {
  componentName: 'Modest-ToolButton',

  base: {
    root: () => cn(ToolButtonS.color.gray()),
    Icon: () =>
      cn(
        ToolButtonS.Icon.size.medium(),
        ToolButtonS.Icon.margin.none(),
        ToolButtonS.Icon.color.grayFill()
      ),
  },
  disabled: {
    root: () => cn(ToolButtonS.color.grayDisabled()),
    Icon: () => cn(ToolButtonS.Icon.color.grayFillDisabled()),
  },
};
