import React, { useState } from 'react'
import Navbar from './components/Navbar'
import SearchResults from './components/SearchResults'
import './App.css'

function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearchResults, setShowSearchResults] = useState(false)

    const handleSearch = (query) => {
        setSearchQuery(query)
        setShowSearchResults(true)
    }

    const handleBackToHome = () => {
        setShowSearchResults(false)
        setSearchQuery('')
    }

    return (
        <div className="app">
            {!showSearchResults && <Navbar onSearch={handleSearch} />}

            {showSearchResults ? (
                <SearchResults
                    searchQuery={searchQuery}
                    onBack={handleBackToHome}
                />
            ) : (
                <main className="main-content">
                    <div className="container">
                        <h1>Welcome to Our Store</h1>
                        <p>Your homepage content goes here</p>
                    </div>
                </main>
            )}
        </div>
    )
}

export default App
