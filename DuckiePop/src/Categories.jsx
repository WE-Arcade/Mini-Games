// Categories.jsx
import React, { useState } from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Generative AI',
      imgSrc: '/icons/duck_genai.png',
      words: ['transformer', 'neural', 'chatbot', 'diffusion', 'prompt']
    },
    {
      id: 2,
      name: 'Web Development',
      imgSrc: '/icons/duck_web.png',
      words: ['javascript', 'react', 'html', 'css', 'api']
    },
    {
      id: 3,
      name: 'Machine Learning',
      imgSrc: '/icons/duck_ml.png',
      words: ['algorithm', 'dataset', 'model', 'tensor', 'neuron']
    },
    {
      id: 4,
      name: 'Mathematics',
      imgSrc: '/icons/duck_math.png',
      words: ['calculus', 'algebra', 'matrix', 'vector', 'gradient']
    }
  ];
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePlayClick = () => {
    if (selectedCategory) {
      // Store the selected words and category in localStorage
      localStorage.setItem('gameWords', JSON.stringify(selectedCategory.words));
      localStorage.setItem('selectedCategory', selectedCategory.name);
      window.location.href = '/game';
    }
  };

  return (
    <div className="categories-page">
      {/* Home Icon */}
      <div className="home-icon">
      <Link to="/" className="home-icon">
     <img src="/icons/home.ico" alt="Home" />
      </Link>
      </div>

      {/* Logo */}
      <header className="categories-header">
        <img src="/icons/duckie_logo.png" alt="Don't Pop The Duckie Logo" className="logo" />
      </header>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="categories-title">Choose a Category</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <div
              className={`category-card ${selectedCategory?.id === category.id ? 'selected' : ''}`}
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.imgSrc}
                alt={category.name}
                className="category-image"
              />
              <h3 className="category-name">{category.name}</h3>
            </div>
          ))}
        </div>

        {/* Play Button */}
        <button
          className="play-button"
          onClick={handlePlayClick}
          disabled={!selectedCategory}
        >
          Play Game
        </button>
      </section>
    </div>
  );
};

export default Categories;