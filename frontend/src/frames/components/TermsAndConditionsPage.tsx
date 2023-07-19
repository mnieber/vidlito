import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { WallPaperCardL } from '/src/frames/components/WallPaperCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './TermsAndConditionsPage.scss';

export type PropsT = {};

export const DefaultProps = {};

export const TermsAndConditionsPage = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('TermsAndConditionsPage', [], [WallPaperCardL.root()])}
      >
        Hello
      </div>
    );
  }, DefaultProps)
);
