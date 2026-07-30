import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { OrderDrawer } from './components/OrderDrawer';
import { AdminModal } from './components/AdminModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

import { INITIAL_MENU_ITEMS } from './data/restaurantData';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Menu Items state with localStorage persistence
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('yoburger_menu_items');
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('yoburger_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Sync cart & menu to localStorage
  useEffect(() => {
    localStorage.setItem('yoburger_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('yoburger_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleAddToCart = (item: MenuItem, selectedOption?: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (c) => c.item.id === item.id && c.selectedOption === selectedOption
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { item, quantity: 1, selectedOption }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateMenuItem = (updated: MenuItem) => {
    setMenuItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleAddNewDish = (newDish: MenuItem) => {
    setMenuItems((prev) => [newDish, ...prev]);
  };

  const handleResetMenu = () => {
    if (window.confirm("Are you sure you want to reset all menu items to original factory defaults?")) {
      setMenuItems(INITIAL_MENU_ITEMS);
      localStorage.removeItem('yoburger_menu_items');
      alert("Menu reset to defaults!");
    }
  };

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'order') {
      setIsCartOpen(true);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2ECE4] flex flex-col selection:bg-[#E63324] selection:text-white">
      {/* Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={() => handleNavigate('menu')}
          onOrderNow={() => setIsCartOpen(true)}
        />

        <MenuSection
          items={menuItems}
          onAddToCart={handleAddToCart}
          isAdminMode={isAdminMode}
          onUpdateItem={handleUpdateMenuItem}
        />

        <AboutSection />

        <GallerySection />

        <ReviewsSection />

        <LocationSection />
      </main>

      {/* Slide-over Shopping Cart Drawer & WhatsApp Checkout */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* CMS Manager Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdminMode={isAdminMode}
        onToggleAdminMode={setIsAdminMode}
        onAddNewDish={handleAddNewDish}
        onResetMenu={handleResetMenu}
      />

      {/* Floating Action Button */}
      <FloatingWhatsApp />

      {/* Atmospheric Dark Footer */}
      <Footer onNavClick={handleNavigate} />
    </div>
  );
}
