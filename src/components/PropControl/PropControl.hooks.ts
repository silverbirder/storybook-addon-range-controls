import { useState, useEffect, useCallback, useMemo } from "react";
import type { PropConfig } from "../../types";

type Props = {
  value: any;
  config: PropConfig;
  onValueChange: (newValue: any) => void;
};

export const usePropControl = ({ value, config, onValueChange }: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const [displayLimit, setDisplayLimit] = useState(
    value?.length ? Math.min(value.length, 5) : 5,
  );

  const isObjectConfig = useMemo(() => config.type === "object", [config]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (localValue?.length) {
      setDisplayLimit(Math.min(localValue.length, displayLimit));
    }
  }, [localValue, displayLimit]);

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
