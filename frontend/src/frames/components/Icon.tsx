import { cn } from 'src/utils/classnames';
import { ObjT } from 'src/utils/types';

// Import styles
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
  radioButtonOff: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
    >
      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
      <path d="M0 0h48v48H0z" fill="none" />
    </svg>
  ),
  radioButtonOn: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
    >
      <path d="M24 14c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0-10C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
      <path d="M0 0h48v48H0z" fill="none" />
    </svg>
  ),
  reply: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M15 17v-2.99A4 4 0 0 0 11 10H8v5L2 9l6-6v5h3a6 6 0 0 1 6 6v3h-2z" />
    </svg>
  ),
  signIn: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.0222 21.4135 8.08879 20.3147 6.4443C19.2159 4.79981 17.6541 3.51808 15.8268 2.76121C13.9996 2.00433 11.9889 1.8063 10.0491 2.19215C8.10929 2.578 6.32746 3.53041 4.92893 4.92893"
        stroke="#33363F"
        stroke-width="2"
      />
      <path
        d="M15 12L15.7809 11.3753L16.2806 12L15.7809 12.6247L15 12ZM3 13C2.44771 13 2 12.5523 2 12C2 11.4477 2.44771 11 3 11V13ZM11.7809 6.3753L15.7809 11.3753L14.2191 12.6247L10.2191 7.6247L11.7809 6.3753ZM15.7809 12.6247L11.7809 17.6247L10.2191 16.3753L14.2191 11.3753L15.7809 12.6247ZM15 13H3V11H15V13Z"
        fill="#33363F"
      />
    </svg>
  ),
  signOut: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 18.9282C9.21615 19.6303 10.5957 20 12 20C13.4043 20 14.7838 19.6303 16 18.9282C17.2162 18.2261 18.2261 17.2162 18.9282 16C19.6303 14.7838 20 13.4043 20 12C20 10.5957 19.6303 9.21615 18.9282 8C18.2261 6.78385 17.2162 5.77394 16 5.0718C14.7838 4.36965 13.4043 4 12 4C10.5957 4 9.21615 4.36965 8 5.0718"
        stroke="#33363F"
        stroke-width="2"
      />
      <path
        d="M2 12L1.21913 11.3753L0.719375 12L1.21913 12.6247L2 12ZM11 13C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11V13ZM5.21913 6.3753L1.21913 11.3753L2.78087 12.6247L6.78087 7.6247L5.21913 6.3753ZM1.21913 12.6247L5.21913 17.6247L6.78087 16.3753L2.78087 11.3753L1.21913 12.6247ZM2 13H11V11H2V13Z"
        fill="#33363F"
      />
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
