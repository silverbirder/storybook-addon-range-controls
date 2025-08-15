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

    // Add alternating tags based on index
    if (index % 2 === 0) {
      selectedTags.push("Featured");
    } else {
      selectedTags.push("Regular");
    }

    const finalTagCount = Math.min(selectedTags.length, 3);

    // Generate fixed number of avatars based on index
    const avatarCount = (index % 4) + 1;
    const avatars = Array.from({ length: avatarCount }, (_, avatarIndex) => ({
      id: `avatar-${index}-${avatarIndex}`,
      name: authors[(authorIndex + avatarIndex) % authors.length]!,
      imageUrl:
        avatarIndex % 2 === 0
          ? `https://i.pravatar.cc/40?img=${index + avatarIndex + 1}`
          : undefined,
    }));

    return {
      id: `card-${index + 1}`,
      title:
        sampleTitles[titleIndex]! +
        (index >= sampleTitles.length
          ? ` ${Math.floor(index / sampleTitles.length) + 1}`
          : ""),
      description: `This is a sample description for card ${index + 1}. It demonstrates how the CardList component handles multiple cards with varying content lengths and different types of information.`,
      tags: selectedTags.slice(0, finalTagCount),
      rating: Math.round(((index % 5) + 1) * 10) / 10, // Rating 1.0 to 5.0
      metadata: {
        author: authors[authorIndex]!,
        publishedDate: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
        category: categories[categoryIndex]!,
      },
      isPublished: index % 3 !== 0, // 2/3 are published, 1/3 are drafts
      avatars,
      thumbnail:
        index % 3 === 0
          ? undefined
          : `https://picsum.photos/300/200?random=${index + 1}`,
    };
  });
};

const meta: Meta<typeof CardList> = {
  title: "Example/CardList",
  component: CardList,
  parameters: {
    layout: "fullscreen",
    range: {
      cards: {
        type: "array",
        defaultItem: (index: number) => ({
          id: `card-${index + 1}`,
          title: "x",
          description: "x",
          tags: [`Tag${index + 1}`],
          rating: 0,
          isPublished: true,
          metadata: {
            author: "john Doe",
            publishedDate: "2024-01-01",
            category: "Technology",
          },
          avatars: [
            {
              id: `avatar-${index}-1`,
              name: "John Doe",
            },
          ],
          thumbnail: "https://picsum.photos/300/200?random=1",
        }),
        items: {
          type: "object",
          title: {
            type: "string",
            min: 0,
            max: 99,
            defaultChar: "T",
          },
          description: {
            type: "string",
            min: 0,
            max: 999,
            defaultChar: "D",
          },
          tags: {
            type: "array",
            defaultItem: "Tag1",
            items: {
              type: "string",
            },
            defaultItems: (index: number) => `Tag${index + 1}`,
          },
          rating: {
            type: "number",
            min: 0,
            step: 0.1,
          },
          isPublished: {
            type: "boolean",
          },
          metadata: {
            type: "object",
            author: {
              type: "string",
              defaultChar: "T",
            },
            category: {
              type: "string",
              defaultChar: "C",
            },
          },
          avatars: {
            type: "array",
            min: 0,
            max: 5,
            defaultItem: (index: number) => ({
              id: `avatar-${index}`,
              name: "New User",
            }),
            items: {
              type: "object",
              id: {
                type: "string",
                min: 5,
                max: 20,
                defaultChar: "a",
              },
              name: {
                type: "string",
                min: 2,
                max: 30,
                defaultChar: "N",
              },
              imageUrl: {
                type: "string",
                min: 0,
                max: 100,
                defaultChar: "h",
              },
            },
          },
          thumbnail: {
            type: "string",
            min: 0,
            max: 200,
            defaultChar: "h",
          },
        },
      },
      layout: {
        type: "enum",
        selection: "single",
        options: [
          { label: "Grid Layout", value: "grid" },
          { label: "List Layout", value: "list" },
        ],
      },
      maxColumns: {
        type: "number",
      },
      showFilters: {
        type: "boolean",
      },
      selectedCategories: {
        type: "enum",
        selection: "multiple",
        options: [
          { label: "Technology", value: "Technology" },
          { label: "Design", value: "Design" },
          { label: "Business", value: "Business" },
          { label: "Science", value: "Science" },
          { label: "Art", value: "Art" },
          { label: "Education", value: "Education" },
        ],
      },
      selectedTags: {
        type: "enum",
        selection: "multiple",
        options: [
          { label: "Tag1", value: "Tag1" },
          { label: "Tag2", value: "Tag2" },
          { label: "Tag3", value: "Tag3" },
          { label: "Tag4", value: "Tag4" },
          { label: "Tag5", value: "Tag5" },
          { label: "Featured", value: "Featured" },
          { label: "Regular", value: "Regular" },
          { label: "Technology", value: "Technology" },
          { label: "Design", value: "Design" },
          { label: "Business", value: "Business" },
          { label: "Science", value: "Science" },
          { label: "Art", value: "Art" },
          { label: "Education", value: "Education" },
        ],
      },
      sortBy: {
        type: "enum",
        selection: "single",
        options: [
          { label: "Title", value: "title" },
          { label: "Rating", value: "rating" },
          { label: "Date", value: "date" },
          { label: "Author", value: "author" },
          { label: "Category", value: "category" },
        ],
      },
      sortOrder: {
        type: "enum",
        selection: "single",
        options: [
          { label: "Ascending", value: "asc" },
          { label: "Descending", value: "desc" },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardList>;

export const Default: Story = {
  args: {
    cards: generateSampleCards(6),
    layout: "grid",
    maxColumns: 3,
    showFilters: false,
    sortBy: "title",
    sortOrder: "asc",
    selectedCategories: [],
    selectedTags: [],
  },
};
