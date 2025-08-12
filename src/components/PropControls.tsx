import React, { memo, useCallback } from "react";
import { styled } from "storybook/theming";
import type { PropConfigs } from "../types";
import { PropControl } from "./PropControl";

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

const Container = styled.div`
  padding: 12px;
`;

const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (typeof obj === "object") {
    const cloned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
};
