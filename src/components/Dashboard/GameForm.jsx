import React, { useEffect, useState } from "react";
import api from "../../services/apiClient";
import { fetchGenres } from "../../services/games";
import { useToast } from "../../context/ToastContext";
import "./AdminDashboard.css";

export default function GameForm({ onClose, game }) {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    img: "",
    cover: "",
    description: "",
    price: "",
    featured: false,
    genres: []
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load genres");
      }
    };

    loadGenres();

    if (game) {
      setForm({
        name: game.name || "",
        img: game.img || "",
        cover: game.cover || "",
        description: game.description || "",
        price: game.price || "",
        featured: game.featured || false,
        genres: game.genres?.map((g) => g.id) || [],
      });
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleGenreToggle = (id) => {
    setForm(prev => {
      const selected = prev.genres.includes(id)
        ? prev.genres.filter(g => g !== id)
        : [...prev.genres, id];
      return { ...prev, genres: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (game) {
        await api.put(`/games/${game.id}`, { ...form, price: Number(form.price) });
        addToast("Game updated successfully!");
      } else {
        await api.post("/games", { ...form, price: Number(form.price) });
        addToast("Game created successfully!");
        setForm({ name: "", img: "", cover: "", description: "", price: "", featured: false, genres: [] });
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to save game.");
      addToast("Failed to save game", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <form className="game-form-modern" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{game ? "Edit Game" : "Add New Game"}</h2>
          <button type="button" className="close-x" onClick={onClose}>&times;</button>
        </div>

        {error && <p className="error-box">{error}</p>}

        <div className="form-scroll-area">
          <div className="form-group">
            <label>Game Title</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Cyberpunk 2077" required />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Thumbnail URL</label>
              <input name="img" value={form.img} onChange={handleChange} placeholder="Direct link to image" required />
            </div>

            <div className="form-group">
              <label>Banner URL</label>
              <input name="cover" value={form.cover} onChange={handleChange} placeholder="Wide cover image" required />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Tell us about the game..." required />
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="29.99" required />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                <span>Featured Game</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Genres</label>
            <div className="genre-chip-container">
              {genres.map(genre => (
                <div
                  key={genre.id}
                  className={`genre-chip ${form.genres.includes(genre.id) ? "selected" : ""}`}
                  onClick={() => handleGenreToggle(genre.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleGenreToggle(genre.id); }}
                >
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-link" onClick={onClose}>Cancel</button>
          <button type="submit" className="modern-submit-btn" disabled={loading}>
            {loading ? "Processing..." : (game ? "Update Details" : "Publish Game")}
          </button>
        </div>
      </form>
    </div>
  );
}
