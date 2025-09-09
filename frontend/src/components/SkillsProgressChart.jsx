import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, Target, Award } from 'lucide-react';

const SkillsProgressChart = ({ skills }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) || {};

  const categories = ['all', ...Object.keys(skillsByCategory)];

  // Animate progress bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedValues = {};
      skills?.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedValues(prev => ({
            ...prev,
            [skill.name]: skill.level
          }));
        }, index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [skills]);

  // Filter skills based on selected category
  const filteredSkills = selectedCategory === 'all' 
    ? skills || []
    : skillsByCategory[selectedCategory] || [];

  // Calculate category averages
  const categoryAverages = Object.entries(skillsByCategory).map(([category, categorySkills]) => {
    const average = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
    return { category, average: Math.round(average), count: categorySkills.length };
  });

  return (
    <div className="space-y-6">
      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categoryAverages.map(({ category, average, count }) => (
          <Card 
            key={category}
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedCategory(category)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-200 group-hover:text-white transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-400">{count} skills</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">{average}%</div>
                  <div className="flex items-center gap-1 text-green-400 text-xs">
                    <TrendingUp size={12} />
                    <span>Avg</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
            }`}
          >
            {category === 'all' ? 'All Skills' : category}
          </button>
        ))}
      </div>

      {/* Interactive Skills Chart */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Skills Progress
            <span className="text-sm font-normal text-gray-400">
              ({filteredSkills.length} skills)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredSkills.map((skill, index) => {
            const animatedValue = animatedValues[skill.name] || 0;
            const proficiencyLevel = 
              animatedValue >= 90 ? 'Expert' :
              animatedValue >= 75 ? 'Advanced' :
              animatedValue >= 60 ? 'Intermediate' :
              'Beginner';
            
            const levelColor = 
              animatedValue >= 90 ? 'text-green-400' :
              animatedValue >= 75 ? 'text-blue-400' :
              animatedValue >= 60 ? 'text-yellow-400' :
              'text-gray-400';

            return (
              <div 
                key={skill.name}
                className="group p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-gray-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full bg-gray-600/50 ${levelColor}`}>
                      {proficiencyLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{animatedValue}%</span>
                    {animatedValue >= 85 && <Award size={16} className="text-yellow-400" />}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-600/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                        animatedValue >= 90 ? 'from-green-500 to-emerald-400' :
                        animatedValue >= 75 ? 'from-blue-500 to-cyan-400' :
                        animatedValue >= 60 ? 'from-yellow-500 to-orange-400' :
                        'from-gray-500 to-gray-400'
                      }`}
                      style={{
                        width: `${animatedValue}%`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Milestone markers */}
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-1">
                    {[25, 50, 75, 90].map(milestone => (
                      <div 
                        key={milestone}
                        className={`w-0.5 h-4 bg-gray-500/50 ${
                          animatedValue >= milestone ? 'opacity-0' : 'opacity-30'
                        } transition-opacity duration-500`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Skill Insights */}
                <div className="mt-2 text-xs text-gray-500">
                  <span>Category: {skill.category}</span>
                  {animatedValue >= 85 && (
                    <span className="ml-2 text-green-400">• Core Strength</span>
                  )}
                  {animatedValue >= 75 && animatedValue < 85 && (
                    <span className="ml-2 text-blue-400">• Strong Proficiency</span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Skills Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">
              {filteredSkills.filter(skill => skill.level >= 90).length}
            </div>
            <div className="text-sm text-gray-300">Expert Level</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">
              {filteredSkills.filter(skill => skill.level >= 75 && skill.level < 90).length}
            </div>
            <div className="text-sm text-gray-300">Advanced</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {filteredSkills.filter(skill => skill.level >= 60 && skill.level < 75).length}
            </div>
            <div className="text-sm text-gray-300">Intermediate</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-400">
              {Math.round(filteredSkills.reduce((sum, skill) => sum + skill.level, 0) / filteredSkills.length) || 0}%
            </div>
            <div className="text-sm text-gray-300">Average</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillsProgressChart;