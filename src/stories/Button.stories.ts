import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    range: {
      label: {
        type: "string",
        min: 1,
        max: 20,
        step: 1,
  defaultChar: "·",
      },
      primary: {
        type: "boolean",
      },
      size: {
        type: "enum",
        selection: "single",
        options: ["small", "medium", "large"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: "Button",
  },
};
