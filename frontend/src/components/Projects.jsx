import React from 'react';
import { ExternalLink, Github, Calendar, CheckCircle, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Projects = ({ data }) => {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing technical expertise through innovative full-stack development projects
          </p>
        </div>

        <div className="grid gap-8">
          {data?.map((project, index) => (
            <Card key={project.id || index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Project Image/Visual */}
                <div className="lg:col-span-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      MERN
                    </div>
                    <div className="text-gray-400 text-sm mt-1">Full-Stack</div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-2xl text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.period}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              project.status === 'Completed' 
                                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                            }`}
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                          onClick={() => console.log('GitHub link:', project.github)}
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                          onClick={() => console.log('Demo link:', project.demo)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-6">
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-gray-200 font-medium mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex}
                              className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Key Highlights */}
                      {project.highlights && (
                        <div>
                          <h4 className="text-gray-200 font-medium mb-3">Key Highlights</h4>
                          <div className="grid gap-2">
                            {project.highlights.map((highlight, highlightIndex) => (
                              <div key={highlightIndex} className="flex items-start gap-3">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm leading-relaxed">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Future Projects Section */}
        <Card className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">More Projects Coming Soon</h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              Currently working on exciting data science and machine learning projects that showcase 
              the practical application of AI technologies in solving real-world problems.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Data Visualization</Badge>
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Predictive Analytics</Badge>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">NLP Applications</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Computer Vision</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Projects;