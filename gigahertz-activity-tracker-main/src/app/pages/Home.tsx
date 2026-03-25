import { Link } from "react-router";
import { ArrowRight, Award, Coffee, Heart, Leaf } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const featuredDrinks = [
    {
      id: 1,
      name: "Signature Latte",
      description: "Smooth espresso with steamed milk and latte art",
      image: "https://images.unsplash.com/photo-1669162364316-a74b2d661d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNvZmZlZXxlbnwxfHx8fDE3NzI3ODU5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$4.95",
    },
    {
      id: 2,
      name: "Iced Caramel Coffee",
      description: "Refreshing iced coffee with caramel drizzle",
      image: "https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzcyNzIxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$5.45",
    },
    {
      id: 3,
      name: "Classic Cappuccino",
      description: "Rich espresso with velvety foam",
      image: "https://images.unsplash.com/photo-1638202448050-bddae16dd9be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY3VwfGVufDF8fHx8MTc3MjcwNDI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "$4.45",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-emerald-800 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1573840357491-06851c72e0d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzcyNjc0NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Coffee shop interior"
            className="w-full h-full object-cover opacity-30"
            fallbackSrc=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Crafted with Passion, Served with Love
            </h1>
            <p className="text-xl mb-8 text-emerald-50">
              Experience the perfect blend of premium beans and expert craftsmanship in every cup.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="px-8 py-4 bg-white text-emerald-800 rounded-full font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/rewards"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Join Rewards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drinks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Favorites</h2>
            <p className="text-xl text-gray-600">
              Discover our handcrafted signature beverages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDrinks.map((drink) => (
              <div
                key={drink.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    fallbackSrc=""
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{drink.name}</h3>
                  <p className="text-gray-600 mb-4">{drink.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-700">{drink.price}</span>
                    <button className="px-6 py-2 bg-emerald-700 text-white rounded-full font-semibold hover:bg-emerald-800 transition-colors">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative py-24 bg-gradient-to-r from-amber-600 to-orange-600 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1771159978458-3df74f41a918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc3MjcwNDI0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Barista making coffee"
            className="w-full h-full object-cover opacity-20"
            fallbackSrc=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join BeanCraft Rewards Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Earn stars with every purchase and unlock free drinks, exclusive offers, and more.
          </p>
          <Link
            to="/rewards"
            className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Committed to ethical sourcing and environmental responsibility in every cup.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                Premium beans roasted to perfection by our expert baristas.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Building connections and creating warm, welcoming spaces for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Coffee className="w-16 h-16 text-emerald-700 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Us Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find a BeanCraft location near you and experience our exceptional coffee.
          </p>
          <Link
            to="/locations"
            className="inline-block px-8 py-4 bg-emerald-700 text-white rounded-full font-semibold hover:bg-emerald-800 transition-colors"
          >
            Find a Store
          </Link>
        </div>
      </section>
    </div>
  );
}
