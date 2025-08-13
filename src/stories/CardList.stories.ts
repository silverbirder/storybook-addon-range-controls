import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardList } from "./CardList";

// Sample data generator
const generateSampleCards = (count: number) => {
  const categories = [
    "Technology",
    "Design",
    "Business",
    "Science",
    "Art",
    "Education",
  ];
  const authors = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Wilson",
    "Carol Brown",
    "David Lee",
  ];
  const sampleTitles = [
    "Getting Started with React",
    "Advanced TypeScript Patterns",
    "Design System Best Practices",
    "Machine Learning Basics",
    "Effective Team Communication",
    "Modern CSS Techniques",
    "Database Optimization",
    "User Experience Research",
    "Agile Development Methodology",
    "Cloud Computing Fundamentals",
  ];

  return Array.from({ length: count }, (_, index) => {
    const categoryIndex = index % categories.length;
    const authorIndex = index % authors.length;
    const titleIndex = index % sampleTitles.length;

    const selectedTags: string[] = [
      categories[categoryIndex]!,
      `Tag${(index % 5) + 1}`,
    ];

    if (Math.random() > 0.5) {
      selectedTags.push("Featured");
    } else {
      selectedTags.push("Regular");
    }

    const finalTagCount = Math.floor(Math.random() * 3) + 1;

    return {
      id: `card-${index + 1}`,
      title:
        sampleTitles[titleIndex]! +
        (index >= sampleTitles.length
          ? ` ${Math.floor(index / sampleTitles.length) + 1}`
          : ""),
      description: `This is a sample description for card ${index + 1}. It demonstrates how the CardList component handles multiple cards with varying content lengths and different types of information.`,
      tags: selectedTags.slice(0, finalTagCount),
      rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
      metadata: {
        author: authors[authorIndex]!,
        publishedDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        category: categories[categoryIndex]!,
      },
      isPublished: Math.random() > 0.3,
    };
  });
};

const meta: Meta<typeof CardList> = {
  title: "Example/CardList",
  component: CardList,
  parameters: {
    layout: "fullscreen",
    "range-controls": {
      propsConfig: {
        cards: {
          type: "array",
          min: 0,
          max: 50,
          step: 1,
          default: (index: number) => ({
            id: `card-${index + 1}`,
            title: "x",
            description: "x",
            tags: [`Tag${(index % 5) + 1}`],
            rating: 0,
            isPublished: false,
            metadata: {
              author: "x",
              publishedDate: "2024-01-01",
              category: "x",
            },
          }),
          items: {
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
              default: "x",
            },
            rating: {
              type: "number",
              min: 0,
              max: 5,
              step: 0.1,
            },
            isPublished: {
              type: "boolean",
            },
            metadata: {
              author: {
                type: "string",
                min: 1,
                max: 50,
                step: 1,
              },
              publishedDate: {
                type: "string",
                min: 8,
                max: 20,
                step: 1,
              },
              category: {
                type: "string",
                min: 1,
                max: 30,
                step: 1,
              },
            },
          },
        },
        layout: {
          type: "string",
        },
        maxColumns: {
          type: "number",
          min: 1,
          max: 6,
          step: 1,
        },
        showFilters: {
          type: "boolean",
        },
        filterByCategory: {
          type: "string",
        },
        sortBy: {
          type: "string",
        },
        sortOrder: {
          type: "string",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardList>;

export const GridLayout: Story = {
  args: {
    cards: generateSampleCards(6),
    layout: "grid",
    maxColumns: 3,
    showFilters: true,
    sortBy: "title",
    sortOrder: "asc",
  },
};
