import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import { fn } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
  parameters: {
    "my-addon": {
      enabled: true,
      message: "Default stress test configuration",
      iterations: 5,
      delay: 100,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: "Button",
  },
  parameters: {
    "my-addon": {
      enabled: true,
      message: "Primary button stress test",
      iterations: 10,
      delay: 50,
    },
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    "my-addon": {
      enabled: false,
      message: "Secondary button - stress test disabled",
    },
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
  parameters: {
    "my-addon": {
      enabled: true,
      message: "Large button stress test with custom settings",
      iterations: 3,
      delay: 200,
    },
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
