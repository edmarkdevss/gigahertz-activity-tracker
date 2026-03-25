import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Gauge, Trophy, Flame, Zap } from "lucide-react";

export function Gaming() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1658671141384-c4317684a1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21wdXRlciUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc3MjcxMTI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Gaming Setup"
          className="absolute inset-0 w-full h-full object-cover"
          fallbackSrc=""
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Gaming <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Series</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-2xl">
              Built for champions. Engineered for victory. Dominate every game.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-500/30">
              <Gauge className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-gray-400">FPS in eSports Titles</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-500/30">
              <Trophy className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">#1</div>
              <div className="text-gray-400">Performance Leader</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-500/30">
              <Flame className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">4K</div>
              <div className="text-gray-400">Ultra Settings Ready</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-500/30">
              <Zap className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-400">Gaming Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gaming Lineup */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Choose Your <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Weapon</span>
          </h2>

          <div className="space-y-8">
            {/* Pro Series */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-red-500">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block px-4 py-1 bg-red-500 rounded-full text-sm font-semibold mb-4">
                    PRO SERIES
                  </div>
                  <h3 className="text-4xl font-bold mb-4">Titan Gaming Pro</h3>
                  <p className="text-gray-400 mb-6">
                    The ultimate gaming machine for professional eSports athletes. No compromises.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>RTX 4090 with 24GB VRAM</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Intel i9-14900K Overclocked</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>64GB DDR5 6000MHz RAM</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Custom RGB Liquid Cooling</span>
                    </li>
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-red-500">$3,499</span>
                    <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all">
                      Configure Now
                    </button>
                  </div>
                </div>
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1658671141384-c4317684a1a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21wdXRlciUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc3MjcxMTI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Gaming PC"
                    className="w-full h-full object-cover"
                    fallbackSrc=""
                  />
                </div>
              </div>
            </div>

            {/* Elite Series */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative h-96 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1562976540-1502c2145186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vdGhlcmJvYXJkJTIwY2lyY3VpdHxlbnwxfHx8fDE3NzI3NDQ3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Components"
                    className="w-full h-full object-cover"
                    fallbackSrc=""
                  />
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block px-4 py-1 bg-orange-500 rounded-full text-sm font-semibold mb-4">
                    ELITE SERIES
                  </div>
                  <h3 className="text-4xl font-bold mb-4">Apex Gaming Elite</h3>
                  <p className="text-gray-400 mb-6">
                    Premium performance for serious gamers who demand the best.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>RTX 4080 SUPER 16GB</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>AMD Ryzen 9 7950X3D</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>32GB DDR5 5600MHz RAM</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Advanced Air Cooling</span>
                    </li>
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-orange-500">$2,499</span>
                    <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all">
                      Configure Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Join the Champions</h2>
          <p className="text-xl mb-8">
            Experience gaming at its finest. Trusted by professional eSports teams worldwide.
          </p>
          <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
            Explore Gaming Series
          </button>
        </div>
      </section>
    </div>
  );
}
