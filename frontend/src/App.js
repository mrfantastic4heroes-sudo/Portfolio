import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Portfolio from "./components/Portfolio";
import { Toaster } from "./components/ui/toaster";
import LoadingBoundary from "./components/LoadingBoundary";
import SEOHead from "./components/SEOHead";

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <SEOHead />
        <BrowserRouter>
          <LoadingBoundary componentName="Portfolio" loadingText="Loading portfolio...">
            <Routes>
              <Route path="/" element={<Portfolio />} />
            </Routes>
          </LoadingBoundary>
          <Toaster />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;