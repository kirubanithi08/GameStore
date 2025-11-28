import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardGame.css";

export default function AdminDashboard() {
 
  

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://game-store-6uwt.onrender.com/api/genres")
      .then((res) => setGenres(res.data))
      .catch(() => setError("Failed to load genres"));
  }, []);

  const handleGenreToggle = (id) => {
    const selected = form.genres.includes(id)
      ? form.genres.filter((g) => g !== id)
      : [...form.genres, id];

    setForm({ ...form, genres: selected });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const showToast = () => {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      genres: form.genres.map((id) => ({ id }))
    };

    try {
      await axios.post("https://game-store-6uwt.onrender.com/api/games", payload);

      showToast();

      // Reset form
      setForm({
        name: "",
        img: "",
        cover: "",
        description: "",
        price: "",
        featured: false,
        genres: []
      });

      setShowForm(false);
    } catch (err) {
      setError("Failed to create game.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Game Management</h1>

      {/* CREATE BUTTON */}
      <button className="create-btn" onClick={() => setShowForm(true)}>
        + Create Game
      </button>

      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <form className="game-form-modern" onSubmit={handleSubmit}>
            <h2>Create New Game</h2>

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
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-inline">
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkbox-group">
                <label>Featured</label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* GENRES */}
            <div className="form-group">
              <label>Genres</label>

              <div className="genre-chip-container">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    className={`genre-chip ${
                      form.genres.includes(genre.id) ? "selected" : ""
                    }`}
                    onClick={() => handleGenreToggle(genre.id)}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="modern-submit-btn">
                {loading ? "Saving..." : "Create Game"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUCCESS TOAST */}
      <div id="toast" className="toast">Game Created Successfully!</div>
    </div>
  );
}
