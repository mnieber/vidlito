import { observer } from 'mobx-react-lite';
import { ActionListView } from '/src/actions/components/ActionListView';
import { ActionsBar } from '/src/actions/components/ActionsBar';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { PageNav } from '/src/frames/components/PageNav';
import { L } from '/src/frames/layout';
import { foo } from '/src/utils/classnames';

// Import styles
import './ActionsView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.actionsPagination,
};

export const ActionsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      /*
      🔳 ActionsView 🔳
      */
      <div
        className={foo({
          component: ['ActionsView'],
          adhoc: [L.col.banner(), 'grow', props.className],
        })}
      >
        {/*
        🔳 ActionsBar 🔳
         */}
        <ActionsBar className="mb-4" />

        {/*
        🔳 ActionListView 🔳
        */}
        <ActionListView />

        {/*
        🔳 PageNav 🔳
        */}
        {props.actionsPagination.nrOfPages > 1 && (
          <PageNav pagination={props.actionsPagination} className="mt-8" />
        )}
      </div>
    );
  }, DefaultProps)
);
