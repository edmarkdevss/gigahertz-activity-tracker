import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { useState } from "react";

export function Locations() {
  const [searchQuery, setSearchQuery] = useState("");

  const locations = [
    {
      id: 1,
      name: "Downtown BeanCraft",
      address: "123 Main Street",
      city: "Seattle, WA 98101",
      phone: "(206) 555-0123",
      hours: "Mon-Fri: 6am-8pm, Sat-Sun: 7am-9pm",
      distance: "0.5 miles",
    },
    {
      id: 2,
      name: "Waterfront BeanCraft",
      address: "456 Harbor Drive",
      city: "Seattle, WA 98102",
      phone: "(206) 555-0456",
      hours: "Mon-Fri: 6am-7pm, Sat-Sun: 7am-8pm",
      distance: "1.2 miles",
    },
    {
      id: 3,
      name: "University District BeanCraft",
      address: "789 Campus Way",
      city: "Seattle, WA 98105",
      phone: "(206) 555-0789",
      hours: "Mon-Sun: 5am-10pm",
      distance: "2.3 miles",
    },
    {
      id: 4,
      name: "Capitol Hill BeanCraft",
      address: "321 Broadway Ave",
      city: "Seattle, WA 98102",
      phone: "(206) 555-0321",
      hours: "Mon-Fri: 6am-9pm, Sat-Sun: 7am-10pm",
      distance: "1.8 miles",
    },
    {
      id: 5,
      name: "Pike Place BeanCraft",
      address: "567 Pike Street",
      city: "Seattle, WA 98101",
      phone: "(206) 555-0567",
      hours: "Mon-Sun: 6am-8pm",
      distance: "0.8 miles",
    },
    {
      id: 6,
      name: "Fremont BeanCraft",
      address: "890 Fremont Ave N",
      city: "Seattle, WA 98103",
      phone: "(206) 555-0890",
      hours: "Mon-Fri: 6am-8pm, Sat-Sun: 7am-9pm",
      distance: "3.1 miles",
    },
  ];

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Find a Store</h1>
          <p className="text-xl text-emerald-100">
            Discover BeanCraft locations near you
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city, address, or store name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-full focus:border-emerald-500 focus:outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-2xl h-96 lg:h-[600px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200"></div>
              <div className="relative text-center z-10">
                <MapPin className="w-16 h-16 text-emerald-700 mx-auto mb-4" />
                <p className="text-xl text-emerald-800 font-semibold">
                  Interactive Map View
                </p>
                <p className="text-emerald-600 mt-2">
                  {filteredLocations.length} locations found
                </p>
              </div>
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-emerald-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {location.name}
                  </h3>
                  <span className="text-sm text-emerald-700 font-medium">
                    {location.distance}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <div>
                      <p>{location.address}</p>
                      <p>{location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <p>{location.phone}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <p>{location.hours}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-full font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Directions
                  </button>
                  <button className="flex-1 px-4 py-2 border-2 border-emerald-700 text-emerald-700 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Store Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☕</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Order & Pay</h3>
              <p className="text-gray-600">
                Skip the line and pick up your order at any location
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📶</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Wi-Fi</h3>
              <p className="text-gray-600">
                Stay connected with complimentary high-speed internet
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🪑</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfortable Seating</h3>
              <p className="text-gray-600">
                Relax in our cozy spaces designed for work or leisure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
