import { Link, useLocation } from "react-router";
import { Cpu, Menu, X, ShoppingCart, Search, User } from "lucide-react";
import { useState } from "react";

export function TechNavigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/gaming", label: "Gaming" },
    { path: "/support", label: "Support" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                GIGAHERTZ
              </span>
              <div className="text-xs text-gray-400 -mt-1">Performance Unleashed</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-colors relative ${
                  isActive(link.path)
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              <User className="w-5 h-5" />
              <span className="font-semibold">Sign In</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-gray-800">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800 mt-4">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-semibold transition-colors ${
                    isActive(link.path)
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
