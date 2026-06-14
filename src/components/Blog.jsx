import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./styles/blog.css";
import {
  blogArticles,
  blogFilters,
  blogImages,
  featuredGuide,
} from "./blogData";

function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return blogArticles.filter((article) => {
      const matchesFilter =
        activeFilter === "all" || article.category === activeFilter;
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.answer.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  const toggleArticle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="blog-page">
      <Helmet>
        <title>NGO Blog & Guides | निस्वार्थ प्रयास</title>
        <meta
          name="description"
          content="Answers to common NGO questions in India — registration, funding, joining, authenticity checks, and legal requirements. A resource guide by Nishwarthaprayas."
        />
        <meta
          property="og:title"
          content="NGO Questions & Guides — Nishwarthaprayas Blog"
        />
        <meta
          property="og:description"
          content="Learn how to start, register, join, and fund NGOs in India with our comprehensive Q&A guide."
        />
      </Helmet>

      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <span className="blog-badge">Knowledge Hub</span>
          <h1>NGO Blog & Guides</h1>
          <p className="blog-tagline">भारत में एनजीओ से जुड़े सवालों के जवाब</p>
          <p className="blog-intro">
            Registration, funding, volunteering, and legal requirements —
            everything you need to know about NGOs in India, in one place.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="blog-stats">
        <div className="blog-stat">
          <span className="blog-stat-value">{blogArticles.length}</span>
          <span className="blog-stat-label">Topics Covered</span>
        </div>
        <div className="blog-stat">
          <span className="blog-stat-value">{blogFilters.length - 1}</span>
          <span className="blog-stat-label">Categories</span>
        </div>
        <div className="blog-stat">
          <span className="blog-stat-value">🇮🇳</span>
          <span className="blog-stat-label">India Focused</span>
        </div>
        <div className="blog-stat">
          <span className="blog-stat-value">Free</span>
          <span className="blog-stat-label">Open Resource</span>
        </div>
      </section>

      {/* Toolbar */}
      <section className="blog-toolbar">
        <div className="blog-search-wrap">
          <input
            type="search"
            className="blog-search"
            placeholder="Search topics… e.g. register, funds, join"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search blog topics"
          />
        </div>
        <div className="blog-filters" role="tablist" aria-label="Filter by category">
          {blogFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`blog-filter-btn ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="blog-articles-section">
        <div className="section-header">
          <h2>
            {filteredArticles.length} Topic
            {filteredArticles.length !== 1 ? "s" : ""} Found
          </h2>
          <p>Click a question to read the full answer</p>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="blog-empty">
            <p>No topics match your search.</p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                className={`blog-card ${
                  expandedId === article.id ? "expanded" : ""
                }`}
              >
                <button
                  type="button"
                  className="blog-card-header"
                  onClick={() => toggleArticle(article.id)}
                  aria-expanded={expandedId === article.id}
                >
                  <img
                    src={blogImages[index % blogImages.length]}
                    alt=""
                    className="blog-card-thumb"
                    loading="lazy"
                  />
                  <div className="blog-card-meta">
                    <span className="blog-card-category">
                      {blogFilters.find((f) => f.id === article.category)
                        ?.label || article.category}
                    </span>
                    <h3>{article.title}</h3>
                  </div>
                  <span className="blog-card-toggle">
                    {expandedId === article.id ? "−" : "+"}
                  </span>
                </button>
                {expandedId === article.id && (
                  <div className="blog-card-body">
                    <p>{article.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Featured guide */}
      <section className="blog-guide">
        <div className="blog-guide-inner">
          <span className="blog-guide-label">Featured Guide</span>
          <h2>{featuredGuide.title}</h2>
          <p className="blog-guide-intro">{featuredGuide.intro}</p>
          <div className="blog-guide-sections">
            {featuredGuide.sections.map((section) => (
              <div key={section.heading} className="blog-guide-item">
                <h3>{section.heading}</h3>
                <p>{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta">
        <h2>Want to Start or Join an NGO?</h2>
        <p>
          निस्वार्थ प्रयास से जुड़ें — Farrukhabad में समाज सेवा का हिस्सा बनें
        </p>
        <div className="blog-cta-actions">
          <Link to="/india-ngo-contact" className="btn btn-primary">
            Contact Us
          </Link>
          <Link to="/india-ngo-about" className="btn btn-outline">
            About Our NGO
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Blog;
