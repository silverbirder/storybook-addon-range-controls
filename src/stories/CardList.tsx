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
  likesCount?: number;
}

interface CardListProps {
  cards: CardData[];
  layout?: "grid" | "list";
  maxColumns?: number;
  sortBy?: "title" | "rating" | "date";
  sortOrder?: "asc" | "desc";
  selectedCategories?: string[];
  selectedTags?: string[];
}

export const CardList = ({
  cards = [], // Default to empty array
  layout = "grid",
  maxColumns = 3,
  sortBy: initialSortBy = "title",
  sortOrder: initialSortOrder = "asc",
  selectedCategories: initialSelectedCategories = [],
  selectedTags: initialSelectedTags = [],
}: CardListProps) => {
  // State for interactive controls
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialSelectedCategories,
  );
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);

  // Update state when props change
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
      {/* Category Selection */}
      {availableCategories.length > 0 && (
        <div className="category-controls">
          <h4 className="category-title">カテゴリー:</h4>
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
              <span className="selected-label">選択中:</span>
              {selectedCategories.map((category) => (
                <span key={category} className="selected-category">
                  {category}
                  <button
                    className="remove-category"
                    onClick={() => toggleCategory(category)}
                    aria-label={`${category} フィルターを削除`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                className="clear-all"
                onClick={() => setSelectedCategories([])}
              >
                すべて削除
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tag Selection */}
      {availableTags.length > 0 && (
        <div className="tag-controls">
          <h4 className="tag-title">タグ:</h4>
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
              <span className="selected-label">選択中:</span>
              {selectedTags.map((tag) => (
                <span key={tag} className="selected-tag">
                  #{tag}
                  <button
                    className="remove-tag"
                    onClick={() => toggleTag(tag)}
                    aria-label={`${tag} フィルターを削除`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button className="clear-all" onClick={() => setSelectedTags([])}>
                すべて削除
              </button>
            </div>
          )}
        </div>
      )}

      <div className="card-list-filters">
        <div className="filter-info">
          {sortedCards.length} / {safeCards.length} 件を表示
        </div>
        <div className="filter-controls">
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "title" | "rating" | "date")
              }
              className="control-select"
            >
              <option value="title">タイトル</option>
              <option value="rating">評価</option>
              <option value="date">日付</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="control-select"
            >
              <option value="asc">昇順</option>
              <option value="desc">降順</option>
            </select>
          </div>
          {selectedCategories.length > 0 && (
            <span>カテゴリー: {selectedCategories.join(", ")}</span>
          )}
          {selectedTags.length > 0 && (
            <span>タグ: {selectedTags.join(", ")}</span>
          )}
        </div>
      </div>

      <div className={containerClass} style={gridStyle}>
        {sortedCards.length > 0 ? (
          sortedCards.map((card, index) => {
            // Safety check for card object
            if (!card || typeof card !== "object") {
              return null;
            }

            return (
              <Card
                key={card.id || `card-${index}`}
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
                likesCount={
                  typeof card.likesCount === "number" ? card.likesCount : 0
                }
              />
            );
          })
        ) : (
          <div className="no-cards">
            <p>表示するカードがありません</p>
          </div>
        )}
      </div>
    </div>
  );
};
