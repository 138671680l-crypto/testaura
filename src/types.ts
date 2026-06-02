export interface Edition {
  id: string;
  name: string;
  tagline: string;
  description: string;
  material: string;
  colorHex: string;
  imageAlt: string;
  unsplashUrl: string;
  features: string[];
}

export interface StoryScenario {
  id: string;
  title: string;
  description: string;
  timeOfDay: string;
  unsplashUrl: string;
}

export interface CartItem {
  edition: Edition;
  quantity: number;
  engraving?: string;
  frequency?: string;
}

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  email: string;
  companionStatus?: {
    assignedId: string;
    editionName: string;
    heartbeatSync: number;
    batteryLevel: number;
    status: 'serene' | 'synchronizing' | 'offline';
  };
}

