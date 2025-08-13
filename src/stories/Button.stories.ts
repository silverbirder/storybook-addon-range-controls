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
    "range-controls": {
      propsConfig: {
        label: {
          type: "string",
          min: 1,
          max: 20,
          step: 1,
        },
        size: {
          type: "string",
        },
        primary: {
          type: "boolean",
        },
        backgroundColor: {
          type: "string",
        },
      },
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
    "range-controls": {
      propsConfig: {
        label: {
          type: "string",
          min: 1,
          max: 30,
          step: 1,
        },
        primary: {
          type: "boolean",
        },
        backgroundColor: {
          type: "string",
        },
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
