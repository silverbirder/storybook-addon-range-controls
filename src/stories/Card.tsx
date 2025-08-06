import React from "react";
import "./card.css";

interface CardProps {
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
}

export const Card = ({
  title = "Untitled",
  description = "",
  tags = [],
  rating = 0,
  metadata = { author: "", publishedDate: "", category: "" },
  isPublished = false,
}: CardProps) => {
  // Ensure tags is always an array
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <div className={`card ${isPublished ? "published" : "draft"}`}>
      <div className="card-header">
        <h3>{title}</h3>
        <div className="rating">★ {rating}/5</div>
      </div>
      <div className="card-body">
        <p>{description}</p>
        <div className="tags">
          {safeTags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <div className="metadata">
          <span>By {metadata?.author || "Unknown"}</span>
          <span>{metadata?.category || "Uncategorized"}</span>
          <span>{metadata?.publishedDate || "No date"}</span>
        </div>
        <div className="status">{isPublished ? "Published" : "Draft"}</div>
      </div>
    </div>
  );
};
