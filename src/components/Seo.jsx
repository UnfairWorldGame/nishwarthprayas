import { Helmet } from "react-helmet";
import {
  SITE,
  DEFAULT_KEYWORDS,
  buildTitle,
  getCanonicalUrl,
  getOrganizationSchema,
  getWebPageSchema,
} from "./seoConfig";

/**
 * Central SEO component — use on every public page.
 * @param {string} title - Page title (brand suffix added automatically)
 * @param {string} description - Meta description (150–160 chars ideal)
 * @param {string} path - Route path e.g. "/ngo-donate"
 * @param {string} [keywords] - Optional comma-separated keywords
 * @param {string} [image] - OG/Twitter image URL
 * @param {string} [type] - og:type — website | article
 * @param {boolean} [noindex] - Block search indexing (admin, 404)
 * @param {object|object[]} [structuredData] - JSON-LD schema(s)
 * @param {boolean} [includeOrgSchema] - Add Organization schema (homepage)
 */
function Seo({
  title,
  description,
  path = "/",
  keywords = DEFAULT_KEYWORDS,
  image = SITE.ogImage,
  type = "website",
  noindex = false,
  structuredData,
  includeOrgSchema = false,
}) {
  const fullTitle = buildTitle(title);
  const canonical = getCanonicalUrl(path);
  const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  const schemas = [];
  if (includeOrgSchema) schemas.push(getOrganizationSchema());
  if (structuredData) {
    schemas.push(
      ...(Array.isArray(structuredData) ? structuredData : [structuredData])
    );
  }
  if (!noindex && path !== "/") {
    schemas.push(getWebPageSchema({ path, title: fullTitle, description }));
  }

  return (
    <Helmet htmlAttributes={{ lang: "hi" }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="author" content={`${SITE.nameEn} — ${SITE.tagline}`} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.nameEn} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;
