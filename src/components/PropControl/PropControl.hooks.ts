import { useState, useEffect, useCallback, useMemo } from "react";
import type { PropConfig, PropConfigs } from "../../types";

type Props = {
  value: any;
  config: PropConfig | PropConfigs;
  onValueChange: (newValue: any) => void;
};

export const usePropControl = ({ value, config, onValueChange }: Props) => {
  const [localValue, setLocalValue] = useState(value);

  const isObjectConfig = useMemo(
    () => typeof config === "object" && !("type" in config),
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

  return { isObjectConfig, localValue, handleChange } as const;
};
