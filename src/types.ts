export interface PropConfig {
  type: "string" | "number" | "boolean" | "array" | "object" | "enum";
  min?: number;
  max?: number;
  step?: number;
  // for string
  defaultChar?: string;
  // for array
  items?: PropConfigs;
  defaultItem?: any | ((index: number) => any);
  // for enum
  selection?: "single" | "multiple";
  options?: string[] | number[] | { label: string; value: any }[];
}

export interface PropConfigs {
  [key: string]: PropConfig | PropConfigs;
}

export interface RangeControlsParameters extends PropConfigs {}
