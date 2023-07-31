import TextareaAutosize from 'react-textarea-autosize';
import { FormField, FormFieldL } from '/src/forms/components/FormField';
import { FieldPropsT, useFieldProps } from '/src/forms/hooks';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

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

  return (
    <FormField
      className={cn('MarkdownField', [FormFieldL.input(), props.className])}
    >
      {!props.preview && (
        <TextareaAutosize type="text" {...(fieldProps as any)} />
      )}
      {props.preview && <MarkdownView text={text} />}
    </FormField>
  );
};
