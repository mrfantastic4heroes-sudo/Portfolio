import React from 'react';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import LazyImage from './LazyImage';

const Hero = ({ data }) => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // Mock function - in real implementation would download actual resume
    console.log('Resume download initiated');
    // Could implement actual file download here
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4 animate-fadeIn">
              <h1 className="text-5xl lg:text-7xl font-light tracking-tight heading-font">
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                  {data?.name || 'Albee John'}
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 font-light heading-font">
                {data?.tagline || 'Data Scientist & Analytics Professional'}
              </p>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed body-font">
                {data?.description || 'Passionate about transforming raw data into actionable insights through advanced analytics, machine learning, and data-driven decision making.'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                View My Work
                <ExternalLink size={18} />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Download Resume
                <Download size={18} />
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-1 animate-float">
                <LazyImage
                  src="https://s3.amazonaws.com/appforest_uf/f1737011654924x871031063883914100/7fecccdc-7cd4-42f6-b095-1e7f7e1c7fdf.jpeg"
                  alt="Albee John - Data Scientist & Analytics Professional"
                  className="w-full h-full rounded-full border-4 border-gray-700"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors duration-300 animate-bounce"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;