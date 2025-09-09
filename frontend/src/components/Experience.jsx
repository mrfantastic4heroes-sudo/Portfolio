import React from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Experience = ({ data }) => {
  return (
    <section id="experience" className="py-20 bg-gray-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            Work <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional journey combining consulting expertise with data analytics excellence
          </p>
        </div>

        <div className="space-y-8">
          {data?.map((experience, index) => (
            <Card key={experience.id || index} className="bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
                      <Briefcase className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white mb-2">{experience.title}</CardTitle>
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-200">{experience.company}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {experience.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {experience.period}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={experience.type === 'Contract' ? 'secondary' : 'default'}
                    className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                  >
                    {experience.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-6">
                  {/* Achievements */}
                  <div>
                    <h4 className="text-gray-200 font-medium mb-3">Key Achievements</h4>
                    <div className="grid gap-2">
                      {experience.achievements?.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  {experience.technologies && (
                    <div>
                      <h4 className="text-gray-200 font-medium mb-3">Technologies & Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex}
                            variant="outline"
                            className="bg-gray-600/30 text-gray-300 border-gray-500 hover:bg-gray-600/50 transition-colors duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Future Goals Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Looking Forward</h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Seeking challenging roles in data science and analytics that leverage my passion for extracting insights 
              from complex datasets. Ready to contribute to data-driven organizations that use analytics to solve 
              real-world problems and drive strategic decision-making.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Data Science</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Machine Learning</Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Statistical Analysis</Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Data Analytics</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Experience;