import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://prologapp.com/prolog/api/v3";
const BACKEND_URL = "http://localhost:5016";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

let apiToken: string | null = null;

async function fetchApiToken() {
  try {
    if (!apiToken) {
      const response = await fetch(`${BACKEND_URL}/api/token`);
      if (!response.ok) {
        throw new ApiError('Failed to fetch API token', response.status);
      }
      const data = await response.json();
      if (!data.token) {
        throw new ApiError('Invalid token response from backend');
      }
      apiToken = data.token;
    }
    return apiToken;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to connect to backend service');
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await fetchApiToken();
      if (token) {
        config.headers["x-prolog-api-token"] = token;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(new ApiError('Request configuration failed:', error.response?.data))
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      throw new ApiError(`API request failed with status ${status}`, status, data);
    } else if (error.request) {
      throw new ApiError('No response from API');
    } else {
      throw new ApiError('Error setting up API request');
    }
  }
);

export default api;
