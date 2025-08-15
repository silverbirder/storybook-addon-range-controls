import React from "react";
import "./card.css";

interface Avatar {
  id: string;
  name: string;
  imageUrl?: string;
}

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
  avatars?: Avatar[];
  thumbnail?: string;
}

export const Card = ({
  title = "Untitled",
  description = "",
  tags = [],
  rating = 0,
  metadata = { author: "", publishedDate: "", category: "" },
  isPublished = false,
  avatars = [],
  thumbnail,
}: CardProps) => {
  // Ensure tags is always an array
  const safeTags = Array.isArray(tags) ? tags : [];
  // Ensure avatars is always an array
  const safeAvatars = Array.isArray(avatars) ? avatars : [];

  const renderAvatar = (avatar: Avatar) => {
    if (avatar.imageUrl) {
      return (
        <img
          src={avatar.imageUrl}
          alt={avatar.name}
          className="avatar-image"
          title={avatar.name}
        />
      );
    } else {
      const initials = avatar.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
      return (
        <div className="avatar-initials" title={avatar.name}>
          {initials}
        </div>
      );
    }
  };

  return (
    <div className={`card ${isPublished ? "published" : "draft"}`}>
      <div className="card-thumbnail">
        <img
          src={
            thumbnail ||
            "https://placehold.co/300x200/e0e0e0/666666?text=No+Image"
          }
          alt={title}
          className="thumbnail-image"
        />
      </div>
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
        {safeAvatars.length > 0 && (
          <div className="card-avatars">
            <div className="avatars-label">Contributors:</div>
            <div className="avatars-list">
              {safeAvatars.map((avatar) => (
                <div key={avatar.id} className="avatar">
                  {renderAvatar(avatar)}
                </div>
              ))}
            </div>
          </div>
        )}
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
