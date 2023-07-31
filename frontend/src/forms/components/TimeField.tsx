import { GoToTimeButton, UpdateTimeButton } from '/src/clips/components';
import { FormField, FormFieldL } from '/src/forms/components/FormField';
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
          className={cn(FormFieldL.input(), 'max-w-[128px]')}
        />
        <UpdateTimeButton
          key="1"
          tabIndex={props.tabIndex}
          className={cn(FormFieldL.button.root(), FormFieldL.button.gap())}
          videoController={videoPlayerState.videoController}
          fieldName={fieldProps.name}
        />
        <GoToTimeButton
          key="2"
          tabIndex={props.tabIndex}
          className={cn(FormFieldL.button.root())}
          videoController={videoPlayerState.videoController}
          fieldName={fieldProps.name}
        />
      </div>
    </FormField>
  );
};
