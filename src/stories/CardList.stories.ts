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
    "my-addon": {
      propsConfig: {
        cards: {
          type: "array",
          length: 50,
          items: {
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
  parameters: {
    "my-addon": {
      propsConfig: {
        cards: {
          type: "array",
          length: 20,
          items: {
            title: {
              type: "string",
              length: 80,
            },
            description: {
              type: "string",
              length: 300,
            },
            tags: {
              type: "array",
              length: 8,
            },
            rating: {
              type: "number",
              min: 1,
              max: 5,
              step: 0.5,
            },
            isPublished: {
              type: "boolean",
            },
            metadata: {
              author: {
                type: "string",
                length: 40,
              },
              publishedDate: {
                type: "string",
                length: 15,
              },
              category: {
                type: "string",
                length: 25,
              },
            },
          },
        },
        maxColumns: {
          type: "number",
          min: 1,
          max: 5,
          step: 1,
        },
        showFilters: {
          type: "boolean",
        },
      },
    },
  },
};

export const ListLayout: Story = {
  args: {
    cards: generateSampleCards(4),
    layout: "list",
    showFilters: true,
    sortBy: "rating",
    sortOrder: "desc",
  },
  parameters: {
    "my-addon": {
      propsConfig: {
        cards: {
          type: "array",
          length: 15,
          items: {
            title: {
              type: "string",
              length: 60,
            },
            description: {
              type: "string",
              length: 200,
            },
            tags: {
              type: "array",
              length: 6,
            },
            rating: {
              type: "number",
              min: 0,
              max: 5,
              step: 0.2,
            },
            isPublished: {
              type: "boolean",
            },
          },
        },
        showFilters: {
          type: "boolean",
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

export const ManyCards: Story = {
  args: {
    cards: generateSampleCards(12),
    layout: "grid",
    maxColumns: 4,
    showFilters: true,
    sortBy: "date",
    sortOrder: "desc",
  },
  parameters: {
    "my-addon": {
      propsConfig: {
        cards: {
          type: "array",
          length: 100,
          items: {
            title: {
              type: "string",
              length: 150,
            },
            description: {
              type: "string",
              length: 800,
            },
            tags: {
              type: "array",
              length: 15,
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
                length: 60,
              },
              publishedDate: {
                type: "string",
                length: 25,
              },
              category: {
                type: "string",
                length: 40,
              },
            },
          },
        },
        maxColumns: {
          type: "number",
          min: 1,
          max: 8,
          step: 1,
        },
        showFilters: {
          type: "boolean",
        },
      },
    },
  },
};

export const FilteredCards: Story = {
  args: {
    cards: generateSampleCards(8),
    layout: "grid",
    maxColumns: 3,
    showFilters: true,
    filterByCategory: "Technology",
    sortBy: "rating",
    sortOrder: "desc",
  },
  parameters: {
    "my-addon": {
      propsConfig: {
        cards: {
          type: "array",
          length: 30,
        },
        filterByCategory: {
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
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    cards: [],
    layout: "grid",
    maxColumns: 3,
    showFilters: true,
  },
  parameters: {
    "my-addon": {
      propsConfig: {
        cards: {
          type: "array",
          length: 10,
        },
        showFilters: {
          type: "boolean",
        },
      },
    },
  },
};

export const ExtremeLongContent: Story = {
  args: {
    cards: [
      {
        id: "extreme-1",
        title:
          "This is an extremely long title that should test how the card component handles very long text content and whether it breaks the layout or maintains proper formatting",
        description:
          "This is an extremely long description that contains a lot of text to test how the component handles lengthy content. It should wrap properly and not break the layout. This description continues with even more text to really stress test the component's ability to handle large amounts of content without breaking the design or causing overflow issues.",
        tags: [
          "VeryLongTagName",
          "AnotherExtremelyLongTagThatShouldTestWrapping",
          "Tag3",
          "Tag4",
          "Tag5",
          "Tag6",
          "Tag7",
          "Tag8",
        ],
        rating: 4.8,
        metadata: {
          author: "John Doe with a Very Long Name That Might Cause Issues",
          publishedDate: "2024-01-15",
          category: "Technology with Very Long Category Name",
        },
        isPublished: true,
      },
      {
        id: "extreme-2",
        title: "Short",
        description: "Short desc.",
        tags: ["A"],
        rating: 1.0,
        metadata: {
          author: "X",
          publishedDate: "2024-01-01",
          category: "Tech",
        },
        isPublished: false,
      },
    ],
    layout: "grid",
    maxColumns: 2,
    showFilters: true,
  },
  parameters: {
    "my-addon": {
      propsConfig: {
        cards: {
          type: "array",
          length: 5,
        },
        maxColumns: {
          type: "number",
          min: 1,
          max: 4,
          step: 1,
        },
      },
    },
  },
};
