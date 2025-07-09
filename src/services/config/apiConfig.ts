// API Configuration
// Central place to manage all API endpoints and settings

export const API_CONFIG = {
  // Development/Mock Settings
  USE_MOCK_DATA: true, // Set to false when ready for real APIs
  
  // Real API Endpoints (configure when ready)
  ENDPOINTS: {
    // Travel Search APIs
    AMADEUS_BASE: 'https://api.amadeus.com/v1',
    SKYSCANNER_BASE: 'https://partners.api.skyscanner.net/apiservices',
    
    // AI Services  
    OPENAI_BASE: 'https://api.openai.com/v1',
    PERPLEXITY_BASE: 'https://api.perplexity.ai',
    
    // Location Services
    GOOGLE_PLACES_BASE: 'https://maps.googleapis.com/maps/api/place',
    MAPBOX_BASE: 'https://api.mapbox.com',
  },
  
  // Mock Data Settings
  MOCK_DELAYS: {
    SEARCH: 1500,      // Simulate search delay
    FLIGHTS: 2000,     // Simulate flight search delay
    RECOMMENDATIONS: 1000, // Simulate AI recommendations delay
  },
  
  // Rate Limiting (for real APIs)
  RATE_LIMITS: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
  },
  
  // Cache Settings
  CACHE: {
    DESTINATIONS_TTL: 3600,    // 1 hour
    FLIGHTS_TTL: 300,          // 5 minutes  
    RECOMMENDATIONS_TTL: 1800, // 30 minutes
  }
};

// API Key Management
// For development: keys can be stored here if they're publishable
// For production: use Supabase Edge Function Secrets
export const getApiKey = (service: string): string => {
  // TODO: Replace with Supabase secrets or environment management
  const keys: Record<string, string> = {
    // Add your publishable API keys here
    // NEVER add private keys to frontend code
    'google-maps': 'your-google-maps-key',
    'mapbox': 'your-mapbox-key',
  };
  
  return keys[service] || '';
};

// Service Factory
// Easy way to switch between mock and real implementations
export const createApiService = <T>(mockService: T, realService: T): T => {
  return API_CONFIG.USE_MOCK_DATA ? mockService : realService;
};

/*
USAGE EXAMPLES:
==============

1. In your components:
```typescript
import { createApiService } from '../services/config/apiConfig';
import { mockTravelApi } from '../services/mock/mockTravelApi';
import { realTravelApi } from '../services/api/realTravelApi';

const travelApi = createApiService(mockTravelApi, realTravelApi);
```

2. To switch to real APIs:
```typescript
// Change this in apiConfig.ts:
USE_MOCK_DATA: false
```

3. For API keys in production:
```typescript
// In Supabase Edge Function:
const apiKey = Deno.env.get('TRAVEL_API_KEY');
```
*/