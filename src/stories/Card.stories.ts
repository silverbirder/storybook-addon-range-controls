import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Example/Card",
  component: Card,
  parameters: {
    range: {
      title: {
        type: "string",
        min: 1,
        max: 100,
        step: 1,
      },
      description: {
        type: "string",
        min: 10,
        max: 500,
        step: 10,
      },
      tags: {
        type: "array",
        min: 0,
        max: 10,
        step: 1,
        defaultItem: "Tag",
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
          min: 1,
          max: 50,
          step: 1,
        },
        category: {
          type: "string",
          min: 1,
          max: 30,
          step: 1,
        },
      },
      isPublished: {
        type: "boolean",
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
