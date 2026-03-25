import { Link } from "react-router";
import { ArrowRight, Zap, Shield, Headphones, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function TechHome() {
  const featuredProducts = [
    {
      id: 1,
      name: "Titan X Pro",
      category: "Gaming Desktop",
      price: "$2,999",
      image: "https://images.unsplash.com/photo-1658671141384-c4317684a1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21wdXRlciUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc3MjcxMTI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: "RTX 4090 • i9-14900K • 64GB RAM",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Velocity Ultrabook",
      category: "Premium Laptop",
      price: "$1,799",
      image: "https://images.unsplash.com/photo-1622131815526-eaae1e615381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcyNzg5OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: "RTX 4070 • i7-13700H • 32GB RAM",
      badge: "New",
    },
    {
      id: 3,
      name: "Quantum GPU",
      category: "Graphics Card",
      price: "$1,599",
      image: "https://images.unsplash.com/photo-1658673847785-08f1738116f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljcyUyMGNhcmQlMjBHUFV8ZW58MXx8fHwxNzcyNzg5OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: "24GB VRAM • 4K Ready • Ray Tracing",
      badge: "Hot",
    },
  ];

  const peripherals = [
    {
      name: "Pro Gaming Headset",
      price: "$149",
      image: "https://images.unsplash.com/photo-1629429407756-4a7703614972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc3MjcyMjIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "RGB Mechanical Keyboard",
      price: "$199",
      image: "https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjByZ2J8ZW58MXx8fHwxNzcyNjc1MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Precision Gaming Mouse",
      price: "$89",
      image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NzI2NzI4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1658671141384-c4317684a1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21wdXRlciUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc3MjcxMTI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Gaming Setup"
            className="w-full h-full object-cover"
            fallbackSrc=""
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold mb-6">
              ⚡ New Generation Available Now
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Performance
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Unleashed
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience ultimate power with our next-generation gaming systems. Built for champions, designed for victory.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center gap-2 group"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/gaming"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Gaming Series
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ultra Performance</h3>
              <p className="text-gray-400 text-sm">Maximum FPS in every game</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3-Year Warranty</h3>
              <p className="text-gray-400 text-sm">Complete protection</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Expert assistance anytime</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Upgrades</h3>
              <p className="text-gray-400 text-sm">Future-proof design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Systems</span>
            </h2>
            <p className="text-xl text-gray-400">
              The most powerful machines in our lineup
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xs font-semibold">
                    {product.badge}
                  </span>
                </div>
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fallbackSrc=""
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-400 mb-2">{product.category}</div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peripherals */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Complete Your Setup</h2>
            <p className="text-xl text-gray-400">Professional gaming peripherals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {peripherals.map((item, index) => (
              <div
                key={index}
                className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fallbackSrc=""
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-400">{item.price}</span>
                    <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of gamers who trust Gigahertz for their ultimate gaming experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/support"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
