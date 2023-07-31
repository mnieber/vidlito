import { observer } from 'mobx-react-lite';
import { terms } from './terms';
import { withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { MessageCardL } from '/src/frames/components/MessageCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './TermsAndConditionsPage.scss';

export type PropsT = {};

export const DefaultProps = {};

export const TermsAndConditionsPage = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('TermsAndConditionsPage', [
          MessageCardL.root(),
          MessageCardL.wallpaper(),
        ])}
      >
        <div
          className={cn('TermsAndConditionsPage__Body', [
            'p-8',
            'mx-auto',
            'max-w-[800px]',
          ])}
        >
          <MarkdownView text={terms} />
        </div>
      </div>
    );
  }, DefaultProps)
);
