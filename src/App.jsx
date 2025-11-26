import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ImageSlider from "./components/ImageSlider";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ImageSlider/>} />
      </Routes>
    </Layout>
  );
}

export default App;
