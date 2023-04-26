import { GoToTimeButton, UpdateTimeButton } from 'src/clips/components';
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
    <div className={cn('TimeField', rowBanner, props.className)}>
      <input {...{ ...fieldProps, className: cn('pt-1 pb-2 px-3') }} />
      <UpdateTimeButton
        key="1"
        tabIndex={props.tabIndex}
        className={cn(
          'mr-[2px]',
          'px-2',
          'bg-gray-500 text-blue-50 font-bold rounded-l-lg'
        )}
        videoController={props.videoPlayerState.videoController}
        fieldName={fieldProps.name}
      />
      <GoToTimeButton
        key="2"
        tabIndex={props.tabIndex}
        className={cn(
          'px-2',
          'bg-gray-500 text-blue-50 font-bold rounded-r-lg'
        )}
        videoController={props.videoPlayerState.videoController}
        fieldName={fieldProps.name}
      />
    </div>
  );
};
