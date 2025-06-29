import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

declare module '*.tsx' {
  import { ComponentType } from 'react';
  const content: ComponentType<unknown>;
  export default content;
}
