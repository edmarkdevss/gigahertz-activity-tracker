import { Link } from "react-router";
import { Cpu, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function TechFooter() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                GIGAHERTZ
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              High-performance computing solutions for gamers and professionals.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Gaming PCs
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Components
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Peripherals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Downloads
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Gigahertz. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
