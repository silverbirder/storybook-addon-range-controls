export interface Result {
  divs: DOMRect[];
  styled: DOMRect[];
}

export interface PropConfig {
  type: "string" | "number" | "boolean" | "array" | "object";
  min?: number;
  max?: number;
  step?: number;
  length?: number; // for strings and arrays
  items?: PropConfigs; // for defining structure of array items
}

export interface PropConfigs {
  [key: string]: PropConfig | PropConfigs;
}

export interface StressAddonParameters {
  /**
   * Enable or disable the stress addon for this story
   */
  enabled?: boolean;
  /**
   * Custom message to display in the addon panel
   */
  message?: string;
  /**
   * Number of stress test iterations
   */
  iterations?: number;
  /**
   * Delay between iterations in milliseconds
   */
  delay?: number;
  /**
   * Configuration for props stress testing
   */
  propsConfig?: PropConfigs;
}
