/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module '*.tsx' {
  import React from 'react';
  const content: React.ComponentType<any>;
  export default content;
}
