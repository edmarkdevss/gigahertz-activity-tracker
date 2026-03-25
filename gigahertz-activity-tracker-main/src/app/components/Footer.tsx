import { Link } from "react-router";
import { Coffee, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Coffee className="w-6 h-6 text-emerald-800" />
              </div>
              <span className="text-xl font-bold">BeanCraft</span>
            </div>
            <p className="text-emerald-100 text-sm">
              Crafting exceptional coffee experiences since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu" className="text-emerald-100 hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-emerald-100 hover:text-white transition-colors">
                  Rewards Program
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-emerald-100 hover:text-white transition-colors">
                  Find a Store
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-emerald-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-emerald-100 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-emerald-100 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-emerald-100 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-emerald-100 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-sm text-emerald-100">
          <p>&copy; 2026 BeanCraft Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
