export interface Result {
  divs: DOMRect[];
  styled: DOMRect[];
}

export interface PropConfig {
  type: "string" | "number" | "array" | "object";
  min?: number;
  max?: number;
  step?: number;
  items?: PropConfigs;
  default?: any | ((index: number) => any);
}

export interface PropConfigs {
  [key: string]: PropConfig | PropConfigs;
}

export interface RangeControlsParameters extends PropConfigs {}
