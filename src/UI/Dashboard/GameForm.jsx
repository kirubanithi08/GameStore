import React, { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import "./AdminDashboard.css";

export default function GameForm({ onClose, game }) {
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
  const toastRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    api.get("/genres")
      .then(res => setGenres(res.data))
      .catch(() => setError("Failed to load genres"));

    
    if (game) {
      setForm({
        name: game.name || "",
        img: game.img || "",
        cover: game.cover || "",
        description: game.description || "",
        price: game.price || "",
        featured: game.featured || false,
        genres: game.genres?.map(g => g.id) || []
      });
    }

    return () => clearTimeout(toastTimerRef.current);
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

  const showToast = (msg) => {
    const toastEl = toastRef.current;
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => toastEl.classList.remove("show"), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (game) {
       
        await api.put(`/games/${game.id}`, { ...form, price: Number(form.price) });
        showToast("Game updated successfully!");
      } else {
        
        await api.post("/games", { ...form, price: Number(form.price) });
        showToast("Game created successfully!");
        setForm({ name: "", img: "", cover: "", description: "", price: "", featured: false, genres: [] });
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to save game.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <form className="game-form-modern" onSubmit={handleSubmit}>
        <h2>{game ? "Edit Game" : "Create New Game"}</h2>
        {error && <p className="error-box">{error}</p>}

        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input name="img" value={form.img} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Cover URL</label>
          <input name="cover" value={form.cover} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>

        <div className="form-group-inline">
          <div>
            <label>Price</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required />
          </div>

          <div className="checkbox-group">
            <label>Featured</label>
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
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

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="modern-submit-btn">{loading ? "Saving..." : (game ? "Update Game" : "Create Game")}</button>
        </div>
      </form>

      <div ref={toastRef} className="toast">Success!</div>
    </div>
  );
}
