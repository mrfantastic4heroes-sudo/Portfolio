import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-6">
          {/* Brand */}
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AJ
          </div>
          
          {/* Quote */}
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            "Technology is best when it brings people together and solves real problems."
          </p>
          
          {/* Made with love */}
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>using</span>
            <Code className="w-4 h-4 text-blue-400" />
            <span>React &</span>
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>lots of coffee</span>
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © {currentYear} Albee John. All rights reserved. | Crafted with passion for innovation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;