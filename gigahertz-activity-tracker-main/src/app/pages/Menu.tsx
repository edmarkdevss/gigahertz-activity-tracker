import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("Hot Drinks");

  const categories = ["Hot Drinks", "Cold Drinks", "Food", "Merchandise"];

  const menuItems = {
    "Hot Drinks": [
      {
        id: 1,
        name: "Caffè Latte",
        description: "Espresso with steamed milk and light foam",
        image: "https://images.unsplash.com/photo-1669162364316-a74b2d661d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNvZmZlZXxlbnwxfHx8fDE3NzI3ODU5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$4.95",
        sizes: ["Tall", "Grande", "Venti"],
      },
      {
        id: 2,
        name: "Cappuccino",
        description: "Espresso with steamed milk and thick foam",
        image: "https://images.unsplash.com/photo-1638202448050-bddae16dd9be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY3VwfGVufDF8fHx8MTc3MjcwNDI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$4.45",
        sizes: ["Tall", "Grande", "Venti"],
      },
      {
        id: 3,
        name: "Espresso",
        description: "Rich, full-bodied espresso shot",
        image: "https://images.unsplash.com/photo-1655655025180-4cbd1faddd33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGRyaW5rfGVufDF8fHx8MTc3Mjc4OTMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$2.95",
        sizes: ["Single", "Double"],
      },
      {
        id: 4,
        name: "Caramel Macchiato",
        description: "Vanilla syrup, steamed milk, espresso, and caramel drizzle",
        image: "https://images.unsplash.com/photo-1669162364316-a74b2d661d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNvZmZlZXxlbnwxfHx8fDE3NzI3ODU5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$5.45",
        sizes: ["Tall", "Grande", "Venti"],
      },
    ],
    "Cold Drinks": [
      {
        id: 5,
        name: "Iced Caramel Coffee",
        description: "Iced coffee with caramel syrup and whipped cream",
        image: "https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzcyNzIxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$5.45",
        sizes: ["Tall", "Grande", "Venti"],
      },
      {
        id: 6,
        name: "Iced Latte",
        description: "Chilled espresso with cold milk over ice",
        image: "https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzcyNzIxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$4.95",
        sizes: ["Tall", "Grande", "Venti"],
      },
      {
        id: 7,
        name: "Cold Brew",
        description: "Smooth, naturally sweet cold-steeped coffee",
        image: "https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzcyNzIxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$4.25",
        sizes: ["Tall", "Grande", "Venti"],
      },
    ],
    "Food": [
      {
        id: 8,
        name: "Butter Croissant",
        description: "Classic French pastry with flaky layers",
        image: "https://images.unsplash.com/photo-1712723247648-64a03ba7c333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzcyNzg1ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$3.45",
      },
      {
        id: 9,
        name: "Chocolate Croissant",
        description: "Buttery croissant filled with rich chocolate",
        image: "https://images.unsplash.com/photo-1712723247648-64a03ba7c333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzcyNzg1ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$3.95",
      },
      {
        id: 10,
        name: "Blueberry Muffin",
        description: "Moist muffin loaded with fresh blueberries",
        image: "https://images.unsplash.com/photo-1712723247648-64a03ba7c333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzcyNzg1ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$3.25",
      },
    ],
    "Merchandise": [
      {
        id: 11,
        name: "BeanCraft Coffee Beans",
        description: "Premium roasted whole beans - 12oz bag",
        image: "https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzcyNzMwODM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$14.95",
      },
      {
        id: 12,
        name: "Ceramic Travel Mug",
        description: "Insulated travel mug with BeanCraft logo",
        image: "https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzcyNzMwODM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: "$19.95",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-emerald-100">
            Explore our selection of handcrafted beverages and fresh food
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-emerald-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  fallbackSrc=""
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                {"sizes" in item && (
                  <div className="flex gap-2 mb-4">
                    {item.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-700">{item.price}</span>
                  <button className="px-6 py-2 bg-emerald-700 text-white rounded-full font-semibold hover:bg-emerald-800 transition-colors">
                    Add
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
