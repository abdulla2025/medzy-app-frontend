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

// Centralized API service
export const apiService = {
  // Generic fetch wrapper
  async request(endpoint, options = {}) {
    const url = createApiUrl(endpoint);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Common API methods
  get: (endpoint, headers = {}) => apiService.request(endpoint, { method: 'GET', headers }),
  post: (endpoint, data, headers = {}) => apiService.request(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(data), 
    headers 
  }),
  put: (endpoint, data, headers = {}) => apiService.request(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(data), 
    headers 
  }),
  delete: (endpoint, headers = {}) => apiService.request(endpoint, { method: 'DELETE', headers })
};

// Export API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SESSION_CHECK: 'auth/session-check',
  ME: 'auth/me',
  SIGNIN: 'auth/signin',
  SIGNUP: 'auth/signup',
  LOGOUT: 'auth/logout',
  
  // Donation endpoints
  MY_DONATIONS: 'donations/my-donations',
  BROWSE_DONATIONS: 'donations/browse',
  SUBMIT_DONATION: 'donations/submit',
  REQUEST_DONATION: 'donations',
  
  // Medicine endpoints
  MEDICINES_SEARCH: 'medicines/search',
  MEDICINES_CATEGORIES: 'medicines/categories',
  MEDICINES_DATA: 'medicines/data/categories',
  MEDICINES_VENDOR: 'medicines/vendor-medicines',
  MEDICINES: 'medicines',
  
  // Cart endpoints
  CART_ADD: 'cart/add',
  
  // Other endpoints
  HEALTH: 'health',
  MEDICINE_REQUESTS_ALL: 'medicine-requests/all'
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
