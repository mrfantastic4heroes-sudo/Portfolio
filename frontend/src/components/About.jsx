import React from 'react';
import { GraduationCap, Award, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A passionate technologist with a strong foundation in computer science and a drive for continuous learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-300 leading-relaxed text-lg">
                I am an aspiring learner, fascinated with the expanse of technology and the field of Computer Science. 
                Currently pursuing expertise in Data Science and Machine Learning while maintaining strong full-stack development skills.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                My journey spans from academic excellence to practical implementation, with experience in consulting and complex data management. 
                I believe in continuous learning and staying updated with the latest technological advancements.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                My goal is to contribute to innovative projects that make a meaningful impact through technology, 
                combining analytical thinking with creative problem-solving.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">4+</div>
                <div className="text-sm text-gray-400">Years of Study</div>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400">2+</div>
                <div className="text-sm text-gray-400">Months Experience</div>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">5+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="space-y-6">
            <Card className="bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
                    <div className="space-y-3">
                      {data?.education?.map((edu, index) => (
                        <div key={index} className="border-l-2 border-blue-400/30 pl-4">
                          <h4 className="font-medium text-gray-200">{edu.degree}</h4>
                          <p className="text-gray-400 text-sm">{edu.institution}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">{edu.period}</span>
                            {edu.grade && (
                              <span className="text-xs text-green-400 font-medium">{edu.grade}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Certifications</h3>
                    <div className="space-y-3">
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="font-medium text-gray-200">Data Science With Python And Machine Learning</h4>
                        <p className="text-gray-400 text-sm">Soften Technologies</p>
                        <span className="text-xs text-gray-500">Aug 2024 - Mar 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Activities</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        IEEE Society Member - Active college member focusing on engineering innovation
                      </li>
                      <li className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        Continuous learner in emerging technologies and industry trends
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;