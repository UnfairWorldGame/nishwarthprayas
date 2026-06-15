const config = {
  dialogflowApiUrl: "https://api.dialogflow.com/v1/query",
  sessionId: "1234567890",
  apiToken: process.env.REACT_APP_DIALOGFLOW_TOKEN || "",
  // In dev, use same-origin requests so CRA proxy avoids CORS (see package.json "proxy")
  serverUrl:
    process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === "development"
      ? ""
      : "https://nishwarthprayas.onrender.com"),
  primaryPhone: "8173893121",
  secondaryPhone: "7985935817",
  newsApiKey: process.env.REACT_APP_NEWS_API_KEY || "",
  // Donation details — update with your NGO's actual payment info
  donationUpiId: process.env.REACT_APP_DONATION_UPI || "nishwarthaprays@upi",
  donationAccountHolder: process.env.REACT_APP_DONATION_HOLDER || "Nishwarth Prayas",
  donationBankName: process.env.REACT_APP_DONATION_BANK || "State Bank of India",
  donationAccountNumber: process.env.REACT_APP_DONATION_ACCOUNT || "000000000000",
  donationIfsc: process.env.REACT_APP_DONATION_IFSC || "SBIN0000000",
  razorpayKeyId: process.env.REACT_APP_RAZORPAY_KEY_ID || "",
  /** WhatsApp link uses country code */
  whatsappPhone:
    process.env.REACT_APP_WHATSAPP_PHONE ||
    `91${process.env.REACT_APP_PRIMARY_PHONE || "8173893121"}`,
};

export function getWhatsAppUrl(message = "") {
  const base = `https://wa.me/${config.whatsappPhone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function isDonationBankConfigured() {
  const account = config.donationAccountNumber || "";
  const ifsc = config.donationIfsc || "";
  return (
    account.length >= 6 &&
    !/^0+$/.test(account) &&
    ifsc.length >= 8 &&
    ifsc !== "SBIN0000000"
  );
}

export function isDonationUpiConfigured() {
  const upi = config.donationUpiId || "";
  return upi.length > 3 && !upi.endsWith("@upi") && upi !== "nishwarthaprays@upi";
}

export default config;
