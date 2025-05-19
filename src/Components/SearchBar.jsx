import React, { useState } from 'react';
import axios from 'axios';
import { Search, Book, Globe, Loader } from 'lucide-react';

/**
 * SearchBar Component
 * 
 * A component that provides a UI for searching Hadiths by number, allowing users
 * to select different editions and languages.
 * 
 * @param {Function} setHadith - Function to update parent component with metadata
 * @param {Function} setMeta - Function to update parent component with hadith content
 */
function SearchBar({ setHadith, setMeta }) {
  // State Management
  // ------------------------------
  // Search query input value
  const [search, setSearch] = useState("");
  // Selected hadith edition (default: bukhari)
  const [edition, setEdition] = useState("bukhari");
  // Selected language (default: English)
  const [language, setLanguage] = useState("eng");
  // Loading state for API requests
  const [isLoading, setIsLoading] = useState(false);
  // Error message state
  const [error, setError] = useState(null);
  // Information about the last successful search
  const [lastSearched, setLastSearched] = useState(null);

  // Data Collections
  // ------------------------------
  // Available editions with display names and value codes
  const editions = [
    { value: 'abudawud', label: 'Abu Dawud' },
    { value: 'bukhari', label: 'Bukhari' },
    { value: 'dehlawi', label: 'Dehlawi' },
    { value: 'ibnmajah', label: 'Ibn Majah' },
    { value: 'malik', label: 'Malik' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'nasai', label: 'Nasai' },
    { value: 'nawawi', label: 'Nawawi' },
    { value: 'qudsi', label: 'Qudsi' },
    { value: 'tirmidhi', label: 'Tirmidhi' }
  ];

  // Available languages with display names and value codes
  const languages = [
    { value: 'eng', label: 'English' },
    { value: 'urd', label: 'Urdu' },
    { value: 'ara', label: 'Arabic' }
  ];

  // Event Handlers
  // ------------------------------
  /**
   * Handles changes to the search input field
   * @param {Event} e - Input change event
   */
  const onChange = (e) => {
    setSearch(e.target.value);
    // Clear any existing error when user starts typing
    if (error) setError(null);
  };

  /**
   * Performs the hadith search using the API
   * Validates input, handles loading states, and processes the response
   */
  const onSearch = async () => {
    // Input validation - prevent empty searches
    if (!search || search.trim() === "") {
      setError("Please enter a hadith number");
      return;
    }

    // Set loading state and clear any previous errors
    setIsLoading(true);
    setError(null);
    
    try {
      // Construct API URL with selected language, edition, and search number
      const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${language}-${edition}/${search}.json`;
      const res = await axios.get(url);
      
      // Check if the response contains valid hadith data
      if (res.data && res.data.hadiths && res.data.hadiths.length > 0) {
        const hadith = res.data.hadiths[0]; // take first hadith object
        const meta = res.data.metadata;
        
        // Update parent component state with the fetched data
        setHadith(meta);
        setMeta(hadith);
        
        // Store information about this successful search
        setLastSearched({
          number: search,
          edition: editions.find(e => e.value === edition)?.label,
          language: languages.find(l => l.value === language)?.label
        });
      } else {
        // Handle case where hadith wasn't found
        setError("No hadith found with this number");
      }
    } catch (e) {
      // Log full error to console for debugging
      console.error("Error fetching hadith:", e);
      
      // Show user-friendly error message
      // Note: The message indicates translation issue rather than technical error
      setError("Sorry, this part hasn't been translated yet.");
    } finally {
      // Always reset loading state when done, regardless of success/failure
      setIsLoading(false);
    }
  };

  /**
   * Handles keyboard events for the search input
   * Triggers search when Enter key is pressed
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  // Component Rendering
  // ------------------------------
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search Container - Main card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hadith Search</h2>
        
        {/* Viewport meta tag to prevent iOS zoom */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        
        {/* Main form grid layout - responsive (1 column on mobile, 2 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column - Settings controls */}
          <div className="space-y-4">
            {/* Edition Selector Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Book size={16} className="inline mr-1" />
                Edition
              </label>
              <select
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="block w-full appearance-none bg-white border border-gray-300 hover:border-emerald-500 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                style={{ fontSize: '16px' }} /* Prevents iOS zoom */
              >
                {editions.map((ed) => (
                  <option key={ed.value} value={ed.value}>
                    {ed.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow element (decorative) */}
              <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe size={16} className="inline mr-1" />
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full appearance-none bg-white border border-gray-300 hover:border-emerald-500 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                style={{ fontSize: '16px' }} /* Prevents iOS zoom */
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow element (decorative) */}
              <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right Column - Search input and button */}
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Search size={16} className="inline mr-1" />
              Hadith Number
            </label>
            <div className="flex">
              {/* Search input field - optimized for numeric input */}
              <input
                type="text"
                inputMode="numeric" /* Shows numeric keyboard on mobile */
                pattern="[0-9]*" /* Further enforces numeric input */
                value={search}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter hadith number"
                className="flex-grow border border-gray-300 hover:border-emerald-500 px-4 py-2 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                style={{ fontSize: '16px' }} /* Prevents iOS zoom */
              />
              {/* Search button with loading state */}
              <button
                onClick={onSearch}
                disabled={isLoading}
                className={`bg-emerald-600 px-4 py-2 text-white font-medium rounded-r-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={18} />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Status Feedback Area */}
        {/* Error message display */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            <p className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        )}
        
        {/* Success message display - shows details of current hadith */}
        {lastSearched && !error && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md">
            <p className="text-sm">
              Showing hadith #{lastSearched.number} from {lastSearched.edition} ({lastSearched.language})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;