import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, User, X } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    clearSearch();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white h-14 flex items-center px-4 justify-between z-50">
      <div className="flex items-center gap-4">
        <button 
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center">
          <img 
            src="https://primepulsemedia.com/wp-content/uploads/2024/12/ArnelCulum.png"
            alt="Arnel Culum"
            className="h-8 w-auto md:h-10"
          />
        </Link>
      </div>
      
      {/* Mobile Search Button */}
      <button 
        className="p-2 hover:bg-gray-100 rounded-full md:hidden"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className="w-6 h-6" />
      </button>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex flex-grow max-w-2xl mx-4">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search videos"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:border-blue-500 focus:outline-none"
          />
          <button className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex items-center p-4 gap-4">
            <button 
              onClick={handleSearchClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search videos"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2 md:gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full hidden md:block">
          <Bell className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}