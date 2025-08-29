// API Configuration for Separate Deployments
const getApiBaseUrl = () => {
  // In production, use your backend Vercel URL
  if (import.meta.env.PROD) {
    return 'https://medzy-app-backend.vercel.app';
  }
  
  // In development, use localhost
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to create full API URLs
export const createApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Export API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SESSION_CHECK: createApiUrl('auth/session-check'),
  ME: createApiUrl('auth/me'),
  SIGNIN: createApiUrl('auth/signin'),
  SIGNUP: createApiUrl('auth/signup'),
  LOGOUT: createApiUrl('auth/logout'),
  
  // Donation endpoints
  MY_DONATIONS: createApiUrl('donations/my-donations'),
  
  // Add other endpoints as needed
  HEALTH: createApiUrl('health'),
};

// External API URLs (these won't change)
export const EXTERNAL_APIS = {
  OLLAMA_GENERATE: 'http://localhost:11434/api/generate',
  OLLAMA_TAGS: 'http://localhost:11434/api/tags',
};

console.log('API Configuration:', {
  API_BASE_URL,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE
});
