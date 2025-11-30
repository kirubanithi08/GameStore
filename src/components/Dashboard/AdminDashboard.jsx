import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./DashboardGame.css";

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({
    name: "",
    img: "",
    cover: "",
    description: "",
    price: "",
    featured: false,
    genres: []
  });

  useEffect(() => {
    api.get("/genres")
      .then(res => setGenres(res.data))
      .catch(() => setError("Failed to load genres"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleGenreToggle = (id) => {
    const selected = form.genres.includes(id)
      ? form.genres.filter(g => g !== id)
      : [...form.genres, id];
    setForm({ ...form, genres: selected });
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

console.log("TOKEN SENT:", localStorage.getItem("accessToken"));
console.log("HEADER:", api.defaults.headers.common?.Authorization);



    const payload = {
      ...form,
      price: Number(form.price), // convert string -> number
      genres: form.genres        // array of genre IDs only
    };

    try {
      await api.post("/games", payload);
      showToast();
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
      console.error(err.response?.data || err);
      setError("Failed to create game.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Game Management</h1>
      <button className="create-btn" onClick={() => setShowForm(true)}>+ Create Game</button>

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
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="modern-submit-btn">{loading ? "Saving..." : "Create Game"}</button>
            </div>
          </form>
        </div>
      )}

      <div id="toast" className="toast">Game Created Successfully!</div>
    </div>
  );
}
