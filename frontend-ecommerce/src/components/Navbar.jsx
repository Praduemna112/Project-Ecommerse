import React, { useState } from 'react'
import './Navbar.css'

function Navbar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim() && onSearch) {
            onSearch(searchQuery)
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h2>ShopHub</h2>
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger-icon"></span>
                    <span className="hamburger-icon"></span>
                    <span className="hamburger-icon"></span>
                </button>

                <div className={`navbar-right ${isMobileMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><a href="#home" className="nav-link active">Home</a></li>
                        <li><a href="#about" className="nav-link">About</a></li>
                        <li><a href="#contact" className="nav-link">Contact</a></li>
                    </ul>

                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            type="search"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            aria-label="Search"
                        />
                        <button type="submit" className="search-button" aria-label="Submit search">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
