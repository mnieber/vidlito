import TextareaAutosize from 'react-textarea-autosize';
import { FieldPropsT, useFieldProps } from 'src/forms/hooks';
import { MarkdownView } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

// Import styles
import './MarkdownField.scss';

type PropsT = Partial<FieldPropsT> & {
  preview?: boolean;
  className?: any;
};

export const MarkdownField = (props: PropsT) => {
  const { preview, className, ...other } = props;
  const fieldProps = useFieldProps({
    ...other,
    fieldType: props.fieldType ?? 'text',
  });
  const text = (fieldProps as any).value;
  const l = L.FormField;

  return (
    <div
      className={cn(
        'MarkdownField',
        //
        //
        l.root(),
        l.input(),
        props.className
      )}
    >
      {!props.preview && (
        <TextareaAutosize type="text" {...(fieldProps as any)} />
      )}
      {props.preview && <MarkdownView text={text} />}
    </div>
  );
};
