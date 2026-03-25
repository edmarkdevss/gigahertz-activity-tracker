import { Star, Gift, Zap, Crown } from "lucide-react";

export function Rewards() {
  const benefits = [
    {
      icon: Star,
      title: "Earn Stars",
      description: "Collect 1 star for every dollar spent on qualifying purchases",
    },
    {
      icon: Gift,
      title: "Free Rewards",
      description: "Redeem stars for free drinks, food, and merchandise",
    },
    {
      icon: Zap,
      title: "Birthday Treat",
      description: "Get a free drink or food item on your birthday",
    },
    {
      icon: Crown,
      title: "Exclusive Offers",
      description: "Access member-only promotions and early access to new products",
    },
  ];

  const tiers = [
    {
      stars: 25,
      reward: "Customize your drink",
      description: "Add an espresso shot, dairy substitute, or extra flavor",
      color: "bg-green-500",
    },
    {
      stars: 100,
      reward: "Brewed coffee or tea",
      description: "Hot or iced coffee or tea of your choice",
      color: "bg-emerald-600",
    },
    {
      stars: 200,
      reward: "Handcrafted drink or food",
      description: "Any handcrafted beverage or select food items",
      color: "bg-amber-500",
    },
    {
      stars: 400,
      reward: "Merchandise or coffee beans",
      description: "Select merchandise items or packaged coffee",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">BeanCraft Rewards</h1>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join free and start earning rewards today. Get free drinks, exclusive offers, and more
            with every purchase.
          </p>
          <button className="px-8 py-4 bg-white text-emerald-800 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-colors">
            Join Now - It's Free
          </button>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rewards Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Redeem Your Stars</h2>
            <p className="text-xl text-gray-600">
              Start earning rewards with as little as 25 stars
            </p>
          </div>

          <div className="space-y-6">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className={`${tier.color} text-white rounded-2xl p-6 text-center min-w-32`}>
                    <div className="text-4xl font-bold">{tier.stars}</div>
                    <div className="text-sm mt-1">Stars</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{tier.reward}</h3>
                    <p className="text-gray-600">{tier.description}</p>
                  </div>
                  <button className="px-6 py-3 border-2 border-emerald-700 text-emerald-700 rounded-full font-semibold hover:bg-emerald-50 transition-colors hidden md:block">
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Program Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">✨ Free Birthday Reward</h3>
              <p className="text-gray-600">
                Celebrate your special day with a complimentary drink or food item of your choice.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">📱 Mobile Ordering</h3>
              <p className="text-gray-600">
                Order ahead and skip the line at your nearest BeanCraft location.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">🎁 Bonus Star Challenges</h3>
              <p className="text-gray-600">
                Complete fun challenges to earn extra stars and unlock rewards faster.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">💳 No Membership Fee</h3>
              <p className="text-gray-600">
                Join completely free with no hidden costs or membership fees required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Sign up today and get started on your journey to free coffee and exclusive perks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-800 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-colors">
              Create Account
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
