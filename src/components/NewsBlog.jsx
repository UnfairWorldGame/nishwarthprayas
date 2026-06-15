import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import { PAGE_SEO } from "./seoConfig";
import bg from "./images/bg.jpg";
import "./styles/newsblog.css";
import config from "./config";
import { useInView } from "./hooks/useInView";
import {
  FALLBACK_NEWS,
  NEWS_FILTERS,
  formatNewsDate,
  normalizeArticle,
} from "./newsData";

const PAGE_SIZE = 9;

function ScrollReveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      className={`news-reveal ${inView ? "news-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function NewsSkeleton() {
  return (
    <div className="news-skeleton-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="news-skeleton-card">
          <div className="skeleton skeleton-image" />
          <div className="skeleton skeleton-line skeleton-line--short" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line skeleton-line--medium" />
        </div>
      ))}
    </div>
  );
}

function NewsBlog() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const apiKey = config.newsApiKey;

      if (!apiKey) {
        setNewsData(FALLBACK_NEWS);
        setUsingFallback(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://api.currentsapi.services/v1/latest-news",
          {
            params: {
              language: "hi",
              category: "ngo",
              apiKey,
            },
            timeout: 10000,
          }
        );

        if (response.status === 200 && response.data?.news?.length) {
          const articles = response.data.news
            .slice(0, 40)
            .map((article) => normalizeArticle(article, bg));
          setNewsData(articles);
          setUsingFallback(false);
        } else {
          throw new Error("No news returned");
        }
      } catch (error) {
        console.error("Error fetching NGO news:", error);
        setNewsData(FALLBACK_NEWS);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNews = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return newsData.filter((article) => {
      const matchesFilter =
        activeFilter === "all" || article.category === activeFilter;
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [newsData, searchQuery, activeFilter]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, activeFilter]);

  return (
    <div className="news-page">
      <Seo {...PAGE_SEO.news} />

      {/* Hero */}
      <section className="news-hero">
        <div className="news-hero-bg" aria-hidden="true" />
        <div className="news-hero-content">
          <span className="news-hero-badge">News & Updates</span>
          <h1>ताज़ा समाचार</h1>
          <p>
            एनजीओ, सामाजिक कार्य और समुदाय विकास से जुड़ी ताज़ा खबरें — निस्वार्थ
            प्रयास और भारत भर से
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="news-toolbar">
        <div className="news-toolbar-inner">
          <div className="news-search-wrap">
            <span className="news-search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              className="news-search"
              placeholder="समाचार खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search news"
            />
          </div>
          <div className="news-filters" role="tablist" aria-label="News categories">
            {NEWS_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={`news-filter-btn ${
                  activeFilter === filter.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        {usingFallback && !loading && (
          <p className="news-fallback-notice">
            Live feed unavailable — showing Nishwarthaprayas updates.{" "}
            <Link to="/india-ngo-contact">Contact us</Link> to share your story.
          </p>
        )}
      </section>

      {/* Content */}
      <section className="news-content">
        {loading ? (
          <NewsSkeleton />
        ) : filteredNews.length === 0 ? (
          <div className="news-empty">
            <span className="news-empty-icon">📰</span>
            <h2>कोई समाचार नहीं मिला</h2>
            <p>अलग कीवर्ड या श्रेणी आज़माएं।</p>
            <button
              type="button"
              className="news-reset-btn"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
            >
              फ़िल्टर हटाएं
            </button>
          </div>
        ) : (
          <>
            <p className="news-count">
              {filteredNews.length} समाचार {searchQuery && `"${searchQuery}" के लिए`}
            </p>
            <div className="news-grid">
              {visibleNews.map((article, index) => {
                const isInternal = article.url.startsWith("/");
                const CardWrapper = isInternal ? Link : "a";
                const linkProps = isInternal
                  ? { to: article.url }
                  : {
                      href: article.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    };

                return (
                  <ScrollReveal key={article.id} delay={(index % 3) * 100}>
                    <CardWrapper {...linkProps} className="news-card">
                      <div className="news-card-image-wrap">
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = bg;
                          }}
                        />
                        <span className="news-card-category">
                          {NEWS_FILTERS.find((f) => f.id === article.category)
                            ?.label || "News"}
                        </span>
                      </div>
                      <div className="news-card-body">
                        <time className="news-card-date" dateTime={article.published}>
                          {formatNewsDate(article.published)}
                        </time>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <span className="news-card-link">
                          {isInternal ? "और पढ़ें →" : "Read More →"}
                        </span>
                      </div>
                    </CardWrapper>
                  </ScrollReveal>
                );
              })}
            </div>

            {hasMore && (
              <div className="news-load-more-wrap">
                <button
                  type="button"
                  className="news-load-more-btn"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                >
                  और समाचार देखें ({filteredNews.length - visibleCount} बाकी)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="news-cta">
        <div className="news-cta-inner">
          <h2>अपनी खबर साझा करें</h2>
          <p>
            क्या आपके पास सामाजिक कार्य या एनजीओ से जुड़ी कोई खबर है? हमसे संपर्क
            करें।
          </p>
          <div className="news-cta-actions">
            <Link to="/india-ngo-contact" className="news-cta-btn news-cta-btn--primary">
              Contact Us
            </Link>
            <a
              href={`https://wa.me/${config.primaryPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="news-cta-btn news-cta-btn--outline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsBlog;
