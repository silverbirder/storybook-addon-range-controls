import React, { memo, useCallback } from "react";
import type { PropConfigs } from "../../types";
import { PropControl } from "../PropControl";
import { Container } from "./PropControls.styles";
import { deepClone } from "../../utils/deepClone";

type Props = {
  args: Record<string, any>;
  propConfigs: PropConfigs;
  onArgsChange: (newArgs: Record<string, any>) => void;
};

export const PropControls = memo(
  ({ args, propConfigs, onArgsChange }: Props) => {
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

    return (
      <Container>
        {Object.entries(propConfigs).map(([propKey, config]) => (
          <PropControl
            key={propKey}
            propKey={propKey}
            value={args[propKey]}
            config={config}
            onValueChange={(newValue) => handlePropChange(propKey, newValue)}
            handleApplyToAll={handleApplyToAll}
          />
        ))}
      </Container>
    );
  },
);
