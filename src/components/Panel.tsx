import React, { memo, useCallback } from "react";
import type { StressAddonParameters } from "src/types";
import { AddonPanel } from "storybook/internal/components";
import { useParameter, useArgs } from "storybook/manager-api";
import { useTheme } from "storybook/theming";

import { KEY } from "../constants";
import { PropControls } from "./PropControls";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props) {
  const config = useParameter<StressAddonParameters>(KEY, {});
  const theme = useTheme();
  const [args, updateArgs] = useArgs();
  const handleArgsChange = useCallback(
    (newArgs: Record<string, any>) => {
      updateArgs(newArgs);
    },
    [updateArgs],
  );

  return (
    <AddonPanel {...props}>
      <div id="props" title="Props Stress Test" color={theme.color.primary}>
        {config.propsConfig && (
          <PropControls
            args={args}
            propConfigs={config.propsConfig}
            onArgsChange={handleArgsChange}
          />
        )}
      </div>
    </AddonPanel>
  );
});
