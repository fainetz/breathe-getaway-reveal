import { useState, useCallback } from 'react';

export interface PanelState {
  isLoading: boolean;
  data: any;
  error?: string;
}

export const usePanelUpdates = (initialData: any) => {
  const [panelStates, setPanelStates] = useState<Record<string, PanelState>>({
    flight: { isLoading: false, data: initialData?.flight },
    hotel: { isLoading: false, data: initialData?.hotel },
    activities: { isLoading: false, data: initialData?.thingsToDo },
    ...Object.fromEntries(
      (initialData?.hiddenGems || []).map((_, index: number) => [
        `gem-${index}`,
        { isLoading: false, data: initialData?.hiddenGems?.[index] }
      ])
    ),
    ...Object.fromEntries(
      (initialData?.thingsToDo || []).map((_, index: number) => [
        `activity-${index}`,
        { isLoading: false, data: initialData?.thingsToDo?.[index] }
      ])
    )
  });

  const updatePanel = useCallback(async (panelId: string, prompt: string) => {
    // Set loading state
    setPanelStates(prev => ({
      ...prev,
      [panelId]: { ...prev[panelId], isLoading: true, error: undefined }
    }));

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response based on panel type and prompt
      const updatedData = await generateAIResponse(panelId, prompt, panelStates[panelId]?.data);
      
      // Update with new data
      setPanelStates(prev => ({
        ...prev,
        [panelId]: { isLoading: false, data: updatedData }
      }));

      return updatedData;
    } catch (error) {
      setPanelStates(prev => ({
        ...prev,
        [panelId]: { 
          ...prev[panelId], 
          isLoading: false, 
          error: 'Failed to update. Please try again.' 
        }
      }));
      throw error;
    }
  }, [panelStates]);

  return {
    panelStates,
    updatePanel,
    setPanelStates
  };
};

// Mock AI response generator
const generateAIResponse = async (panelId: string, prompt: string, currentData: any) => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (panelId === 'flight') {
    if (lowerPrompt.includes('luxury') || lowerPrompt.includes('business')) {
      return {
        ...currentData,
        route: "msp → tulum",
        schedule: "friday 6:00pm — sunday return",
        details: "nonstop · business class · united airlines",
        price: "$1,200"
      };
    }
    if (lowerPrompt.includes('cheaper') || lowerPrompt.includes('budget')) {
      return {
        ...currentData,
        route: "msp → cancun",
        schedule: "friday 11:00pm — sunday return",
        details: "1 stop · economy · southwest airlines",
        price: "$320"
      };
    }
  }
  
  if (panelId === 'hotel') {
    if (lowerPrompt.includes('luxury') || lowerPrompt.includes('luxurious')) {
      return {
        ...currentData,
        name: "rosewood mayakoba, riviera maya",
        rating: 4.9,
        description: "overwater suites · michelin dining · private beach",
        price: "$850/night"
      };
    }
    if (lowerPrompt.includes('cheaper') || lowerPrompt.includes('budget')) {
      return {
        ...currentData,
        name: "hostel che tulum",
        rating: 4.2,
        description: "shared dorms · rooftop bar · 10-min to beach",
        price: "$45/night"
      };
    }
  }

  if (panelId.startsWith('gem-')) {
    const gemIndex = parseInt(panelId.split('-')[1]);
    const baseGems = [
      {
        name: "casa jaguar rooftop",
        description: "secret speakeasy above the jungle with craft cocktails",
        type: "nightlife",
        insider_tip: "ask for 'maya' - the secret cocktail not on the menu"
      },
      {
        name: "hartwood restaurant",
        description: "fire-only kitchen in the jungle, no electricity",
        type: "dining",
        insider_tip: "arrive at 5pm for best seating, they don't take reservations"
      },
      {
        name: "gran cenote backyard",
        description: "locals-only swimming spot behind the main cenote",
        type: "adventure",
        insider_tip: "bring snorkel gear - turtles nest here in the mornings"
      }
    ];
    
    return baseGems[gemIndex] || currentData;
  }

  if (panelId.startsWith('activity-')) {
    const activityIndex = parseInt(panelId.split('-')[1]);
    if (lowerPrompt.includes('relaxing') || lowerPrompt.includes('spa')) {
      const relaxedActivities = [
        {
          title: "beachside massage",
          description: "professional massage overlooking the caribbean sea",
          time: "10:00 am",
          icon: "spa"
        },
        {
          title: "yoga at sunrise",
          description: "guided meditation and yoga practice on the beach",
          time: "6:30 am",
          icon: "sunrise"
        },
        {
          title: "cenote floating therapy",
          description: "therapeutic floating in crystal clear cenote waters",
          time: "2:00 pm",
          icon: "swim"
        }
      ];
      return relaxedActivities[activityIndex] || currentData;
    }
  }

  // Return enhanced version of current data
  return {
    ...currentData,
    enhanced: true,
    updatedAt: new Date().toISOString()
  };
};