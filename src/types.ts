export interface Result {
  divs: DOMRect[];
  styled: DOMRect[];
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
}
