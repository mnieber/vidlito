import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { terms } from './terms';
import { MarkdownView } from '/src/frames/components';
import { MessageCard } from '/src/frames/components/MessageCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './TermsAndConditionsPage.scss';

export type PropsT = {};

export const ContextProps = {};

export const TermsAndConditionsPage = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <MessageCard className={cn('TermsAndConditionsPage')} wallPaper={true}>
        <div
          className={cn('TermsAndConditionsPage__Body', [
            'p-8',
            'mx-auto',
            'max-w-[800px]',
          ])}
        >
          <MarkdownView text={terms} />
        </div>
      </MessageCard>
    );
  }, ContextProps)
);
