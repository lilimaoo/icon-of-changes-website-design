const config = {
  development: {
    apiUrl: "http://localhost:5000",
  },
  production: {
    apiUrl: process.env.API_URL || "https://your-production-domain.com",
  },
};

const environment = process.env.NODE_ENV || "development";
window.API_BASE_URL = config[environment].apiUrl;
