import g9 from "./images/g9.jpeg";
import a2 from "./images/g3.jpeg";
import m1 from "./images/m1.jpg";
import a3 from "./images/g2.jpeg";
import p3 from "./images/p3.jpeg";
import bg from "./images/bg.jpg";

export const FALLBACK_NEWS = [
  {
    id: "local-1",
    title: "निस्वार्थ प्रयास — फर्रुखाबाद में सामाजिक सेवा का नया अध्याय",
    description:
      "निस्वार्थ प्रयास ने फर्रुखाबाद और आसपास के ग्रामीण क्षेत्रों में शिक्षा, महिला सशक्तिकरण और आपदा राहत कार्यों को और मजबूत किया है।",
    url: "/india-ngo-about",
    image: g9,
    category: "ngo",
    published: new Date().toISOString(),
    source: "Nishwarthaprayas",
  },
  {
    id: "local-2",
    title: "मुफ्त कोचिंग कार्यक्रम — ग्रामीण विद्यार्थियों को नई दिशा",
    description:
      "संस्था द्वारा चलाए जा रहे मुफ्त कोचिंग अभियान से सैकड़ों विद्यार्थियों को उच्च शिक्षा की तैयारी में मार्गदर्शन मिल रहा है।",
    url: "/ngo-service-page",
    image: a2,
    category: "education",
    published: new Date(Date.now() - 86400000 * 3).toISOString(),
    source: "Nishwarthaprayas",
  },
  {
    id: "local-3",
    title: "महिला सशक्तिकरण — ग्रामीण महिलाओं के लिए प्रशिक्षण शिविर",
    description:
      "ग्रामीण क्षेत्रों की महिलाओं को स्वावलंबन और उद्यमिता के लिए प्रशिक्षण दिया जा रहा है, ताकि वे आर्थिक रूप से सशक्त बन सकें।",
    url: "/ngo-service-page",
    image: m1,
    category: "social",
    published: new Date(Date.now() - 86400000 * 7).toISOString(),
    source: "Nishwarthaprayas",
  },
  {
    id: "local-4",
    title: "बाढ़ प्रभावित क्षेत्रों में खाद्य और कपड़ा वितरण",
    description:
      "आपदा प्रभावित परिवारों तक राहत सामग्री पहुँचाने के लिए स्वयंसेवकों की टीम लगातार कार्यरत है।",
    url: "/ngo-service-page",
    image: a3,
    category: "relief",
    published: new Date(Date.now() - 86400000 * 14).toISOString(),
    source: "Nishwarthaprayas",
  },
  {
    id: "local-5",
    title: "सामुदायिक मेला — स्थानीय उद्यमियों को मंच",
    description:
      "निस्वार्थ प्रयास द्वारा आयोजित मेले में स्थानीय व्यापारियों और कलाकारों को अपने उत्पाद प्रदर्शित करने का अवसर मिलता है।",
    url: "/ngo-service-page",
    image: p3,
    category: "social",
    published: new Date(Date.now() - 86400000 * 21).toISOString(),
    source: "Nishwarthaprayas",
  },
  {
    id: "local-6",
    title: "एनजीओ से जुड़ें — स्वयंसेवक बनकर बदलाव लाएं",
    description:
      "समाज सेवा में योगदान देने के इच्छुक लोग हमसे संपर्क कर स्वयंसेवक के रूप में शामिल हो सकते हैं।",
    url: "/online-connectus",
    image: bg,
    category: "ngo",
    published: new Date(Date.now() - 86400000 * 30).toISOString(),
    source: "Nishwarthaprayas",
  },
];

export const NEWS_FILTERS = [
  { id: "all", label: "सभी" },
  { id: "ngo", label: "NGO" },
  { id: "education", label: "शिक्षा" },
  { id: "social", label: "सामाजिक" },
  { id: "relief", label: "राहत कार्य" },
];

export function formatNewsDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return "";
  }
}

export function normalizeArticle(article, fallbackImage) {
  const title = article.title || "";
  const description = article.description || "";
  const text = `${title} ${description}`.toLowerCase();

  let category = "ngo";
  if (/coach|education|school|student|शिक्ष|कोचिंग|विद्य/.test(text)) {
    category = "education";
  } else if (/flood|relief|food|disaster|बाढ़|राहत|खाद/.test(text)) {
    category = "relief";
  } else if (/women|empower|community|social|महिल|सामाज/.test(text)) {
    category = "social";
  }

  return {
    id: article.id || article.url || title,
    title,
    description,
    url: article.url || "#",
    image: article.image || fallbackImage,
    category,
    published: article.published || article.pubDate || new Date().toISOString(),
    source: article.author || article.source || "News",
  };
}
