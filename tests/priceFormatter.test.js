const { formatPrice, priceToNumber, calculateSavings } = require('../utils/priceFormatter');

describe('Price Formatter Utils', () => {
    test('formatPrice should format prices correctly', () => {
        expect(formatPrice('2.50')).toBe('£2.50');
        expect(formatPrice('£3.99')).toBe('£3.99');
        expect(formatPrice('5')).toBe('£5.00');
        expect(formatPrice('')).toBe('£0.00');
    });

    test('priceToNumber should convert price strings to numbers', () => {
        expect(priceToNumber('£2.50')).toBe(2.50);
        expect(priceToNumber('3.99')).toBe(3.99);
        expect(priceToNumber('invalid')).toBe(0);
    });

    test('calculateSavings should calculate savings correctly', () => {
        const savings = calculateSavings('£3.00', '£2.50');
        expect(savings.amount).toBe('£0.50');
        expect(savings.percentage).toBe(16.7);
    });
});
