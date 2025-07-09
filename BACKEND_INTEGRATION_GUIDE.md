# Backend Integration Guide

This guide outlines where to integrate your backend logic into the existing frontend code.

## 1. Search Bar Submit Logic

**File:** `src/components/ExpandableSearch.tsx`
**Function to replace:** `handleSubmit` (lines 52-61)

```typescript
// REPLACE THIS FUNCTION:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!prompt.trim()) return;

  if (onSearchSubmit) {
    onSearchSubmit(prompt);
    setPrompt('');
  }
};

// WITH YOUR BACKEND LOGIC:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!prompt.trim()) return;

  // Add your backend API call here
  // Example: const response = await fetch('/api/search', { method: 'POST', body: JSON.stringify({ query: prompt }) });
  // Process response and navigate or update state accordingly
  
  if (onSearchSubmit) {
    onSearchSubmit(prompt);
    setPrompt('');
  }
};
```

## 2. Chat/Search Interface Logic

**File:** `src/components/TravelChatInterface.tsx`
**What to replace:** The entire chat message handling and response logic

**Key areas to modify:**
- Message sending logic
- Response generation (replace with your Langchain integration)
- Chat history management
- Real-time typing indicators

**File:** `src/pages/Chat.tsx`
**What to replace:** Any placeholder chat logic and state management

## 3. Destination Cards Population

**File:** `src/pages/Destinations.tsx`
**Data to replace:** `destinations` array (lines 36-274)

```typescript
// REPLACE THIS HARDCODED ARRAY:
const destinations: Destination[] = [
  // ... hardcoded destination objects
];

// WITH YOUR BACKEND DATA FETCHING:
const [destinations, setDestinations] = useState<Destination[]>([]);

useEffect(() => {
  const fetchDestinations = async () => {
    // Add your API call here
    // const response = await fetch('/api/destinations');
    // const data = await response.json();
    // setDestinations(data);
  };
  
  fetchDestinations();
}, []);
```

## 4. Full Screen Destination View Integration

**File:** `src/components/FullScreenDestination.tsx`
**Function to modify:** `handleSearchFlights` (lines 135-138)

Replace the current navigation logic with your flight search API integration.

## 5. Additional Integration Points

### Search Results Population
- **File:** Any search results components
- **Action:** Replace mock data with real API responses

### User Authentication (if needed)
- **Files:** App-wide authentication state
- **Action:** Integrate with your auth backend

### Booking/Cart Functionality
- **File:** `src/pages/Cart.tsx`
- **Action:** Connect to your booking/payment backend

### Real-time Features
- **Files:** Any components with real-time updates
- **Action:** Integrate WebSocket or Server-Sent Events for real-time communication

## Implementation Tips

1. **Environment Variables:** Use Supabase secrets for API keys and endpoints
2. **Error Handling:** Add proper error boundaries and user feedback
3. **Loading States:** Implement loading indicators for better UX
4. **Data Validation:** Validate all backend responses before using in components
5. **Caching:** Consider implementing data caching for better performance

## Testing Your Integration

1. Test search functionality with various queries
2. Verify chat responses are generated correctly
3. Ensure destination data loads properly
4. Test error scenarios (network failures, invalid responses)
5. Verify all navigation and state transitions work correctly