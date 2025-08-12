import { useCallback } from "react";
import { deepClone } from "../../utils/deepClone";

type Props = {
  args: Record<string, any>;
  onArgsChange: (newArgs: Record<string, any>) => void;
};

export const usePropControls = ({ args, onArgsChange }: Props) => {
  const handlePropChange = useCallback(
    (propKey: string, newValue: any) => {
      const newArgs = { ...args, [propKey]: newValue };
      onArgsChange(newArgs);
    },
    [args, onArgsChange],
  );

  const handleApplyToAll = useCallback(
    (sourceIndex: number, propKey: string) => {
      const currentArray = Array.isArray(args[propKey]) ? args[propKey] : [];
      if (sourceIndex >= 0 && sourceIndex < currentArray.length) {
        const template = deepClone(currentArray[sourceIndex]);
        const newArray = Array.from({ length: currentArray.length }, () =>
          deepClone(template),
        );
        handlePropChange(propKey, newArray);
      }
    },
    [args, handlePropChange],
  );

  return { handleApplyToAll, handlePropChange } as const;
};
