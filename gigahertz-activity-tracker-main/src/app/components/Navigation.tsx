import { Link, useLocation } from "react-router";
import { Coffee, Menu, X, User, LogOut, Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SignInModal } from "./SignInModal";
import { SignUpModal } from "./SignUpModal";

export function Navigation() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/rewards", label: "Rewards" },
    { path: "/locations", label: "Locations" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center group-hover:bg-emerald-800 transition-colors">
                <Coffee className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-emerald-800">BeanCraft</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-semibold transition-colors ${
                    isActive(link.path)
                      ? "text-emerald-700"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-emerald-700 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {user.rewardsPoints} stars
                      </p>
                    </div>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Member since {user.memberSince}
                          </p>
                        </div>
                        <Link
                          to="/rewards"
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Rewards</span>
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <Star className="w-4 h-4 fill-current" />
                              {user.rewardsPoints}
                            </span>
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setSignInModalOpen(true)}
                    className="px-6 py-2 border-2 border-emerald-700 text-emerald-700 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setSignUpModalOpen(true)}
                    className="px-6 py-2 bg-emerald-700 text-white rounded-full font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    Join Now
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 mt-2">
              <div className="flex flex-col gap-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold transition-colors ${
                      isActive(link.path)
                        ? "text-emerald-700"
                        : "text-gray-700 hover:text-emerald-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                      <div className="px-4 py-3 bg-emerald-50 rounded-lg">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-emerald-700 flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-current" />
                          {user.rewardsPoints} stars
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-full font-semibold"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setSignInModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                        className="px-6 py-2 border-2 border-emerald-700 text-emerald-700 rounded-full font-semibold"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setSignUpModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                        className="px-6 py-2 bg-emerald-700 text-white rounded-full font-semibold"
                      >
                        Join Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <SignInModal
        isOpen={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        onSwitchToSignUp={() => setSignUpModalOpen(true)}
      />
      <SignUpModal
        isOpen={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        onSwitchToSignIn={() => setSignInModalOpen(true)}
      />
    </>
  );
}