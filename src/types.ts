export type StringPropConfig = {
  type: "string";
  min?: number;
  max?: number;
  step?: number;
  defaultChar?: string;
};

export type NumberPropConfig = {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
};

export type ArrayPropConfig = {
  type: "array";
  min?: number;
  max?: number;
  step?: number;
  items?: PropConfig;
  defaultItem?: any | ((index: number) => any);
};

export type BooleanPropConfig = {
  type: "boolean";
};

export type EnumPropConfig = {
  type: "enum";
  selection?: "single" | "multiple";
  options?: string[] | number[] | { label: string; value: any }[];
};

export type ObjectPropConfig = {
  type: "object";
} & {
  [K in string as K extends "type" ? never : K]: PropConfig;
};

export type ImagePropConfig = {
  type: "image";
  width?: {
    min?: number;
    default?: number;
    max?: number;
    step?: number;
  };
  height?: {
    min?: number;
    default?: number;
    max?: number;
    step?: number;
  };
  src?: ({ width, height }: { width?: number; height?: number }) => string;
};

export type PropConfig =
  | StringPropConfig
  | NumberPropConfig
  | ArrayPropConfig
  | BooleanPropConfig
  | EnumPropConfig
  | ObjectPropConfig
  | ImagePropConfig;

export type PropConfigs = {
  [key: string]: PropConfig;
};

export type RangeControlsParameters = PropConfigs;
