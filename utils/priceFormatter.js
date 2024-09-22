/**
 * Utility functions for formatting prices and handling UK currency
 */

/**
 * Format price to consistent format (£X.XX)
 * @param {string|number} price - Raw price string or number
 * @returns {string} Formatted price
 */
function formatPrice(price) {
    if (!price) return '£0.00';
    
    // Remove any non-numeric characters except decimal point
    const numericPrice = price.toString().replace(/[^\d.]/g, '');
    const parsedPrice = parseFloat(numericPrice);
    
    if (isNaN(parsedPrice)) return '£0.00';
    
    return £${parsedPrice.toFixed(2)};
}

/**
 * Convert price string to number for calculations
 * @param {string} priceString - Price string (e.g., "£2.50")
 * @returns {number} Price as number
 */
function priceToNumber(priceString) {
    if (!priceString) return 0;
    const numericPrice = priceString.replace(/[^\d.]/g, '');
    return parseFloat(numericPrice) || 0;
}

/**
 * Calculate savings between two prices
 * @param {string} originalPrice - Original price
 * @param {string} comparePrice - Price to compare against
 * @returns {object} Savings amount and percentage
 */
function calculateSavings(originalPrice, comparePrice) {
    const original = priceToNumber(originalPrice);
    const compare = priceToNumber(comparePrice);
    
    if (original === 0 || compare === 0) {
        return { amount: '£0.00', percentage: 0 };
    }
    
    const savingsAmount = Math.abs(original - compare);
    const savingsPercentage = ((savingsAmount / Math.max(original, compare)) * 100).toFixed(1);
    
    return {
        amount: formatPrice(savingsAmount),
        percentage: parseFloat(savingsPercentage)
    };
}

module.exports = {
    formatPrice,
    priceToNumber,
    calculateSavings
};
