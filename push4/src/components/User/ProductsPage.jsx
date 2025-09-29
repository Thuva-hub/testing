import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Filter, Grid, List, Search, Star } from "lucide-react";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const sportParam = searchParams.get("sport");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else if (sportParam) {
      // You can handle sport-specific filtering here if needed
      setSelectedCategory("All");
    }
  }, [searchParams]);

  const categories = [
    "All",
    "Jerseys",
    "Tracksuits",
    "Bottom & Shorts",
    "Lifestyle Kits",
    "Bestsellers",
    "Hoodies",
    "Accessories",
  ];

  // Sample products data
  const sampleProducts = [
    // Jerseys
    {
      id: 1,
      name: "Premium Cricket Jersey",
      category: "Jerseys",
      price: 49.99,
      image: "/assets/cricket.png",
      rating: 4.5,
      reviews: 124,
      description:
        "Professional grade cricket jersey with moisture-wicking fabric",
      isBestseller: true,
    },
    {
      id: 2,
      name: "Football Team Jersey",
      category: "Jerseys",
      price: 54.99,
      image: "/assets/football.png",
      rating: 4.7,
      reviews: 89,
      description: "Lightweight football jersey with custom team colors",
      isBestseller: true,
    },
    {
      id: 3,
      name: "Basketball Pro Jersey",
      category: "Jerseys",
      price: 47.99,
      image: "/assets/basketball.png",
      rating: 4.3,
      reviews: 156,
      description: "Breathable basketball jersey for peak performance",
      isBestseller: false,
    },

    // Tracksuits
    {
      id: 4,
      name: "Elite Training Tracksuit",
      category: "Tracksuits",
      price: 89.99,
      image: "/assets/image.png",
      rating: 4.6,
      reviews: 67,
      description: "Complete tracksuit set for training and warm-ups",
      isBestseller: true,
    },
    {
      id: 5,
      name: "Team Presentation Tracksuit",
      category: "Tracksuits",
      price: 124.99,
      image: "/assets/image.png",
      rating: 4.8,
      reviews: 43,
      description: "Professional presentation tracksuit for team events",
      isBestseller: false,
    },

    // Bottom & Shorts
    {
      id: 6,
      name: "Athletic Performance Shorts",
      category: "Bottom & Shorts",
      price: 29.99,
      image: "/assets/image.png",
      rating: 4.4,
      reviews: 201,
      description: "Comfortable shorts for all sports activities",
      isBestseller: true,
    },
    {
      id: 7,
      name: "Training Track Pants",
      category: "Bottom & Shorts",
      price: 39.99,
      image: "/assets/image.png",
      rating: 4.2,
      reviews: 78,
      description: "Flexible track pants for training sessions",
      isBestseller: false,
    },

    // Lifestyle Kits
    {
      id: 8,
      name: "Complete Sports Kit",
      category: "Lifestyle Kits",
      price: 149.99,
      image: "/assets/image.png",
      rating: 4.9,
      reviews: 34,
      description: "Complete sports kit with jersey, shorts, and accessories",
      isBestseller: true,
    },

    // Hoodies
    {
      id: 9,
      name: "Team Spirit Hoodie",
      category: "Hoodies",
      price: 64.99,
      image: "/assets/image.png",
      rating: 4.5,
      reviews: 92,
      description: "Warm and comfortable hoodie for team supporters",
      isBestseller: false,
    },
    {
      id: 10,
      name: "Athletic Performance Hoodie",
      category: "Hoodies",
      price: 69.99,
      image: "/assets/image.png",
      rating: 4.7,
      reviews: 115,
      description: "Performance hoodie for training and casual wear",
      isBestseller: true,
    },

    // Accessories
    {
      id: 11,
      name: "Sports Water Bottle",
      category: "Accessories",
      price: 19.99,
      image: "/assets/image.png",
      rating: 4.3,
      reviews: 267,
      description: "Insulated water bottle for sports activities",
      isBestseller: false,
    },
    {
      id: 12,
      name: "Team Sports Bag",
      category: "Accessories",
      price: 79.99,
      image: "/assets/image.png",
      rating: 4.6,
      reviews: 58,
      description: "Durable sports bag for team equipment",
      isBestseller: true,
    },
  ];

  // Filter products based on category, search term, and bestseller status
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Bestsellers" && product.isBestseller) ||
      product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      {product.isBestseller && (
        <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 absolute z-10 rounded-br-lg">
          BESTSELLER
        </div>
      )}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">
            {product.category}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-gray-900 to-black text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.4) 0%, transparent 50%)`,
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-green-400">Products</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover our complete range of premium sportswear designed for peak
            performance
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Controls */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {sortedProducts.length} products found
                </span>
              </div>
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-green-500 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-green-500 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-gray-900 to-black text-white py-16">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.4) 0%, transparent 50%)`,
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let us create something custom just for you. Any sport, any design,
            any size.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 text-black px-8 py-3 rounded-lg hover:bg-green-400 transition-colors font-bold text-lg">
              Customize Your Design
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors font-bold text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductsPage;
