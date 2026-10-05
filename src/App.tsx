/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MenuItem, CartItem } from './types/cafe';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { BrewGuideCalculator } from './components/BrewGuideCalculator';
import { RoasteryStory } from './components/RoasteryStory';
import { ReservationSection } from './components/ReservationSection';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  // Quick add default configuration
  const handleQuickAdd = (item: MenuItem) => {
    const defaultMilk = item.customization?.milks?.[0];
    const defaultSize = item.customization?.sizes?.[0]?.name;
    const defaultGrind = item.customization?.grinds?.[0];
    const defaultTemp = item.customization?.temps?.[0];

    const existingIndex = cartItems.findIndex(
      (c) =>
        c.menuItem.id === item.id &&
        c.selectedMilk === defaultMilk &&
        c.selectedSize === defaultSize &&
        c.selectedGrind === defaultGrind
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        menuItem: item,
        selectedMilk: defaultMilk,
        selectedSize: defaultSize,
        selectedGrind: defaultGrind,
        selectedTemp: defaultTemp,
        quantity: 1,
        unitPrice: item.price,
      };
      setCartItems((prev) => [...prev, newCartItem]);
    }
  };

  // Add customized item from modal
  const handleAddCustomized = (custom: {
    menuItem: MenuItem;
    selectedMilk?: string;
    selectedSize?: string;
    selectedTemp?: string;
    selectedGrind?: string;
    specialNote?: string;
    quantity: number;
    unitPrice: number;
  }) => {
    const newCartItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random()}`,
      menuItem: custom.menuItem,
      selectedMilk: custom.selectedMilk,
      selectedSize: custom.selectedSize,
      selectedTemp: custom.selectedTemp,
      selectedGrind: custom.selectedGrind,
      specialNote: custom.specialNote,
      quantity: custom.quantity,
      unitPrice: custom.unitPrice,
    };
    setCartItems((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-[#E8DCC4]">
      {/* Top Bar Navigation */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservations}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onReserveTable={scrollToReservations}
        />

        {/* Menu & Online Ordering */}
        <MenuSection
          onSelectItem={(item) => setSelectedMenuItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Roastery Philosophy & Direct Trade */}
        <RoasteryStory />

        {/* Interactive Barista Brew Calculator */}
        <BrewGuideCalculator />

        {/* Table Reservations & Cuppings */}
        <ReservationSection />

        {/* Manhattan Locations & Hours */}
        <LocationsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customization Modal */}
      <ItemDetailModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddCustomized}
      />

      {/* Sliding Order Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
