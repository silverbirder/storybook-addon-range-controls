import { useState, useEffect, useCallback, useMemo } from "react";
import type { PropConfig, PropConfigs } from "../../types";

type Props = {
  value: any;
  config: PropConfig | PropConfigs;
  onValueChange: (newValue: any) => void;
};

export const usePropControl = ({ value, config, onValueChange }: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const [displayLimit, setDisplayLimit] = useState(5);

  const isObjectConfig = useMemo(
    () => "type" in config && config.type === "object",
    [config],
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (newValue: any) => {
      setLocalValue(newValue);
      onValueChange(newValue);
    },
    [onValueChange],
  );

  const handleDisplayLimitChange = useCallback((newLimit: number) => {
    setDisplayLimit(Math.max(1, newLimit || 1));
  }, []);

  return {
    isObjectConfig,
    localValue,
    handleChange,
    displayLimit,
    handleDisplayLimitChange,
  } as const;
};
