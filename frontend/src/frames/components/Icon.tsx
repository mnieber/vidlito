import { cn } from 'src/utils/classnames';
import { ObjT } from 'src/utils/types';
import './Icon.scss';

export const icons: ObjT = {
  'arrow-right': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
    </svg>
  ),
  'cheveron-right': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
    </svg>
  ),
  'cheveron-down': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
    </svg>
  ),
  trash: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
    </svg>
  ),
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
    </svg>
  ),
  pencil: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
    </svg>
  ),
  play: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M4 4l12 6-12 6z" />
    </svg>
  ),
  'play-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM7 6l8 4-8 4V6z" />
    </svg>
  ),
  pause: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
    </svg>
  ),
  plus: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    </svg>
  ),
  reply: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M15 17v-2.99A4 4 0 0 0 11 10H8v5L2 9l6-6v5h3a6 6 0 0 1 6 6v3h-2z" />
    </svg>
  ),
  'triangle-right': (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <polygon points="8 5 13 10 8 15" />
    </svg>
  ),
  'triangle-down': (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5 7 15 7 10 12" />
    </svg>
  ),
};

export type PropsT = {
  name: string;
  onClick?: () => void;
  className?: any;
};

export const Icon = (props: PropsT) => {
  const svg = icons[props.name] ?? <div>`${props.name} not found`</div>;
  return (
    <div className={cn('Icon', props.className)} onClick={props.onClick}>
      {svg}
    </div>
  );
};
