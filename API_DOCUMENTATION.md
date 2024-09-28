# UK Grocery Price Comparison API Documentation

## Overview
This API provides real-time price comparison across major UK grocery stores.

## Endpoints

### GET /api/search
Search for products across all supported stores.

**Parameters:**
- q (string): Search query
- limit (number, optional): Maximum results per store (default: 10)

**Response:**
`json
{
  "query": "milk",
  "stores": {
    "tesco": [
      {
        "name": "Tesco Whole Milk 2L",
        "price": "£1.45",
        "image": "https://...",
        "store": "tesco"
      }
    ]
  }
}
`

### GET /api/compare/:productId
Get detailed price comparison for a specific product.

### GET /api/deals
Get current deals and special offers.

## Rate Limits
- 100 requests per minute per IP
- 1000 requests per hour per IP

## Error Responses
All errors return JSON with error and message fields.

## Last Updated: September 2024
