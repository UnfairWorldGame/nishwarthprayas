export const SITE = {
  name: "निस्वार्थ प्रयास",
  nameEn: "Nishwarth Prayas",
  tagline: "एक कदम मानवता की ओर",
  url: "https://farrukhabadngo.com",
  ogImage: "https://farrukhabadngo.com/fevicon.ico",
  locale: "hi_IN",
  email: "nishwarthaprays@gmail.com",
  phone: "+918173893121",
  whatsapp: "918173893121",
  facebook: "https://m.facebook.com/nirottamSinghrajput81",
  founded: "2014",
  address: {
    street: "Rampur Chilsara Road, Ramapur Dhaparpur",
    locality: "Farrukhabad",
    region: "Uttar Pradesh",
    postalCode: "209625",
    country: "IN",
  },
};

export const DEFAULT_KEYWORDS =
  "ngo farrukhabad, ngo kanpur, ngo uttar pradesh, nishwarth prayas, social work india, donate ngo, volunteer ngo, free coaching, women empowerment, rural development, disaster relief, charity farrukhabad";

export function getCanonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE.url}/`;
  return `${SITE.url}${normalized.replace(/\/+$/, "")}`;
}

export function buildTitle(pageTitle) {
  if (!pageTitle) return `${SITE.name} | ${SITE.tagline}`;
  if (pageTitle.includes(SITE.name) || pageTitle.includes(SITE.nameEn)) {
    return pageTitle;
  }
  return `${pageTitle} | ${SITE.name}`;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE.nameEn,
    alternateName: SITE.name,
    url: SITE.url,
    logo: SITE.ogImage,
    description:
      "Non-profit organization in Farrukhabad, Uttar Pradesh — free coaching, disaster relief, women empowerment, and rural development since 2014.",
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { "@type": "City", name: "Farrukhabad" },
      { "@type": "City", name: "Kanpur" },
    ],
    sameAs: [SITE.facebook],
  };
}

export function getWebPageSchema({ path, title, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: getCanonicalUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE.nameEn,
      url: SITE.url,
    },
    inLanguage: ["hi-IN", "en-IN"],
  };
}

export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export const PAGE_SEO = {
  home: {
    path: "/",
    title: `${SITE.name} | ${SITE.tagline}`,
    description:
      "Nishwarth Prayas is a Farrukhabad NGO serving Uttar Pradesh since 2014 — free coaching, disaster relief, women empowerment, rural development, and community programs in Farrukhabad & Kanpur.",
    keywords: DEFAULT_KEYWORDS,
  },
  about: {
    path: "/india-ngo-about",
    title: "About Us",
    description:
      "Learn about Nishwarth Prayas NGO — our mission, values, team, and 12+ years of social work in Farrukhabad and Kanpur, Uttar Pradesh.",
  },
  contact: {
    path: "/india-ngo-contact",
    title: "Contact Us",
    description:
      "Contact Nishwarth Prayas NGO in Farrukhabad — call, WhatsApp, or message us to volunteer, donate, or join community programs.",
  },
  services: {
    path: "/ngo-service-page",
    title: "NGO Work & Services",
    description:
      "Explore Nishwarth Prayas programs — free coaching, clothing distribution, disaster relief, women empowerment, and rural development in UP.",
  },
  connect: {
    path: "/online-connectus",
    title: "Join Us — Volunteer & Connect",
    description:
      "Join Nishwarth Prayas as a volunteer, donor, or partner. Help with education, relief work, and community development in Farrukhabad.",
  },
  family: {
    path: "/ngo-family-page",
    title: "NGO Family",
    description:
      "Meet the Nishwarth Prayas family — volunteers and community members driving social change across Farrukhabad and Kanpur.",
  },
  news: {
    path: "/ngo-latest-news-blog",
    title: "Latest News & Updates",
    description:
      "Latest NGO news, social work updates, and community initiatives from Nishwarth Prayas in Farrukhabad, Uttar Pradesh.",
  },
  blog: {
    path: "/ngo-blog",
    title: "NGO Blog & Guides",
    description:
      "NGO guides for India — registration, funding, volunteering, authenticity checks, and legal requirements by Nishwarth Prayas.",
  },
  donate: {
    path: "/ngo-donate",
    title: "Donate — Support Social Work",
    description:
      "Donate to Nishwarth Prayas via UPI, bank transfer, or online payment. Support education, relief, and community programs in Farrukhabad.",
  },
  chatbot: {
    path: "/ngo-ai-chat-bot",
    title: "AI Chat Assistant",
    description:
      "Ask questions about Nishwarth Prayas NGO programs, volunteering, donations, and community services in Farrukhabad.",
  },
  notFound: {
    path: "/404",
    title: "Page Not Found",
    description: "The page you are looking for does not exist on Nishwarth Prayas NGO website.",
  },
};
