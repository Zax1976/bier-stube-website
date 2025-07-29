import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Header, 
  Footer, 
  ProductCard, 
  BRAND_COLORS,
  type ProductItem 
} from '../components';
import { dbService } from '../firebase/database';
import { authService } from '../firebase/auth';
import { Product, ProductCategory, ProductFilters, Cart, CartItem } from '../firebase/types';

interface CartSummary {
  items: (CartItem & { product: Product })[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const MerchStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'featured'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const categories: { value: ProductCategory | 'all', label: string, icon: string }[] = [
    { value: 'all', label: 'All Products', icon: '🛍️' },
    { value: 'apparel', label: 'Apparel', icon: '👕' },
    { value: 'drinkware', label: 'Drinkware', icon: '🍺' },
    { value: 'accessories', label: 'Accessories', icon: '🎒' },
    { value: 'collectibles', label: 'Collectibles', icon: '🏆' },
    { value: 'gift-cards', label: 'Gift Cards', icon: '🎁' }
  ];

  useEffect(() => {
    loadProducts();
    if (authService.isAuthenticated()) {
      loadCart();
    }
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, selectedCategory, sortBy, searchQuery, priceRange]);

  useEffect(() => {
    if (cart) {
      calculateCartSummary();
    }
  }, [cart, products]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await dbService.getProducts({}, 1, 50);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const user = authService.getCurrentUser();
      if (user) {
        const userCart = await dbService.getCart(user.uid);
        setCart(userCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  };

  const calculateCartSummary = async () => {
    if (!cart || cart.items.length === 0) {
      setCartSummary(null);
      return;
    }

    try {
      const itemsWithProducts = await Promise.all(
        cart.items.map(async (item) => {
          const product = await dbService.getProduct(item.productId);
          return { ...item, product: product! };
        })
      );

      const subtotal = itemsWithProducts.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
      const tax = subtotal * 0.08; // 8% tax
      const total = subtotal + tax;
      const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

      setCartSummary({
        items: itemsWithProducts,
        subtotal,
        tax,
        total,
        itemCount
      });
    } catch (error) {
      console.error('Error calculating cart summary:', error);
    }
  };

  const handleAddToCart = async (product: ProductItem, quantity: number, selectedSize?: string) => {
    if (!authService.isAuthenticated()) {
      // Handle guest checkout or require login
      alert('Please log in to add items to cart');
      return;
    }

    try {
      const user = authService.getCurrentUser();
      if (!user) return;

      const cartItem: CartItem = {
        productId: product.id,
        variantId: selectedSize,
        quantity,
        selectedAt: new Date() as any
      };

      const response = await dbService.addToCart(user.uid, cartItem);
      if (response.success) {
        setCart(response.data!);
        // Show success message
        console.log('Added to cart successfully');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = async (productId: string, variantId?: string) => {
    if (!authService.isAuthenticated()) return;

    try {
      const user = authService.getCurrentUser();
      if (!user) return;

      const response = await dbService.removeFromCart(user.uid, productId, variantId);
      if (response.success) {
        setCart(response.data!);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleQuickView = (product: ProductItem) => {
    // Implement quick view modal
    console.log('Quick view:', product);
  };

  // Convert Firebase Product to ProductItem
  const convertProduct = (product: Product): ProductItem => ({
    id: product.id,
    category: product.category,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    available: product.isActive && product.stock > 0,
    sizes: product.variants?.map(v => v.value) || [],
    image: product.images?.[0]?.url
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Merchandise Store
            </h1>
            <p className="text-xl sm:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Show your Buckeye pride with authentic Bier Stube merchandise. 
              From vintage-inspired apparel to collectible drinkware.
            </p>
            
            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fixed top-20 right-4 lg:right-8 z-40 bg-white text-red-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              {cartSummary && cartSummary.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                  {cartSummary.itemCount}
                </span>
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Sort and Filter Toggle */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                <span>Filters</span>
              </motion.button>
            </div>
          </div>

          {/* Advanced Filters (Mobile) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg lg:hidden"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.value === selectedCategory)?.label}
            <span className="text-gray-500 text-lg ml-2">({filteredProducts.length})</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg h-96 animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={productVariants}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  product={convertProduct(product)}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl text-gray-300 mb-4">🛍️</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <motion.button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceRange([0, 100]);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors duration-200"
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Shopping Cart
                    {cartSummary && (
                      <span className="text-gray-500 text-base ml-2">
                        ({cartSummary.itemCount} items)
                      </span>
                    )}
                  </h2>
                  <motion.button
                    onClick={() => setIsCartOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <div className="flex-1 p-6">
                {cartSummary && cartSummary.items.length > 0 ? (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {cartSummary.items.map((item) => (
                        <div key={`${item.productId}-${item.variantId}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={item.product.images?.[0]?.url || '/api/placeholder/80/80'}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{item.product.name}</h4>
                            {item.variantId && (
                              <p className="text-sm text-gray-500">Size: {item.variantId}</p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                              <span className="font-semibold text-red-600">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => handleRemoveFromCart(item.productId, item.variantId)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 9.586 7.707 7.293a1 1 0 00-1.414 1.414L8.586 11l-2.293 2.293a1 1 0 101.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 11l2.293-2.293z" clipRule="evenodd" />
                            </svg>
                          </motion.button>
                        </div>
                      ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>${cartSummary.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax:</span>
                        <span>${cartSummary.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
                        <span>Total:</span>
                        <span>${cartSummary.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Buttons */}
                    <div className="mt-6 space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-full font-bold text-lg transition-colors duration-200"
                      >
                        Proceed to Checkout
                      </motion.button>
                      <motion.button
                        onClick={() => setIsCartOpen(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 py-3 px-4 rounded-full font-bold transition-colors duration-200"
                      >
                        Continue Shopping
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl text-gray-300 mb-4">🛒</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add some Bier Stube merchandise to get started!</p>
                    <motion.button
                      onClick={() => setIsCartOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors duration-200"
                    >
                      Start Shopping
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MerchStore;