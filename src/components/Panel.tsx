import React, { Fragment, memo, useCallback, useState } from "react";
import type { Result, StressAddonParameters } from "src/types";
import { AddonPanel, Code } from "storybook/internal/components";
import { Button, Placeholder, TabsState } from "storybook/internal/components";
import { useChannel, useParameter } from "storybook/manager-api";
import { styled, useTheme } from "storybook/theming";

import { EVENTS, KEY } from "../constants";
import { List } from "./List";

interface PanelProps {
  active: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props) {
  const config = useParameter<StressAddonParameters>(KEY, {
    enabled: false,
    message: "No parameters configured",
  });
  const theme = useTheme();

  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [{ divs, styled }, setState] = useState<Result>({
    divs: [],
    styled: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      setState(newResults);
    },
  });

  const fetchData = useCallback(() => {
    emit(EVENTS.REQUEST);
  }, [emit]);

  return (
    <AddonPanel {...props}>
      <TabsState
        initial="overview"
        backgroundColor={theme.background.hoverable}
      >
        <div id="overview" title="Overview" color={theme.color.positive}>
          <Placeholder>
            <Code>
              {typeof config === "string"
                ? config
                : JSON.stringify(config, null, 2)}
            </Code>
            <Fragment>
              <RequestDataButton onClick={fetchData}>
                Request data
              </RequestDataButton>
            </Fragment>
          </Placeholder>
        </div>
        <div
          id="div"
          title={`${divs.length} Divs`}
          color={theme.color.negative}
        >
          {divs.length > 0 ? (
            <Placeholder>
              <p>The following divs have less than 2 childNodes</p>
              <List
                items={divs.map((item, index) => ({
                  title: `item #${index}`,
                  description: JSON.stringify(item, null, 2),
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No divs found</p>
            </Placeholder>
          )}
        </div>
        <div
          id="all"
          title={`${styled.length} All`}
          color={theme.color.warning}
        >
          {styled.length > 0 ? (
            <Placeholder>
              <p>The following elements have a style attribute</p>
              <List
                items={styled.map((item, index) => ({
                  title: `item #${index}`,
                  description: JSON.stringify(item, null, 2),
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No styled elements found</p>
            </Placeholder>
          )}
        </div>
      </TabsState>
    </AddonPanel>
  );
});
