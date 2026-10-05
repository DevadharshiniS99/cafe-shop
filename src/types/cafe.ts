export type MenuCategory = 
  | 'all'
  | 'espresso'
  | 'cold-brew'
  | 'bakery'
  | 'kitchen'
  | 'beans';

export interface CustomizationOptions {
  milks?: string[];
  sizes?: { name: string; extraPrice: number }[];
  temps?: string[];
  grinds?: string[];
  sweetnessLevels?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  tastingNotes?: string[];
  origin?: string;
  elevation?: string;
  dietary?: ('dairy-free-opt' | 'vegan' | 'gluten-free' | 'organic' | 'signature')[];
  inStock: boolean;
  isSeasonal?: boolean;
  customization?: CustomizationOptions;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  selectedMilk?: string;
  selectedSize?: string;
  selectedTemp?: string;
  selectedGrind?: string;
  specialNote?: string;
  quantity: number;
  unitPrice: number;
}

export interface ReservationData {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: 'Sunlit Atrium' | 'Barista Counter' | 'Garden Patio' | 'Quiet Reading Nook';
  specialRequests?: string;
  referenceCode: string;
  createdAt: string;
}

export interface BrewGuide {
  id: string;
  name: string;
  ratio: number; // e.g. 1:16 -> 16
  recommendedCoffee: number; // in grams
  grindSize: string;
  tempCelsius: string;
  timeEstimate: string;
  description: string;
  steps: string[];
}
