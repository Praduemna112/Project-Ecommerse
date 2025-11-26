import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Try these import paths - adjust based on your actual folder structure
import image1 from "../assets/image1.jpg"; // if assets is in src folder
import image2 from "../assets/image2.jpg";

// OR if images are in public folder, use:
// const image1 = "/assets/image1.jpg";
// const image2 = "/assets/image2.jpg";

const images = [
  image1,
  image2,
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Check if images are loaded
  useEffect(() => {
    if (images.length > 0 && images[0]) {
      setImagesLoaded(true);
    }
  }, []);

  // Automatically rotate images every 3 seconds
  useEffect(() => {
    if (imagesLoaded && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [imagesLoaded]);

  const prevSlide = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const nextSlide = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  // Debug: Check what's in the images array
  console.log('Images array:', images);
  console.log('Current image:', images[currentIndex]);

  // If no images or images not loaded, show placeholder
  if (!imagesLoaded || images.length === 0) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "600px",
          height: "300px",
          overflow: "hidden",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          border: "2px dashed #ccc",
          borderRadius: 2
        }}
      >
        <Typography color="textSecondary">
          {images.length === 0 ? "No images found. Check file paths." : "Loading images..."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "600px",
        height: "300px",
        overflow: "hidden",
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
        }}
        onError={(e) => {
          console.error('Error loading image:', images[currentIndex]);
          e.target.style.display = 'none';
        }}
      />
      
      {/* Navigation Arrows */}
      <IconButton
        onClick={prevSlide}
        sx={{ 
          position: "absolute", 
          top: "50%", 
          left: "10px", 
          transform: "translateY(-50%)", 
          color: "white",
          backgroundColor: "rgba(0,0,0,0.5)",
          '&:hover': {
            backgroundColor: "rgba(0,0,0,0.7)"
          }
        }}
      >
        <ArrowBackIos />
      </IconButton>
      
      <IconButton
        onClick={nextSlide}
        sx={{ 
          position: "absolute", 
          top: "50%", 
          right: "10px", 
          transform: "translateY(-50%)", 
          color: "white",
          backgroundColor: "rgba(0,0,0,0.5)",
          '&:hover': {
            backgroundColor: "rgba(0,0,0,0.7)"
          }
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Indicator Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px"
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer"
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;