import { GoToTimeButton, UpdateTimeButton } from 'src/clips/components';
import { FormField_ } from 'src/forms/components/FormField';
import { FieldPropsT, useFieldProps } from 'src/forms/hooks';
import { rowBanner } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { VideoPlayerState } from 'src/videos/VideoPlayerState';
import './TimeField.scss';

type PropsT = Partial<FieldPropsT> & {
  videoPlayerState: VideoPlayerState;
  tabIndex?: number;
  className?: any;
};

export const TimeField = (props: PropsT) => {
  const fieldProps = useFieldProps({
    ...props,
    fieldType: props.fieldType ?? 'text',
  });

  return (
    <div className={cn('TimeField', FormField_.root, props.className)}>
      <div className={cn(rowBanner)}>
        <input {...fieldProps} className={FormField_.input} />
        <UpdateTimeButton
          key="1"
          tabIndex={props.tabIndex}
          className={cn(
            'mr-[2px]',
            'px-2',
            'bg-gray-100 font-bold text-primaryTeal m-0.5 rounded-l-lg'
          )}
          videoController={props.videoPlayerState.videoController}
          fieldName={fieldProps.name}
        />
        <GoToTimeButton
          key="2"
          tabIndex={props.tabIndex}
          className={cn(
            'px-2',
            'bg-gray-100 font-bold text-primaryTeal m-0.5 rounded-r-lg'
          )}
          videoController={props.videoPlayerState.videoController}
          fieldName={fieldProps.name}
        />
      </div>
    </div>
  );
};
