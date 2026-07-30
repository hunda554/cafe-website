import { MenuItem, CustomerReview, GalleryPhoto, RestaurantInfo } from '../types';

import neonHeroImg from '../assets/images/yo_burger_neon_hero_1785284479784.jpg';
import wrapDishImg from '../assets/images/yo_burger_wrap_dish_1785284488718.jpg';
import fusionPizzaImg from '../assets/images/yo_burger_fusion_pizza_1785284501474.jpg';
import clubSandwichImg from '../assets/images/yo_burger_club_sandwich_1785284512093.jpg';
import gourmetBurgerImg from '../assets/images/yo_burger_gourmet_burger_1785284522971.jpg';
import ambianceImg from '../assets/images/yo_burger_ambiance_1785284537438.jpg';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "YO BURGER & RESTAURANT",
  tagline: "Taste is Everything.",
  address: "Main Thoroughfare near Post Office, Adama (Nazret)",
  city: "Adama, Oromia",
  country: "Ethiopia",
  plusCode: "G7Q5+QPG, Adama, Ethiopia",
  phone: "+251 91 123 4567",
  whatsapp: "251911234567",
  instagram: "@yo_burger_adama",
  hours: "Open Daily 8:00 AM – 11:30 PM",
  quote: "OUR WAY, not McDonald's way — Burger WHEN IT IS EVERYTHING."
};

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: "yb-101",
    name: "Yo Signature Double Monster",
    description: "Two prime Ethiopian beef patties, melted cheddar & mozzarella, crispy bacon, house smoked barbecue reduction, caramelized onions, and signature red sauce on toasted sesame brioche.",
    price: 480,
    category: "Burgers",
    image: gourmetBurgerImg,
    isPopular: true,
    isSpicy: false,
    isAvailable: true,
    tags: ["Chef Special", "100% Ethiopian Beef", "Best Seller"],
    options: ["Single Patty (-80 ETB)", "Double Patty (Standard)", "Triple Patty (+120 ETB)"]
  },
  {
    id: "yb-102",
    name: "Adama Fire Crack Burger",
    description: "Flame-grilled beef patty infused with Mitmita spice, grilled jalapeños, fiery habanero mayo, pepper jack cheese, and crispy fried onion rings.",
    price: 420,
    category: "Burgers",
    image: neonHeroImg,
    isPopular: true,
    isSpicy: true,
    isAvailable: true,
    tags: ["Spicy", "Mitmita Infused"],
    options: ["Mild Spicy", "Extra Hot Mitmita"]
  },
  {
    id: "yb-103",
    name: "Yo Special Ethiopian Fusion Pizza",
    description: "Artisanal thin crust topped with spiced minced beef, sliced hardboiled eggs, green peppers, black olives, beef salami, and melted Mozzarella.",
    price: 580,
    category: "Ethiopian Fusion",
    image: fusionPizzaImg,
    isPopular: true,
    isSpicy: false,
    isAvailable: true,
    tags: ["Signature Fusion", "Egg & Beef", "Family Favorite"],
    options: ["Medium (30cm)", "Large (40cm +150 ETB)"]
  },
  {
    id: "yb-104",
    name: "Gourmet Beef & Cheese Wrap Platter",
    description: "Toasted flour tortilla stuffed with sauteed spiced beef strips, caramelized peppers, melted cheese blend, served with seasoned steak fries and signature ketchup swirl.",
    price: 390,
    category: "Wraps & Sandwiches",
    image: wrapDishImg,
    isPopular: true,
    isSpicy: false,
    isAvailable: true,
    tags: ["Crispy Fries Included", "Wrap Special"],
    options: ["Beef Wrap", "Crispy Chicken Wrap"]
  },
  {
    id: "yb-105",
    name: "Triple-Decker Yo Club Sandwich",
    description: "Toasted white bread loaded with shredded chicken, grilled beef strips, fried egg, lettuce, tomato, mustard mayo, flanked by golden fries.",
    price: 360,
    category: "Wraps & Sandwiches",
    image: clubSandwichImg,
    isPopular: false,
    isSpicy: false,
    isAvailable: true,
    tags: ["Chalkboard Classic", "High Protein"],
    options: ["Classic White Toast", "Whole Wheat Toast"]
  },
  {
    id: "yb-106",
    name: "Smoky BBQ Bacon Cheese Burger",
    description: "Thick beef patty smothered in rich barbecue sauce, crispy beef bacon, fried egg, lettuce, tomato, pickles on toasted bun.",
    price: 450,
    category: "Burgers",
    image: gourmetBurgerImg,
    isPopular: false,
    isSpicy: false,
    isAvailable: true,
    tags: ["Barbecue", "Bacon & Egg"]
  },
  {
    id: "yb-107",
    name: "Tibs Fusion Tagliatelle Pasta",
    description: "Al dente pasta tossed in rich garlic cream & Berbere red pepper reduction with tender sautéed beef tips and fresh parmesan.",
    price: 430,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    isAvailable: true,
    tags: ["Creamy Berbere", "Italian-Habesha Fusion"]
  },
  {
    id: "yb-108",
    name: "Traditional Chechebsa Breakfast",
    description: "Crispy shredded kitcha bread fried with berbere & clarified Niter Kibbeh butter, served with fresh honey, yogurt, and scrambled eggs.",
    price: 250,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSpicy: false,
    isAvailable: true,
    tags: ["Morning Classic", "Ethiopian Honey & Butter"]
  },
  {
    id: "yb-109",
    name: "Yo Signature Hibiscus & Berry Punch",
    description: "Freshly brewed iced hibiscus tea blended with dark berry juice, lemon squeeze, and fresh mint sprig. Served chilled in a jar.",
    price: 180,
    category: "Drinks & Shakes",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: false,
    isAvailable: true,
    tags: ["Refresher", "In-Store Favorite"]
  },
  {
    id: "yb-110",
    name: "Creamy Chocolate Avocado Milkshake",
    description: "Rich blended avocado, Belgian cocoa, fresh milk, honey drizzle, topped with whipped cream and roasted peanuts.",
    price: 220,
    category: "Drinks & Shakes",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSpicy: false,
    isAvailable: true,
    tags: ["Adama Avocado Blend", "Decadent"]
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Late-Night Neon Vibe",
    category: "Neon",
    image: neonHeroImg,
    caption: "The iconic red & yellow glowing neon sign setting the mood for late-night burger cravings in Adama.",
    instagramLink: "https://www.instagram.com/p/yo_burger_adama_1"
  },
  {
    id: "gal-2",
    title: "Artisanal Beef & Fries Wrap",
    category: "Food",
    image: wrapDishImg,
    caption: "Toasted gourmet wraps with sauce artwork served hot off the grill.",
    instagramLink: "https://www.instagram.com/p/yo_burger_adama_2"
  },
  {
    id: "gal-3",
    title: "Ethiopian Fusion Pizza",
    category: "Food",
    image: fusionPizzaImg,
    caption: "Our famous pizza topped with sliced boiled egg, seasoned beef, jalapeños, and melted cheese.",
    instagramLink: "https://www.instagram.com/p/yo_burger_adama_3"
  },
  {
    id: "gal-4",
    title: "Chalkboard Wall & Triple Club",
    category: "Atmosphere",
    image: clubSandwichImg,
    caption: "Our manifesto on the wall: 'OUR WAY, not McDonald's way. Burger WHEN IT IS EVERYTHING.'",
    instagramLink: "https://www.instagram.com/p/yo_burger_adama_4"
  },
  {
    id: "gal-5",
    title: "Balcony Deck Double Gourmet",
    category: "Food",
    image: gourmetBurgerImg,
    caption: "Stacking up perfection — juicy double beef patties smothered in red barbecue reduction.",
    instagramLink: "https://www.instagram.com/p/yo_burger_adama_5"
  },
  {
    id: "gal-6",
    title: "Cozy Dining Booths",
    category: "Atmosphere",
    image: ambianceImg,
    caption: "Dark wood dining partitions, neon ambient lighting, and great music every night.",
    instagramLink: "https://www.instagram.com/p/yo_burger_adama_6"
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Dawit Tadesse",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Hands down the absolute BEST burgers in Adama! The double beef patty is so juicy and that red barbecue glaze is unmatched. The glowing neon vibe at night makes you feel like you're in a futuristic burger speakeasy.",
    date: "2 days ago",
    favoriteDish: "Yo Signature Double Monster"
  },
  {
    id: "rev-2",
    author: "Selamawit Kebede",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The Ethiopian Fusion Pizza with boiled eggs and spiced beef is revolutionary! Generous portions, crisp crust, and great service. We order via WhatsApp all the time.",
    date: "1 week ago",
    favoriteDish: "Yo Special Ethiopian Fusion Pizza"
  },
  {
    id: "rev-3",
    author: "Henok Abebe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "That chalkboard motto 'OUR WAY, not McDonald's way' says it all. Real fresh meat, authentic Ethiopian spices, crispy fries, and the music is always on point. 10/10!",
    date: "2 weeks ago",
    favoriteDish: "Adama Fire Crack Burger"
  },
  {
    id: "rev-4",
    author: "Bethlehem Worku",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Love the toasted wrap platter with fries! The place looks stunning at night with the red neon sign. Adama finally has a world-class burger joint.",
    date: "3 weeks ago",
    favoriteDish: "Gourmet Beef & Cheese Wrap Platter"
  }
];
