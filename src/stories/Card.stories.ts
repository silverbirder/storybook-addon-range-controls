import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Example/Card",
  component: Card,
  parameters: {
    "my-addon": {
      propsConfig: {
        title: {
          type: "string",
          length: 100,
        },
        description: {
          type: "string",
          length: 500,
        },
        tags: {
          type: "array",
          length: 10,
        },
        rating: {
          type: "number",
          min: 1,
          max: 5,
          step: 0.1,
        },
        metadata: {
          author: {
            type: "string",
            length: 50,
          },
          publishedDate: {
            type: "string",
            length: 20,
          },
          category: {
            type: "string",
            length: 30,
          },
        },
        isPublished: {
          type: "boolean",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Sample Card Title",
    description:
      "This is a sample description for the card component. It shows how the component handles text content.",
    tags: ["React", "TypeScript", "Storybook"],
    rating: 4.5,
    metadata: {
      author: "John Doe",
      publishedDate: "2024-01-15",
      category: "Technology",
    },
    isPublished: true,
  },
};

export const Draft: Story = {
  args: {
    title: "Draft Article",
    description: "This is a draft article that hasn't been published yet.",
    tags: ["Draft", "Work in Progress"],
    rating: 3.0,
    metadata: {
      author: "Jane Smith",
      publishedDate: "2024-02-01",
      category: "Draft",
    },
    isPublished: false,
  },
  parameters: {
    "my-addon": {
      propsConfig: {
        title: {
          type: "string",
          length: 200,
        },
        description: {
          type: "string",
          length: 1000,
        },
        tags: {
          type: "array",
          length: 20,
        },
        rating: {
          type: "number",
          min: 0,
          max: 5,
          step: 0.5,
        },
        metadata: {
          author: {
            type: "string",
            length: 100,
          },
          publishedDate: {
            type: "string",
            length: 30,
          },
          category: {
            type: "string",
            length: 50,
          },
        },
        isPublished: {
          type: "boolean",
        },
      },
    },
  },
};
