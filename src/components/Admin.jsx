import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Seo from "./Seo";
import axios from "axios";
import "./styles/adminpage.css";
import ImageUploader from "./ImageUploader";
import config from "./config";

function AdminGallery({ refreshKey }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.serverUrl}/images`);
      setImages(response.data || []);
    } catch (err) {
      setError("Could not load uploaded images.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, refreshKey]);

  if (loading) {
    return <p className="admin-gallery-status">Loading images…</p>;
  }

  if (error) {
    return (
      <div className="admin-gallery-status admin-gallery-status--error">
        <p>{error}</p>
        <button type="button" className="btn-retry" onClick={fetchImages}>
          Retry
        </button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <p className="admin-gallery-status">
        No images uploaded yet. Upload one above to show it on the homepage.
      </p>
    );
  }

  return (
    <div className="admin-gallery-grid">
      {images.map((image, index) => (
        <article key={image._id || index} className="admin-gallery-card">
          <img
            src={`${config.serverUrl}/uploads/${image.imageData}`}
            alt={image.title || "Uploaded image"}
            loading="lazy"
          />
          <div className="admin-gallery-info">
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Admin() {
  const { user, logout, isLoading } = useAuth0();
  const [galleryKey, setGalleryKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUploadSuccess = () => {
    setGalleryKey((k) => k + 1);
  };

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Loading…</div>
      </div>
    );
  }

  const firstName =
    user?.given_name ||
    user?.name?.split("@")[0]?.split(".")[0] ||
    "Admin";

  return (
    <div className="admin-page">
      <Seo
        title="Admin Dashboard"
        description="Private admin area for Nishwarth Prayas NGO."
        path="/admin-page"
        noindex
        keywords=""
      />

      <section className="admin-hero">
        <div className="admin-hero-inner">
          <span className="admin-badge">Dashboard</span>
          <h1>Admin Panel</h1>
          <p>Upload photos to display on the homepage</p>
        </div>
      </section>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-user-card">
            {user?.picture && (
              <img src={user.picture} alt="" className="admin-avatar" />
            )}
            <div>
              <p className="admin-welcome">Welcome 🙏</p>
              <p className="admin-name">{firstName}</p>
              <p className="admin-email">{user?.email}</p>
            </div>
          </div>
          <nav className="admin-nav">
            <Link to="/" className="admin-nav-link">
              ← Back to Website
            </Link>
            <button
              type="button"
              className="admin-nav-link admin-nav-logout"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          <section className="admin-panel">
            <h2>Upload New Image</h2>
            <p className="admin-panel-desc">
              Images appear in the homepage highlights section after upload.
            </p>
            <ImageUploader onUploadSuccess={handleUploadSuccess} />
          </section>

          <section className="admin-panel">
            <h2>Uploaded Images</h2>
            <p className="admin-panel-desc">
              Currently live on the homepage ({config.serverUrl})
            </p>
            <AdminGallery refreshKey={galleryKey} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Admin;
