import { Heart, Users, Globe, Leaf } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Coffee",
      description: "We believe in the transformative power of a perfect cup of coffee. Every bean is carefully selected and roasted to perfection.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Our stores are gathering places where connections are made and community thrives. We're more than just a coffee shop.",
    },
    {
      icon: Globe,
      title: "Ethical Sourcing",
      description: "We partner directly with farmers worldwide, ensuring fair prices and sustainable farming practices that benefit everyone.",
    },
    {
      icon: Leaf,
      title: "Environmental Commitment",
      description: "From eco-friendly packaging to energy-efficient stores, we're dedicated to minimizing our environmental footprint.",
    },
  ];

  const timeline = [
    {
      year: "2010",
      title: "The Beginning",
      description: "Founded in Seattle with a single store and a dream to serve exceptional coffee.",
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Grew to 50 locations across the Pacific Northwest.",
    },
    {
      year: "2020",
      title: "Going Green",
      description: "Launched our sustainability initiative and became carbon neutral.",
    },
    {
      year: "2026",
      title: "Today",
      description: "Serving communities nationwide with over 200 locations and still growing.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzcyNzMwODM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Coffee beans"
            className="w-full h-full object-cover opacity-30"
            fallbackSrc=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-emerald-100">
              Discover the passion, people, and values that make BeanCraft more than just a coffee shop.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            To inspire and nurture the human spirit – one person, one cup, and one neighborhood at a time. 
            We're committed to serving the finest coffee while creating meaningful connections and positive 
            impact in the communities we serve.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771159978458-3df74f41a918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc3MjcwNDI0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Barista crafting coffee"
                className="w-full h-full object-cover"
                fallbackSrc=""
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Craftsmanship in Every Cup</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our expert baristas are trained in the art and science of coffee making. Each drink is 
                carefully crafted with precision, passion, and attention to detail.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From sourcing the finest beans to perfecting our roasting process, we're committed to 
                delivering an exceptional coffee experience that delights your senses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200 hidden md:block"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <div className="text-emerald-700 font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-emerald-700 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Visit a BeanCraft store near you and experience the difference that passion and quality make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-800 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-colors">
              Find a Store
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
              Explore Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
