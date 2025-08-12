import React, { memo, useCallback, useState } from "react";
import type { RangeControlsParameters } from "src/types";
import { AddonPanel } from "storybook/internal/components";
import { useParameter, useArgs, useChannel } from "storybook/manager-api";
import { useTheme } from "storybook/theming";

import { KEY, EVENTS } from "../../constants";
import { PropControls } from "../PropControls";
import { reviveFunctions } from "../../utils/serialize";

type Props = {
  active: boolean;
};

export const Panel = memo((props: Props) => {
  const config = useParameter<RangeControlsParameters>(KEY, {});
  const theme = useTheme();
  const [args, updateArgs] = useArgs();

  const [syncedParams, setSyncedParams] = useState<
    RangeControlsParameters | undefined
  >(undefined);

  useChannel({
    [EVENTS.PARAMETERS_SYNC]: (serialized: string) => {
      try {
        const parsed = JSON.parse(serialized);
        const revived = reviveFunctions<RangeControlsParameters>(parsed);
        setSyncedParams(revived);
      } catch (e) {
        console.error("Failed to deserialize parameters", e);
      }
    },
  });

  const handleArgsChange = useCallback(
    (newArgs: Record<string, any>) => {
      updateArgs(newArgs);
    },
    [updateArgs],
  );

  const effective = {
    ...(config || {}),
    ...(syncedParams || {}),
  } as RangeControlsParameters;

  return (
    <AddonPanel {...props}>
      <div color={theme.color.primary}>
        {effective.propsConfig && args && (
          <PropControls
            args={args}
            propConfigs={effective.propsConfig}
            onArgsChange={handleArgsChange}
          />
        )}
      </div>
    </AddonPanel>
  );
});
