export interface Result {
  divs: DOMRect[];
  styled: DOMRect[];
}

export interface PropConfig {
  type: "string" | "number" | "boolean" | "array" | "object";
  min?: number;
  max?: number;
  step?: number;
  length?: number;
  items?: PropConfigs;
  defaultItem?: any | ((index: number) => any);
}

export interface PropConfigs {
  [key: string]: PropConfig | PropConfigs;
}

export interface StressAddonParameters {
  propsConfig?: PropConfigs;
}
