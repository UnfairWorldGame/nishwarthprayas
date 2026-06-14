const config = {
  dialogflowApiUrl: "https://api.dialogflow.com/v1/query",
  sessionId: "1234567890",
  apiToken: process.env.REACT_APP_DIALOGFLOW_TOKEN || "",
  serverUrl:
    process.env.REACT_APP_API_URL || "https://nishwarthprayas.onrender.com",
  primaryPhone: "8173893121",
  secondaryPhone: "7985935817",
  newsApiKey: process.env.REACT_APP_NEWS_API_KEY || "",
};

export default config;
