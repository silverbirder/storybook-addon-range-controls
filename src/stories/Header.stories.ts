import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Example/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    "range-controls": {
      user: {
        name: {
          type: "string",
          min: 1,
          max: 50,
          step: 1,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
  parameters: {
    "range-controls": {
      user: {
        name: {
          type: "string",
          min: 1,
          max: 100,
          step: 1,
        },
      },
    },
  },
};

export const LoggedOut: Story = {};
