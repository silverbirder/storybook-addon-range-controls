import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import "./cardList.css";

interface Avatar {
  id: string;
  name: string;
  imageUrl?: string;
}

interface CardData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  rating: number;
  metadata: {
    author: string;
    publishedDate: string;
    category: string;
  };
  isPublished: boolean;
  avatars?: Avatar[];
  thumbnail?: string;
}

interface CardListProps {
  cards: CardData[];
  layout?: "grid" | "list";
  maxColumns?: number;
  showFilters?: boolean;
  sortBy?: "title" | "rating" | "date";
  sortOrder?: "asc" | "desc";
  selectedCategories?: string[];
  selectedTags?: string[];
}

export const CardList = ({
  cards = [], // Default to empty array
  layout = "grid",
  maxColumns = 3,
  showFilters: initialShowFilters = false,
  sortBy: initialSortBy = "title",
  sortOrder: initialSortOrder = "asc",
  selectedCategories: initialSelectedCategories = [],
  selectedTags: initialSelectedTags = [],
}: CardListProps) => {
  // State for interactive controls
  const [showFilters, setShowFilters] = useState(initialShowFilters);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialSelectedCategories,
  );
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);

  // Update state when props change
  useEffect(() => {
    setShowFilters(initialShowFilters);
  }, [initialShowFilters]);

  useEffect(() => {
    setSortBy(initialSortBy);
  }, [initialSortBy]);

  useEffect(() => {
    setSortOrder(initialSortOrder);
  }, [initialSortOrder]);

  useEffect(() => {
    setSelectedCategories(initialSelectedCategories);
  }, [initialSelectedCategories]);

  useEffect(() => {
    setSelectedTags(initialSelectedTags);
  }, [initialSelectedTags]);

  // Ensure cards is always an array
  const safeCards = Array.isArray(cards) ? cards : [];

  // Get unique categories from cards
  const availableCategories = Array.from(
    new Set(safeCards.map((card) => card?.metadata?.category).filter(Boolean)),
  ).sort();

  // Get unique tags from cards
  const availableTags = Array.from(
    new Set(safeCards.flatMap((card) => card?.tags || []).filter(Boolean)),
  ).sort();

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category],
    );
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Filter cards by selected categories
  const categoryFilteredCards =
    selectedCategories.length > 0
      ? safeCards.filter((card) =>
          selectedCategories.includes(card?.metadata?.category),
        )
      : safeCards;

  // Filter cards by selected tags
  const filteredCards =
    selectedTags.length > 0
      ? categoryFilteredCards.filter((card) =>
          selectedTags.some((tag) => card?.tags?.includes(tag)),
        )
      : categoryFilteredCards;

  // Sort cards
  const sortedCards = [...filteredCards].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "rating":
        comparison = a.rating - b.rating;
        break;
      case "date":
        comparison =
          new Date(a.metadata.publishedDate).getTime() -
          new Date(b.metadata.publishedDate).getTime();
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });

  const containerClass = `card-list card-list--${layout}`;
  const gridStyle =
    layout === "grid"
      ? ({
          "--max-columns": maxColumns,
        } as React.CSSProperties)
      : {};

  return (
    <div className="card-list-container">
      {/* Interactive Controls */}
      <div className="card-list-controls">
        <div className="control-section">
          <label className="control-label">
            <input
              type="checkbox"
              checked={showFilters}
              onChange={(e) => setShowFilters(e.target.checked)}
            />
            Show Filters
          </label>
        </div>

        <div className="control-section">
          <label className="control-label">
            Sort By:
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "title" | "rating" | "date")
              }
              className="control-select"
            >
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="date">Date</option>
            </select>
          </label>
        </div>

        <div className="control-section">
          <label className="control-label">
            Sort Order:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="control-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>

      {/* Category Selection */}
      {availableCategories.length > 0 && (
        <div className="category-controls">
          <h4 className="category-title">Filter by Categories:</h4>
          <div className="category-buttons">
            {availableCategories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategories.includes(category) ? "selected" : ""}`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {selectedCategories.length > 0 && (
            <div className="selected-categories">
              <span className="selected-label">Active category filters:</span>
              {selectedCategories.map((category) => (
                <span key={category} className="selected-category">
                  {category}
                  <button
                    className="remove-category"
                    onClick={() => toggleCategory(category)}
                    aria-label={`Remove ${category} filter`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                className="clear-all"
                onClick={() => setSelectedCategories([])}
              >
                Clear Categories
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tag Selection */}
      {availableTags.length > 0 && (
        <div className="tag-controls">
          <h4 className="tag-title">Filter by Tags:</h4>
          <div className="tag-buttons">
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? "selected" : ""}`}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>

          {selectedTags.length > 0 && (
            <div className="selected-tags">
              <span className="selected-label">Active tag filters:</span>
              {selectedTags.map((tag) => (
                <span key={tag} className="selected-tag">
                  #{tag}
                  <button
                    className="remove-tag"
                    onClick={() => toggleTag(tag)}
                    aria-label={`Remove ${tag} filter`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button className="clear-all" onClick={() => setSelectedTags([])}>
                Clear Tags
              </button>
            </div>
          )}
        </div>
      )}

      {showFilters && (
        <div className="card-list-filters">
          <div className="filter-info">
            Showing {sortedCards.length} of {safeCards.length} cards
          </div>
          <div className="filter-controls">
            <span>
              Sort by: {sortBy} ({sortOrder})
            </span>
            {selectedCategories.length > 0 && (
              <span>Categories: {selectedCategories.join(", ")}</span>
            )}
            {selectedTags.length > 0 && (
              <span>Tags: {selectedTags.join(", ")}</span>
            )}
          </div>
        </div>
      )}

      <div className={containerClass} style={gridStyle}>
        {sortedCards.length > 0 ? (
          sortedCards.map((card) => {
            // Safety check for card object
            if (!card || typeof card !== "object") {
              return null;
            }

            return (
              <Card
                key={card.id || `card-${Math.random()}`}
                title={card.title || "Untitled"}
                description={card.description || ""}
                tags={Array.isArray(card.tags) ? card.tags : []}
                rating={typeof card.rating === "number" ? card.rating : 0}
                metadata={
                  card.metadata || {
                    author: "",
                    publishedDate: "",
                    category: "",
                  }
                }
                isPublished={Boolean(card.isPublished)}
                avatars={Array.isArray(card.avatars) ? card.avatars : []}
                thumbnail={card.thumbnail}
              />
            );
          })
        ) : (
          <div className="no-cards">
            <p>No cards to display</p>
          </div>
        )}
      </div>
    </div>
  );
};
