# API Services Documentation

## Overview
This directory contains all API service integrations for the travel app. The code is organized to make it easy to swap between mock data and real API implementations.

## Current Structure

### Mock Services (Current Implementation)
- **Location**: `src/services/mock/`
- **Purpose**: Provides static data for development and testing
- **Files**:
  - `mockTravelApi.ts` - Mock travel search results
  - `mockFlightData.ts` - Static flight data

### Real API Services (Ready for Integration)
- **Location**: `src/services/api/`
- **Purpose**: Real API implementations (to be implemented)
- **Files** (create when ready):
  - `travelApi.ts` - Real travel search API
  - `flightApi.ts` - Real flight booking API
  - `aiApi.ts` - AI travel recommendation API

## How to Swap APIs

### 1. Replace Mock with Real APIs

**Step 1**: Create your real API service file
```typescript
// src/services/api/travelApi.ts
export const searchDestinations = async (query: string) => {
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${YOUR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  });
  return response.json();
};
```

**Step 2**: Update the import in components
```typescript
// Change this:
import { searchDestinations } from '../services/mock/mockTravelApi';

// To this:
import { searchDestinations } from '../services/api/travelApi';
```

### 2. Environment Variables
If using Supabase (recommended):
- Add API keys to Supabase Edge Function Secrets
- Access them in your edge functions

If not using Supabase:
- Store publishable keys directly in code
- For private keys, use localStorage input fields

### 3. Flight Results Structure

Expected data format for flight results:
```typescript
interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  currency: string;
  stops: number;
  aircraft: string;
}
```

## Files to Update When Integrating Real APIs

### Core Components
1. **Search Interface**: `src/components/ExpandableSearch.tsx`
   - Line 66: Update `onSearchSubmit` function
   - Replace mock API call with real API

2. **Results Display**: `src/pages/Chat.tsx`
   - Update data fetching logic
   - Handle real API responses

3. **Destinations Page**: `src/pages/Destinations.tsx`
   - Replace static data with API calls
   - Update filtering and search logic

### Data Flow
```
User Input → ExpandableSearch → API Service → Results Display
```

## Integration Checklist

### Before Going Live:
- [ ] Replace mock APIs with real implementations
- [ ] Add proper error handling
- [ ] Implement loading states
- [ ] Add API key management
- [ ] Test all user flows
- [ ] Update TypeScript interfaces
- [ ] Add rate limiting if needed
- [ ] Implement caching strategy

### Security Notes:
- Never store private API keys in frontend code
- Use Supabase Edge Functions for server-side API calls
- Validate all user inputs before API calls
- Implement proper CORS handling

## API Providers Suggested
- **Flight Search**: Amadeus, Skyscanner, Kayak APIs
- **Hotel Search**: Booking.com, Expedia APIs  
- **AI Recommendations**: OpenAI, Anthropic Claude
- **Location Data**: Google Places, MapBox

## Quick Start for Real Implementation

1. Choose your API provider
2. Get API credentials
3. Create service file in `src/services/api/`
4. Update imports in components
5. Test with real data
6. Deploy with Supabase for production

---
*Last updated: Current*
*Next review: When implementing real APIs*