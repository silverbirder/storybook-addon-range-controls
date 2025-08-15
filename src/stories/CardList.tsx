import React from "react";
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
}

export const CardList = ({
  cards = [], // Default to empty array
  layout = "grid",
  maxColumns = 3,
  showFilters = false,
  sortBy = "title",
  sortOrder = "asc",
  selectedCategories = [],
}: CardListProps) => {
  // Ensure cards is always an array
  const safeCards = Array.isArray(cards) ? cards : [];

  // Filter cards by selected categories
  const filteredCards =
    selectedCategories.length > 0
      ? safeCards.filter((card) =>
          selectedCategories.includes(card?.metadata?.category),
        )
      : safeCards;

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
