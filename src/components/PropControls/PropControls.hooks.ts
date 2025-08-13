import { useCallback } from "react";

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

  return { handlePropChange } as const;
};
