import { defineMain } from "@storybook/react-vite/node";

const config = defineMain({
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["./local-preset.cjs"],
  framework: "@storybook/react-vite",
});

export default config;
