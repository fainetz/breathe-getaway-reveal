# API Integration Guide

## Quick Setup Checklist

### ✅ Current Status: Mock Data Ready
- [x] Mock travel search implemented
- [x] Mock flight data structure ready  
- [x] Code organized for easy API swapping
- [x] TypeScript interfaces defined

### 🔄 Next Steps: Real API Integration

#### 1. Choose Your APIs

**Flight Search Options:**
- **Amadeus** (recommended) - Comprehensive flight data
- **Skyscanner** - Popular flight comparison
- **Kayak** - Alternative flight search

**AI Recommendation Options:**
- **OpenAI GPT-4** - Natural language processing
- **Anthropic Claude** - Advanced reasoning
- **Perplexity** - Real-time web search

#### 2. Get API Credentials
1. Sign up for chosen API providers
2. Get API keys and credentials
3. Note rate limits and pricing

#### 3. Setup Supabase (Recommended)
1. Connect your project to Supabase
2. Add API keys to Edge Function Secrets
3. Create edge functions for API calls

#### 4. Code Integration

**Step 1: Update API Config**
```typescript
// src/services/config/apiConfig.ts
export const API_CONFIG = {
  USE_MOCK_DATA: false, // Switch to real APIs
  // ... rest stays the same
};
```

**Step 2: Create Real API Service**
```typescript
// src/services/api/travelApi.ts
import { Destination, FlightResult } from '../mock/mockTravelApi';

export const searchDestinationsByEmotion = async (query: string): Promise<Destination[]> => {
  // Your real AI + travel API implementation
  const response = await fetch('/api/search-destinations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return response.json();
};
```

**Step 3: Create Supabase Edge Function**
```typescript
// supabase/functions/search-destinations/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { query } = await req.json();
  
  // Use your API keys from Supabase secrets
  const aiApiKey = Deno.env.get('OPENAI_API_KEY');
  const travelApiKey = Deno.env.get('AMADEUS_API_KEY');
  
  // Your AI + travel API logic here
  
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

#### 5. Testing

**Step 1: Test with Mock Data**
- Verify all UI flows work
- Check error handling
- Test loading states

**Step 2: Test with Real APIs**  
- Start with simple API calls
- Add error handling
- Monitor rate limits

**Step 3: Production Testing**
- Test with real user scenarios
- Monitor API costs
- Check performance

## File Organization

### Easy Swap Locations

**Main Search Component:**
- File: `src/components/ExpandableSearch.tsx`
- Line: 66 - `onSearchSubmit` function
- Change: Update to call real API

**Chat Interface:**
- File: `src/pages/Chat.tsx`  
- Search for: `mockTravelApi` imports
- Change: Replace with real API imports

**Destinations Page:**
- File: `src/pages/Destinations.tsx`
- Search for: Static destination data
- Change: Replace with API calls

### Data Structures (Already Defined)

All TypeScript interfaces are ready in:
- `src/services/mock/mockTravelApi.ts`
- Keep the same structure for real APIs

## Security Best Practices

### ✅ Safe for Frontend
- Google Maps API keys (with domain restrictions)
- Mapbox public tokens
- Any "publishable" keys

### ❌ Never in Frontend
- Private API keys
- Secret tokens
- Database credentials

### 🔐 Use Supabase for Private Keys
```typescript
// In Supabase Edge Function only:
const privateKey = Deno.env.get('PRIVATE_API_KEY');
```

## Cost Management

### Monitor Usage
- Set up API usage alerts
- Implement caching to reduce calls
- Add rate limiting to prevent abuse

### Optimization Tips
1. Cache frequent searches
2. Batch API requests when possible  
3. Use cheaper AI models for simple tasks
4. Implement request deduplication

## Deployment Checklist

Before going live:
- [ ] All API keys secured in Supabase
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Rate limiting in place
- [ ] Caching strategy implemented
- [ ] Cost monitoring setup
- [ ] Performance tested
- [ ] User flows validated

## Emergency Rollback

If APIs fail in production:
```typescript
// Quick rollback to mock data:
// src/services/config/apiConfig.ts
USE_MOCK_DATA: true // Emergency fallback
```

---

**Need Help?**
- Check `src/services/README.md` for detailed code instructions
- Review mock implementations for data structure reference
- Test thoroughly with mock data before API integration

**Last Updated:** Current
**Next Review:** When implementing real APIs