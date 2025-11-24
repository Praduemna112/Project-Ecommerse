import React, { useState, useEffect } from 'react'
import './SearchResults.css'

function SearchResults({ searchQuery, onBack }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [expandedFilters, setExpandedFilters] = useState({
        category: true,
        brand: false,
        price: false,
        rating: false
    })

    const [filters, setFilters] = useState({
        category: [],
        brand: [],
        price: [],
        rating: []
    })

    // Fetch products on mount and when searchQuery changes
    useEffect(() => {
        if (searchQuery) {
            fetchProducts()
        }
    }, [searchQuery])

    const fetchProducts = async () => {
        if (!searchQuery.trim()) return

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(
                `https://localhost:7151/api/products/search?q=${encodeURIComponent(searchQuery)}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setProducts(data)
        } catch (err) {
            console.error('Search API error:', err)
            setError('Failed to fetch products. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleCheckboxChange = (key, value) => {
        setFilters((prev) => {
            const alreadySelected = prev[key].includes(value)

            return {
                ...prev,
                [key]: alreadySelected
                    ? prev[key].filter((item) => item !== value)
                    : [...prev[key], value]
            }
        })
    }

    const toggleFilterSection = (section) => {
        setExpandedFilters(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const applyFilterApiCall = async () => {
        if (!searchQuery.trim()) return

        setLoading(true)
        setError(null)

        // Extract values from filters
        const category = filters.category[0] || ''
        const brand = filters.brand[0] || ''

        // price example "500-2000"
        let minPrice = ''
        let maxPrice = ''
        if (filters.price.length > 0) {
            const [min, max] = filters.price[0].split('-').map(Number)
            minPrice = min
            maxPrice = max
        }

        const sort = 'relevance'

        // Build query string
        const url = new URL('https://localhost:7151/api/products/search')
        url.searchParams.append('q', searchQuery)
        if (category) url.searchParams.append('category', category)
        if (brand) url.searchParams.append('brand', brand)
        if (minPrice) url.searchParams.append('minPrice', minPrice)
        if (maxPrice) url.searchParams.append('maxPrice', maxPrice)
        url.searchParams.append('sort', sort)

        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setProducts(data)
        } catch (err) {
            console.error('Filter API error:', err)
            setError('Failed to apply filters. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const clearFilters = () => {
        setFilters({
            category: [],
            brand: [],
            price: [],
            rating: []
        })
        fetchProducts()
    }

    const applyLocalFilters = () => {
        return products.filter((p) => {
            const matchCategory =
                filters.category.length === 0 || filters.category.includes(p.category)

            const matchBrand =
                filters.brand.length === 0 || filters.brand.includes(p.brand)

            const matchRating =
                filters.rating.length === 0 ||
                filters.rating.includes(String(p.rating))

            const matchPrice =
                filters.price.length === 0 ||
                filters.price.some((range) => {
                    const [min, max] = range.split('-').map(Number)
                    return p.price >= min && p.price <= max
                })

            return matchCategory && matchBrand && matchRating && matchPrice
        })
    }

    const filteredProducts = applyLocalFilters()

    return (
        <div className="search-results-page">
            <div className="search-header">
                <button className="back-button" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1>Search Results for "{searchQuery}"</h1>
            </div>

            <div className="search-content">
                {/* LEFT SIDE: RESULTS */}
                <div className="results-section">
                    {loading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading products...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                            <button onClick={fetchProducts}>Retry</button>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <div className="results-header">
                                <h2>Products ({filteredProducts.length})</h2>
                            </div>

                            <div className="products-grid">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="product-card">
                                        <div className="product-image-placeholder">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product-title">{product.title}</h3>
                                            <p className="product-category">{product.category}</p>
                                            <p className="product-brand">Brand: {product.brand}</p>
                                            <div className="product-footer">
                                                <span className="product-price">₹{product.price?.toLocaleString()}</span>
                                                <span className="product-rating">
                                                    {product.rating}★
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredProducts.length === 0 && !loading && (
                                <div className="no-results">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.35-4.35" />
                                    </svg>
                                    <h3>No products found</h3>
                                    <p>Try adjusting your filters or search query</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* RIGHT SIDE: FILTERS */}
                <aside className="filters-panel">
                    <div className="filters-header">
                        <h2>Filters</h2>
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            Clear All
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="filter-group">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleFilterSection('category')}
                        >
                            <span>Category</span>
                            <svg
                                className={`toggle-icon ${expandedFilters.category ? 'expanded' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {expandedFilters.category && (
                            <div className="filter-options">
                                {['smartphones', 'audio', 'laptops'].map((item) => (
                                    <label key={item} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.category.includes(item)}
                                            onChange={() => handleCheckboxChange('category', item)}
                                        />
                                        <span>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Brand Filter */}
                    <div className="filter-group">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleFilterSection('brand')}
                        >
                            <span>Brand</span>
                            <svg
                                className={`toggle-icon ${expandedFilters.brand ? 'expanded' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {expandedFilters.brand && (
                            <div className="filter-options">
                                {['Sony', 'Samsung', 'Apple', 'OnePlus', 'Google', 'JBL', 'Bose', 'Dell'].map((item) => (
                                    <label key={item} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.brand.includes(item)}
                                            onChange={() => handleCheckboxChange('brand', item)}
                                        />
                                        <span>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Filter */}
                    <div className="filter-group">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleFilterSection('price')}
                        >
                            <span>Price</span>
                            <svg
                                className={`toggle-icon ${expandedFilters.price ? 'expanded' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {expandedFilters.price && (
                            <div className="filter-options">
                                {['0-500', '500-2000', '2000-5000', '5000-10000'].map((item) => (
                                    <label key={item} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.price.includes(item)}
                                            onChange={() => handleCheckboxChange('price', item)}
                                        />
                                        <span>₹{item.replace('-', ' - ₹')}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Rating Filter */}
                    <div className="filter-group">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleFilterSection('rating')}
                        >
                            <span>Rating</span>
                            <svg
                                className={`toggle-icon ${expandedFilters.rating ? 'expanded' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {expandedFilters.rating && (
                            <div className="filter-options">
                                {['4', '3', '2', '1'].map((item) => (
                                    <label key={item} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.rating.includes(item)}
                                            onChange={() => handleCheckboxChange('rating', item)}
                                        />
                                        <span>{item}★ & above</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="apply-filters-btn" onClick={applyFilterApiCall}>
                        Apply Filters
                    </button>
                </aside>
            </div>
        </div>
    )
}

export default SearchResults
