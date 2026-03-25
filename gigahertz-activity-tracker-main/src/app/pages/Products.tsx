import { useState } from "react";
import { Filter, Grid, List } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Products() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Gaming PCs", "Laptops", "Components", "Peripherals"];

  const products = [
    {
      id: 1,
      name: "Titan X Pro Elite",
      category: "Gaming PCs",
      price: 2999,
      image: "https://images.unsplash.com/photo-1658671141384-c4317684a1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21wdXRlciUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc3MjcxMTI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: ["RTX 4090 24GB", "i9-14900K", "64GB DDR5", "2TB NVMe"],
      rating: 4.9,
      reviews: 342,
    },
    {
      id: 2,
      name: "Velocity Ultra 17",
      category: "Laptops",
      price: 1799,
      image: "https://images.unsplash.com/photo-1622131815526-eaae1e615381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcyNzg5OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: ["RTX 4070 8GB", "i7-13700H", "32GB DDR5", "1TB NVMe"],
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 3,
      name: "Quantum RTX 4090",
      category: "Components",
      price: 1599,
      image: "https://images.unsplash.com/photo-1658673847785-08f1738116f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljcyUyMGNhcmQlMjBHUFV8ZW58MXx8fHwxNzcyNzg5OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: ["24GB GDDR6X", "2.5GHz Boost", "450W TDP", "DLSS 3.5"],
      rating: 4.8,
      reviews: 567,
    },
    {
      id: 4,
      name: "Apex Wireless Pro",
      category: "Peripherals",
      price: 149,
      image: "https://images.unsplash.com/photo-1629429407756-4a7703614972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc3MjcyMjIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: ["7.1 Surround", "50mm Drivers", "20hr Battery", "USB-C"],
      rating: 4.6,
      reviews: 892,
    },
    {
      id: 5,
      name: "Hyperion i9 Extreme",
      category: "Components",
      price: 599,
      image: "https://images.unsplash.com/photo-1760539165416-62fd69fcf02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2Nlc3NvciUyMGNoaXB8ZW58MXx8fHwxNzcyNzg5OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: ["24 Cores", "5.8GHz Boost", "36MB Cache", "125W TDP"],
      rating: 4.9,
      reviews: 421,
    },
    {
      id: 6,
      name: "Spectrum RGB Mech",
      category: "Peripherals",
      price: 199,
      image: "https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjByZ2J8ZW58MXx8fHwxNzcyNjc1MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: ["Cherry MX Red", "Per-Key RGB", "Aluminum Body", "Hot-Swap"],
      rating: 4.8,
      reviews: 1203,
    },
  ];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Products</h1>
          <p className="text-xl text-blue-100">
            Discover our complete range of high-performance solutions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600" : ""}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-600" : ""}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group ${
                viewMode === "list" ? "flex gap-6" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 h-64" : "h-64"}`}>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fallbackSrc=""
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 rounded-full text-xs font-semibold">
                  In Stock
                </div>
              </div>

              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="text-sm text-blue-400 mb-2">{product.category}</div>
                <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                
                <div className="space-y-2 mb-4">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      {spec}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
