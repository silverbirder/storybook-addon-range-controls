import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    controls: {
      disable: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    actions: {
      disable: true,
    },
  },
  initialGlobals: {
    background: { value: "light" },
  },
};

export default preview;
