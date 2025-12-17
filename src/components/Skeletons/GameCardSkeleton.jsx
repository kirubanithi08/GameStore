import "./GameCardSkeleton.css";

export default function GameCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />

      <div className="skeleton-info">
        <div className="skeleton-title" />

        <div className="skeleton-tags">
          <div className="skeleton-genre" />
          <div className="skeleton-genre small" />
        </div>

        <div className="skeleton-btn" />
      </div>
    </div>
  );
}
