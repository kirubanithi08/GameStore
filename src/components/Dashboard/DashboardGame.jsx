 import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardGame.css";

function DashboardGame() {
 

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

  useEffect(() => {
    axios
      .get("https://game-store-6uwt.onrender.com/api/genres")
      .then((res) => setGenres(res.data))
      .catch((err) => console.error("Failed to load genres", err));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://game-store-6uwt.onrender.com/api/games", form)
      .then(() => alert("Game created successfully!"))
      .catch(console.error);
  };

  return (
    <form className="game-form-modern" onSubmit={handleSubmit}>
      <h2>Create Game</h2>

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

      {/* Modern Chip Selector */}
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

      <button type="submit" className="modern-submit-btn">Create Game</button>
    </form>
  );
}

export default DashboardGame;
