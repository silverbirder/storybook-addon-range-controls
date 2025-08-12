import React from "react";
import { addons, types } from "storybook/manager-api";

import { Panel } from "./components";
import { ADDON_ID, PANEL_ID } from "./constants";

// Register the addon
addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "My addon",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => <Panel active={active ?? false} />,
  });
});
