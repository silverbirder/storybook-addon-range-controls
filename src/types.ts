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

export type ArrayPropConfig = {
  type: "array";
  min?: number;
  max?: number;
  step?: number;
  items?: PropConfig;
  defaultItem?: any | ((index: number) => any);
};

export type PropConfig =
  | StringPropConfig
  | NumberPropConfig
  | BooleanPropConfig
  | EnumPropConfig
  | ObjectPropConfig
  | ArrayPropConfig;

export interface PropConfigs {
  [key: string]: PropConfig;
}

export interface RangeControlsParameters extends PropConfigs {}
