import React, { memo } from "react";
import type { PropConfigs } from "../../types";
import { PropControl } from "../PropControl";
import { Container } from "./PropControls.styles";
import { usePropControls } from "./PropControls.hooks";

type Props = {
  args: Record<string, any>;
  propConfigs: PropConfigs;
  onArgsChange: (newArgs: Record<string, any>) => void;
};

export const PropControls = memo(
  ({ args, propConfigs, onArgsChange }: Props) => {
    const { handleApplyToAll, handlePropChange } = usePropControls({
      args,
      onArgsChange,
    });

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
