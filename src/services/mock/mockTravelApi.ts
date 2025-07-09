// Mock Travel API Service
// TODO: Replace with real API implementation when ready
// See src/services/README.md for integration instructions

export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  price: string;
  image: string;
  description: string;
  tags: string[];
  rating: number;
  reviews: number;
  emotionalMatch?: string; // AI-determined emotional match
}

export interface FlightResult {
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
  emotionalContext?: string;
}

// Mock AI-powered search function
export const searchDestinationsByEmotion = async (emotionalQuery: string): Promise<Destination[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock emotional analysis and destination matching
  const allDestinations: Destination[] = [
    {
      id: '1',
      name: 'Bali, Indonesia',
      location: 'Ubud',
      country: 'Indonesia',
      price: '$1,299',
      image: '/lovable-uploads/92794f25-53c0-4644-af8d-3e9343c68684.png',
      description: 'Find peace and healing in Bali\'s spiritual heart. Perfect for reflection and new beginnings.',
      tags: ['Healing', 'Spiritual', 'Nature', 'Wellness'],
      rating: 4.8,
      reviews: 2847,
      emotionalMatch: 'heartbreak'
    },
    {
      id: '2',
      name: 'Tokyo, Japan',
      location: 'Shibuya',
      country: 'Japan',
      price: '$1,899',
      image: '/lovable-uploads/e2c6c5a8-65a5-4005-976d-25a14867e43e.png',
      description: 'Lose yourself in Tokyo\'s vibrant energy. Perfect for adventure and distraction.',
      tags: ['Adventure', 'City', 'Culture', 'Food'],
      rating: 4.9,
      reviews: 3521,
      emotionalMatch: 'excitement'
    },
    {
      id: '3',
      name: 'Santorini, Greece',
      location: 'Oia',
      country: 'Greece',
      price: '$2,199',
      image: '/lovable-uploads/18aa8cb3-7178-47f3-b218-3aa6b8687db5.png',
      description: 'Breathtaking sunsets and romantic vibes. Ideal for celebration or romance.',
      tags: ['Romance', 'Sunset', 'Luxury', 'Relaxation'],
      rating: 4.7,
      reviews: 1923,
      emotionalMatch: 'romance'
    }
  ];

  // Simple emotion-based filtering (replace with real AI)
  const query = emotionalQuery.toLowerCase();
  
  if (query.includes('heartbroken') || query.includes('sad') || query.includes('broken up')) {
    return allDestinations.filter(d => d.emotionalMatch === 'heartbreak');
  }
  
  if (query.includes('excited') || query.includes('adventure') || query.includes('energy')) {
    return allDestinations.filter(d => d.emotionalMatch === 'excitement');
  }
  
  if (query.includes('romantic') || query.includes('love') || query.includes('celebrate')) {
    return allDestinations.filter(d => d.emotionalMatch === 'romance');
  }

  // Default: return all destinations
  return allDestinations;
};

// Mock flight search function
export const searchFlights = async (destination: string, emotionalContext?: string): Promise<FlightResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const mockFlights: FlightResult[] = [
    {
      id: 'f1',
      airline: 'Singapore Airlines',
      flightNumber: 'SQ 285',
      departure: {
        airport: 'JFK',
        city: 'New York',
        time: '10:30 AM',
        date: '2024-02-15'
      },
      arrival: {
        airport: 'DPS',
        city: 'Denpasar',
        time: '11:45 PM',
        date: '2024-02-16'
      },
      duration: '22h 15m',
      price: 1299,
      currency: 'USD',
      stops: 1,
      aircraft: 'Boeing 777',
      emotionalContext: emotionalContext
    },
    {
      id: 'f2',
      airline: 'JAL',
      flightNumber: 'JL 006',
      departure: {
        airport: 'LAX',
        city: 'Los Angeles',
        time: '11:55 PM',
        date: '2024-02-15'
      },
      arrival: {
        airport: 'NRT',
        city: 'Tokyo',
        time: '5:05 AM',
        date: '2024-02-17'
      },
      duration: '11h 10m',
      price: 1899,
      currency: 'USD',
      stops: 0,
      aircraft: 'Boeing 787',
      emotionalContext: emotionalContext
    }
  ];

  return mockFlights;
};

// Mock function to get personalized recommendations
export const getPersonalizedRecommendations = async (userProfile: any): Promise<Destination[]> => {
  // TODO: Replace with real AI recommendation engine
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock personalized results
  return searchDestinationsByEmotion('adventure');
};

/*
INTEGRATION NOTES:
================

To replace with real APIs:

1. Update searchDestinationsByEmotion():
   - Replace with real AI API (OpenAI, Claude, etc.)
   - Send emotional query to AI for destination analysis
   - Return real destination data from travel APIs

2. Update searchFlights():
   - Replace with real flight API (Amadeus, Skyscanner, etc.)
   - Use actual flight search parameters
   - Return real-time flight availability and pricing

3. Update getPersonalizedRecommendations():
   - Implement user profiling and preferences
   - Use machine learning for better recommendations
   - Store user interaction data for improving suggestions

4. Add error handling:
   - Network failures
   - API rate limits
   - Invalid responses
   - Timeout handling

5. Add caching:
   - Cache frequent searches
   - Store popular destinations
   - Implement cache invalidation

Example real implementation structure:
```typescript
const TRAVEL_API_KEY = 'your-api-key';
const AI_API_KEY = 'your-ai-key';

export const searchDestinationsByEmotion = async (query: string) => {
  // 1. Send to AI for emotional analysis
  const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: { 'Authorization': `Bearer ${AI_API_KEY}` },
    // ... AI prompt for destination matching
  });
  
  // 2. Search travel APIs based on AI suggestions
  const travelResponse = await fetch('https://travel-api.com/search', {
    headers: { 'Authorization': `Bearer ${TRAVEL_API_KEY}` },
    // ... search parameters
  });
  
  return travelResponse.json();
};
```
*/