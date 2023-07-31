import { GoToTimeButton, UpdateTimeButton } from '/src/clips/components';
import { FormField, FormFieldS } from '/src/forms/components/FormField';
import { FieldPropsT, useFieldProps } from '/src/forms/hooks';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { VideoPlayerState } from '/src/videos/VideoPlayerState';

// Import styles
import './TimeField.scss';

type PropsT = Partial<FieldPropsT> & {
  videoPlayerState: VideoPlayerState;
  tabIndex?: number;
  className?: any;
};

export const TimeField = (props: PropsT) => {
  const { videoPlayerState, ...otherProps } = props;

  const fieldProps = useFieldProps({
    ...otherProps,
    fieldType: props.fieldType ?? 'text',
  });

  return (
    <FormField className={cn('TimeField', [props.className])}>
      <div className={cn(L.row.banner())}>
        <input
          {...fieldProps}
          className={cn(FormFieldS.Input(), 'max-w-[128px]')}
        />
        <UpdateTimeButton
          key="1"
          tabIndex={props.tabIndex}
          className={cn(FormFieldS.Button.root(), FormFieldS.Button.gap())}
          videoController={videoPlayerState.videoController}
          fieldName={fieldProps.name}
        />
        <GoToTimeButton
          key="2"
          tabIndex={props.tabIndex}
          className={cn(FormFieldS.Button.root())}
          videoController={videoPlayerState.videoController}
          fieldName={fieldProps.name}
        />
      </div>
    </FormField>
  );
};
