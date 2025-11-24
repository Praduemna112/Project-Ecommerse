# E-Commerce Frontend

A modern, responsive e-commerce frontend application built with React and Vite, featuring advanced search functionality with filters and a beautiful UI.

## Features

- ✨ Modern, responsive navigation bar with glassmorphism effects
- 🔍 Advanced search functionality with API integration
- 🎯 Multi-filter system (Category, Brand, Price, Rating)
- 📱 Fully responsive design with mobile menu
- 🎨 Beautiful gradient color scheme with premium aesthetics
- ⚡ Fast development with Vite
- 🏗️ Clean component structure
- 💫 Smooth animations and transitions
- 🔄 Loading states and error handling

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

## Installation

1. Install Node.js from [nodejs.org](https://nodejs.org/)

2. Once Node.js is installed, navigate to this project directory and install dependencies:

```bash
npm install
```

## Running the Project

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Production Build & Deployment

#### 1. Build for Production

Create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder with minified and optimized files ready for deployment.

#### 2. Preview Production Build (Local Only)

Preview the production build locally:

```bash
npm run preview
```

Runs on `http://localhost:4173`

#### 3. Serve Production Build (Network Access) ⭐

Serve the production build with network access for testing on other devices:

```bash
npm run serve
```

This will display:
```
┌───────────────────────────────────────────┐
│   Serving!                                │
│   - Local:    http://localhost:3000       │
│   - Network:  http://192.168.x.x:3000     │
└───────────────────────────────────────────┘
```

**Benefits:**
- ✅ Automatically exposes network URL
- ✅ Access from phones, tablets, other computers on same WiFi
- ✅ Test on multiple devices simultaneously
- ✅ Share with team members on local network

**Note:** Make sure to run `npm run build` first before using `npm run serve`.

## Command Reference

| Command | Purpose | Access | Port |
|---------|---------|--------|------|
| `npm run dev` | Development with HMR | Local only | 5173 |
| `npm run build` | Create production build | - | - |
| `npm run preview` | Preview production locally | Local only | 4173 |
| `npm run serve` | Serve production on network | **Local + Network** | 3000 |

## Network Testing Workflow

To test your app on multiple devices (phones, tablets, other computers):

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **Start the network server:**
   ```bash
   npm run serve
   ```

3. **Note the Network URL** from the terminal output:
   ```
   - Network:  http://192.168.0.114:3000
   ```

4. **Open on other devices:**
   - On your phone: Open browser → Enter the Network URL
   - On another computer: Open browser → Enter the Network URL
   - On tablet: Open browser → Enter the Network URL

5. **Test the search functionality:**
   - Search for products
   - Apply filters
   - Test responsive design on different screen sizes

**Pro Tip:** The local address is automatically copied to your clipboard when you run `npm run serve`!


## Project Structure

```
frontend-ecommerce/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar with search
│   │   ├── Navbar.css
│   │   ├── SearchResults.jsx       # Search results page with filters
│   │   └── SearchResults.css
│   ├── App.jsx                     # Main app with state management
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## Technologies Used

- **React 18** - UI library with hooks
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features (custom properties, gradients, animations, glassmorphism)

## Search Functionality

### Overview
The application includes a comprehensive search system that integrates with a backend API to fetch and display products with advanced filtering capabilities.

### Features Implemented

#### 1. **Search API Integration**
- **API Endpoint**: `https://localhost:7151/api/products/search?q=${searchText}`
- Triggered when user clicks the search button in the Navbar
- Supports query parameter for search text
- Automatic encoding of search queries

#### 2. **Search Results Page**
- Beautiful, modern UI with gradient backgrounds and glassmorphism effects
- Displays products in a responsive grid layout
- Shows product details: title, category, brand, price, and rating
- Loading states with animated spinner
- Error handling with retry functionality
- "No results" state when no products match
- Back button to return to home page

#### 3. **Advanced Filters**
The filter panel includes:
- **Category**: smartphones, audio, laptops
- **Brand**: Sony, Samsung, Apple, OnePlus, Google, JBL, Bose, Dell
- **Price Ranges**: ₹0-500, ₹500-2000, ₹2000-5000, ₹5000-10000
- **Rating**: 4★ & above, 3★ & above, 2★ & above, 1★ & above

#### 4. **Filter API Integration**
When "Apply Filters" is clicked, the following API call is made:
```
https://localhost:7151/api/products/search?q=${searchText}&category=${category}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=relevance
```

#### 5. **Dual Filtering System**
- **Server-side filtering**: Via API when "Apply Filters" is clicked
- **Client-side filtering**: Local filtering of already fetched products for instant results

### How to Use the Search

#### Basic Search
1. Type your search query in the Navbar search bar
2. Click the search button (magnifying glass icon) or press Enter
3. View results on the Search Results page

#### Using Filters
1. Perform a search first
2. On the Search Results page, use the filter panel on the right side
3. Select desired filters by checking the boxes:
   - Choose categories (smartphones, audio, laptops)
   - Select brands
   - Pick price ranges
   - Filter by minimum rating
4. Click "Apply Filters" to fetch filtered results from the API
5. Click "Clear All" to reset all filters and show original search results

#### Navigation
- Click the "Back" button at the top of the search results page to return to the home page
- The Navbar is hidden on the search results page for a cleaner, focused view

## API Requirements

### Backend Expectations
Your backend API should support the following endpoints:

#### 1. **Basic Search**
- **Endpoint**: `GET /api/products/search?q={query}`
- **Returns**: Array of product objects

#### 2. **Filtered Search**
- **Endpoint**: `GET /api/products/search?q={query}&category={cat}&brand={brand}&minPrice={min}&maxPrice={max}&sort={sort}`
- **Returns**: Array of filtered product objects

### Product Object Structure
The API should return products in the following format:
```json
{
  "id": "unique-id",
  "title": "Product Name",
  "category": "smartphones",
  "brand": "Samsung",
  "price": 25000,
  "rating": 4.5
}
```

### HTTPS/SSL Note
The API uses `https://localhost:7151`. If you encounter SSL certificate errors during development:
- Make sure your backend is running with a valid SSL certificate
- Or temporarily modify the fetch calls in `SearchResults.jsx` to use `http://` instead of `https://` for local development

## Component Overview

### Navbar Component
- Responsive navigation with mobile menu
- Search input with smooth animations
- Glassmorphism design with backdrop blur
- Hover effects and transitions
- Active link highlighting
- Integrated search functionality with callback to parent

### SearchResults Component
- Full-page search results display
- Product grid with responsive layout
- Advanced filter panel with collapsible sections
- Loading spinner during API calls
- Error handling with retry option
- Empty state for no results
- Back navigation to home page

### App Component
- State management for search functionality
- Conditional rendering of home page vs search results
- Handles search query and navigation between views

## Styling Highlights

- **Gradient backgrounds**: Purple to blue gradient (`#667eea` to `#764ba2`) for visual appeal
- **Glassmorphism**: Frosted glass effect on cards and panels with backdrop blur
- **Smooth animations**: Hover effects, transitions, and loading states
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile devices
- **Premium aesthetics**: Modern, clean, and professional look
- **Accessibility**: Proper ARIA labels and semantic HTML

## Customization

### Color Scheme
You can customize the color scheme by modifying the CSS custom properties in `src/index.css`:

```css
:root {
  --primary-color: hsl(250, 84%, 54%);
  --secondary-color: hsl(340, 82%, 52%);
  /* ... other variables */
}
```

### Search Results Styling
Modify `src/components/SearchResults.css` to customize:
- Gradient colors
- Card layouts
- Filter panel appearance
- Animation timings

### Filter Options
To add or modify filter options, edit the arrays in `SearchResults.jsx`:
```javascript
// Categories
['smartphones', 'audio', 'laptops']

// Brands
['Sony', 'Samsung', 'Apple', 'OnePlus', 'Google', 'JBL', 'Bose', 'Dell']

// Price ranges
['0-500', '500-2000', '2000-5000', '5000-10000']
```

## Future Enhancements

Potential features to add:
- [ ] Product images and image galleries
- [ ] Pagination for large result sets
- [ ] Multiple sorting options (price low-to-high, high-to-low, rating, newest)
- [ ] Search history and suggestions
- [ ] Product detail view/modal
- [ ] Shopping cart functionality
- [ ] Wishlist feature
- [ ] User authentication
- [ ] Product comparison
- [ ] Reviews and ratings display

## Troubleshooting

### Common Issues

**Issue**: API calls failing with CORS errors
- **Solution**: Ensure your backend has CORS enabled for `http://localhost:5173` and `http://localhost:3000`

**Issue**: SSL certificate errors
- **Solution**: Use `http://` instead of `https://` for local development, or configure proper SSL certificates

**Issue**: Products not displaying
- **Solution**: Check browser console for errors, verify API is running and returning correct data format

**Issue**: Filters not working
- **Solution**: Ensure the API supports the filter parameters (category, brand, minPrice, maxPrice, sort)

**Issue**: Cannot access app from other devices on network
- **Solution**: 
  1. Make sure you're using `npm run serve` (not `npm run dev` or `npm run preview`)
  2. Check Windows Firewall - allow Node.js through the firewall when prompted
  3. Ensure both devices are on the same WiFi network
  4. Try accessing using the Network URL shown in the terminal (e.g., `http://192.168.x.x:3000`)
  5. Disable VPN if active, as it may interfere with local network access

**Issue**: How to find my network IP address
- **Solution**: 
  - Run `ipconfig` in PowerShell/Command Prompt
  - Look for "IPv4 Address" under your active network adapter
  - Or simply run `npm run serve` - it will display your network IP automatically

**Issue**: Firewall blocking network access
- **Solution**:
  1. When running `npm run serve`, Windows may show a firewall prompt
  2. Click "Allow access" for both Private and Public networks
  3. If you missed the prompt, manually allow Node.js in Windows Firewall settings

## Development Tips

1. **Hot Module Replacement**: Vite provides instant HMR - changes reflect immediately
2. **React DevTools**: Install React DevTools browser extension for debugging
3. **Console Logging**: Check browser console for API responses and errors
4. **Network Tab**: Use browser DevTools Network tab to inspect API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using React + Vite**
