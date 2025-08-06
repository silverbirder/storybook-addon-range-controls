import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Example/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    "my-addon": {
      enabled: true,
      message: "Header stress test configuration",
      propsConfig: {
        user: {
          name: {
            type: "string",
            length: 50,
          },
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
    "my-addon": {
      enabled: true,
      message: "LoggedIn header stress test",
      propsConfig: {
        user: {
          name: {
            type: "string",
            length: 100,
          },
        },
      },
    },
  },
};

export const LoggedOut: Story = {};
