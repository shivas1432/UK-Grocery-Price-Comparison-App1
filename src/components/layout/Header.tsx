// Enhanced for grocery price comparison - Sept 2024 update
import React, { useState } from 'react';
import { Search, ShoppingCart, Bell, Menu, Sun, Moon, Settings } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { SearchBar } from '../search/SearchBar';
import { getProductById } from '../../data/mockProducts';

export const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const totalCartItems = state.shoppingLists.reduce(
    (total, list) => total + list.items.length, 0
  );

  const toggleTheme = () => {
    const currentTheme = state.settings.theme;
    let newTheme: 'light' | 'dark' | 'system';
    
    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'system';
    } else {
      newTheme = 'light';
    }
    
    dispatch({ type: 'UPDATE_SETTINGS', payload: { theme: newTheme } });
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowCart(false);
    setShowSettings(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
    setShowNotifications(false);
    setShowSettings(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false);
    setShowCart(false);
  };
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                UK Price Compare
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title={`Current: ${state.settings.theme} theme`}
            >
              {state.settings.theme === 'dark' || 
               (state.settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button 
              onClick={handleNotificationClick}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {state.priceAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.priceAlerts.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={handleCartClick}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Settings */}
            <button 
              onClick={handleSettingsClick}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <SearchBar />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="#" className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                Categories
              </a>
              <a href="#" className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                Deals
              </a>
              <a href="#" className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                Store Locator
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Price Alerts</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {state.priceAlerts.length > 0 ? (
              state.priceAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Price Alert Active</p>
                  <p className="text-xs text-gray-500">Target: £{(alert.targetPrice / 100).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No active price alerts</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shopping Cart Dropdown */}
      {showCart && (
        <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Shopping Lists</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {state.shoppingLists.length > 0 ? (
              state.shoppingLists.map((list) => (
                <div key={list.id} className="border-b border-gray-100 last:border-b-0">
                  <div className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{list.name}</p>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {list.items.length} items
                      </span>
                    </div>
                    {list.items.length > 0 && (
                      <div className="space-y-1">
                        {list.items.slice(0, 3).map((item) => {
                          const product = getProductById(item.productId);
                          return product ? (
                            <div key={item.productId} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600 truncate">{product.name}</span>
                              <span className="text-gray-500">x{item.quantity}</span>
                            </div>
                          ) : null;
                        })}
                        {list.items.length > 3 && (
                          <p className="text-xs text-gray-400">
                            +{list.items.length - 3} more items
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No shopping lists yet</p>
                <button className="mt-2 text-blue-600 text-sm hover:text-blue-800">
                  Create your first list
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Dropdown */}
      {showSettings && (
        <div className="absolute top-16 right-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Settings</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select 
                value={state.settings.theme}
                onChange={(e) => dispatch({ 
                  type: 'UPDATE_SETTINGS', 
                  payload: { theme: e.target.value as any } 
                })}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Notifications
              </label>
              <button
                onClick={() => dispatch({ 
                  type: 'UPDATE_SETTINGS', 
                  payload: { notifications: !state.settings.notifications } 
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
