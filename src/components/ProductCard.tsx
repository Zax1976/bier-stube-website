import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductItem } from './types';

interface ProductCardProps {
  product: ProductItem;
  onAddToCart?: (product: ProductItem, quantity: number, selectedSize?: string) => void;
  onQuickView?: (product: ProductItem) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  className = ''
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: '#991b1b',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, selectedSize);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  // Get stock status styling
  const getStockStatus = () => {
    if (!product.available) return { text: 'Out of Stock', color: 'text-red-500' };
    if (product.stock && product.stock < 5) return { text: 'Limited Stock', color: 'text-yellow-500' };
    return { text: 'In Stock', color: 'text-green-500' };
  };

  const stockStatus = getStockStatus();

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white rounded-xl shadow-lg overflow-hidden relative group ${className}`}
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <motion.img
          variants={imageVariants}
          src={product.image || `/api/placeholder/300/300?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with Quick Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div className="flex space-x-3">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleQuickView}
                  className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                >
                  Quick View
                </motion.button>
                {product.available && (
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setShowSizeSelector(!showSizeSelector)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                  >
                    Add to Cart
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sale/New Badge */}
        {product.category === 'collectibles' && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            LIMITED
          </div>
        )}

        {/* Stock Status Badge */}
        <div className={`absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
          {stockStatus.text}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">
          {product.category.replace('_', ' ')}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-red-600">
            ${product.price.toFixed(2)}
          </span>
          {product.stock && (
            <span className="text-sm text-gray-500">
              {product.stock} left
            </span>
          )}
        </div>

        {/* Size Selector */}
        <AnimatePresence>
          {(showSizeSelector || isHovered) && product.sizes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                      selectedSize === size
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quantity and Add to Cart */}
        <AnimatePresence>
          {(showSizeSelector || isHovered) && product.available && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center space-x-3"
            >
              {/* Quantity Selector */}
              <div className="flex items-center">
                <label className="text-sm font-semibold text-gray-700 mr-2">
                  Qty:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </motion.button>
                  <span className="px-3 py-1 text-gray-800 font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleAddToCart}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-200"
              >
                Add to Cart
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Out of Stock Button */}
        {!product.available && (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-md font-semibold text-sm cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>

      {/* OSU Pride Element */}
      {product.name.toLowerCase().includes('ohio') || product.name.toLowerCase().includes('buckeye') && (
        <div className="absolute bottom-2 right-2 bg-red-600 text-white p-1 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;