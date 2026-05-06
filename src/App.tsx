import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Sunrise, 
  Sunset,
  Navigation,
  MapPin,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const MOCK_WEATHER = {
  city: "San Francisco",
  temp: 24,
  condition: "Sunny",
  humidity: 45,
  windSpeed: 12,
  feelsLike: 26,
  pressure: 1012,
  sunrise: "06:12 AM",
  sunset: "08:04 PM",
  forecast: [
    { day: "Mon", temp: 24, condition: "Sunny" },
    { day: "Tue", temp: 22, condition: "Cloudy" },
    { day: "Wed", temp: 19, condition: "Rainy" },
    { day: "Thu", temp: 21, condition: "Sunny" },
    { day: "Fri", temp: 25, condition: "Sunny" },
  ]
};

const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(MOCK_WEATHER);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/weather?city=${cityName}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      fetchWeather(search);
      setSearch("");
    }
  };

  useEffect(() => {
    // Initial fetch
    // fetchWeather(weather.city);
  }, []);

  const getWeatherIcon = (condition: string, size = 48) => {
    switch (condition) {
      case "Sunny": return <Sun size={size} className="text-yellow-400" />;
      case "Cloudy": return <Cloud size={size} className="text-gray-400" />;
      case "Rainy": return <CloudRain size={size} className="text-blue-400" />;
      default: return <Sun size={size} className="text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl z-10"
      >
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 glass rounded-2xl">
              <Navigation className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{weather.city}</h1>
              <p className="text-text-secondary flex items-center gap-1">
                <MapPin size={14} /> California, USA
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text" 
              placeholder="Search city..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 py-3 pl-12 pr-4 glass border-none focus:ring-2 focus:ring-primary outline-none transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={20} />
          </form>
        </div>

        {/* Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 glass premium-shadow p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary mb-1">Current Weather</p>
                <h2 className="text-6xl font-bold mb-4">{weather.temp}°C</h2>
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-full w-fit">
                  {getWeatherIcon(weather.condition, 24)}
                  <span className="font-medium">{weather.condition}</span>
                </div>
              </div>
              <div className="animate-float">
                {getWeatherIcon(weather.condition, 120)}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-text-secondary text-sm mb-1">Feels Like</p>
                <p className="font-semibold">{weather.feelsLike}°C</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-text-secondary text-sm mb-1">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-text-secondary text-sm mb-1">Wind</p>
                <p className="font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="glass premium-shadow p-6 flex flex-col gap-6">
            <h3 className="text-lg font-semibold border-b border-white/10 pb-4">Weather Details</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-text-secondary">
                <Sunrise size={20} />
                <span>Sunrise</span>
              </div>
              <span className="font-medium">{weather.sunrise}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-text-secondary">
                <Sunset size={20} />
                <span>Sunset</span>
              </div>
              <span className="font-medium">{weather.sunset}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-text-secondary">
                <Thermometer size={20} />
                <span>Pressure</span>
              </div>
              <span className="font-medium">{weather.pressure} hPa</span>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-accent">
                <Calendar size={18} />
                <span className="text-sm font-medium">May 6, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {weather.forecast.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="glass p-4 text-center group cursor-pointer hover:bg-white/10 transition-colors"
            >
              <p className="text-text-secondary text-sm mb-3">{item.day}</p>
              <div className="mb-3 flex justify-center">
                {getWeatherIcon(item.condition, 32)}
              </div>
              <p className="text-xl font-bold">{item.temp}°</p>
              <p className="text-[10px] text-text-secondary uppercase mt-1 tracking-wider">{item.condition}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 text-text-secondary text-sm opacity-50 z-10">
        Premium Weather Experience • Designed by Antigravity
      </footer>
    </div>
  );
};

export default App;
