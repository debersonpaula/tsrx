/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg' {
  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare function __non_webpack_require__(filename: string): any;

declare function __webpack_init_sharing__(env: string): void;

declare const __webpack_share_scopes__: {
  default: any;
};
