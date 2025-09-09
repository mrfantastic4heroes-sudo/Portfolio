import React from 'react';
import { GraduationCap, Award, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import CareerTimeline from './CareerTimeline';
import { ScrollReveal, CountUpAnimation } from './ScrollAnimations';

const About = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-gray-800/50 relative">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal animation="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 heading-font">
              About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">Me</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed body-font">
              A passionate data scientist with a strong foundation in analytics and a drive for continuous learning
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Bio Section */}
          <ScrollReveal animation="fadeInLeft" delay={200}>
            <div className="space-y-6">
              <div className="prose prose-lg prose-invert">
                <p className="text-gray-300 leading-relaxed text-lg body-font">
                  I am an aspiring data scientist, fascinated with the expanse of data analytics and machine learning technologies. 
                  Currently pursuing expertise in Data Science and advanced analytics while building strong foundations in statistical analysis and predictive modeling.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg body-font">
                  My journey spans from academic excellence to practical implementation, with experience in consulting and complex data analysis. 
                  I believe in the power of data to drive meaningful insights and strategic decision-making.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg body-font">
                  My goal is to contribute to innovative data-driven projects that solve real-world problems through advanced analytics and machine learning applications, 
                  combining analytical thinking with creative problem-solving.
                </p>
              </div>

              {/* Quick Stats */}
              <ScrollReveal animation="scaleIn" delay={400}>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                    <CountUpAnimation end={4} className="text-2xl font-bold text-blue-400 heading-font" suffix="+" />
                    <div className="text-sm text-gray-400 body-font">Years of Study</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                    <CountUpAnimation end={3} className="text-2xl font-bold text-cyan-400 heading-font" suffix="+" />
                    <div className="text-sm text-gray-400 body-font">Months Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                    <CountUpAnimation end={8} className="text-2xl font-bold text-green-400 heading-font" suffix="+" />
                    <div className="text-sm text-gray-400 body-font">Technologies</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Education & Achievements */}
          <ScrollReveal animation="fadeInRight" delay={300}>
            <div className="space-y-6">
              <Card className="bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 heading-font">Education</h3>
                      <div className="space-y-3">
                        {data?.education?.map((edu, index) => (
                          <div key={index} className="border-l-2 border-blue-400/30 pl-4">
                            <h4 className="font-medium text-gray-200 body-font">{edu.degree}</h4>
                            <p className="text-gray-400 text-sm body-font">{edu.institution}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500 body-font">{edu.period}</span>
                              {edu.grade && (
                                <span className="text-xs text-green-400 font-medium body-font">{edu.grade}</span>
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
                      <h3 className="text-xl font-semibold text-white mb-2 heading-font">Certifications</h3>
                      <div className="space-y-3">
                        <div className="border-l-2 border-cyan-400/30 pl-4">
                          <h4 className="font-medium text-gray-200 body-font">Data Science With Python And Machine Learning</h4>
                          <p className="text-gray-400 text-sm body-font">Soften Technologies</p>
                          <span className="text-xs text-gray-500 body-font">Aug 2024 - Mar 2025</span>
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
                      <h3 className="text-xl font-semibold text-white mb-2 heading-font">Activities</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 text-sm flex items-start gap-2 body-font">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          IEEE Society Member - Active college member focusing on engineering innovation
                        </li>
                        <li className="text-gray-300 text-sm flex items-start gap-2 body-font">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          Continuous learner in emerging technologies and industry trends
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>

        {/* Career Timeline */}
        <ScrollReveal animation="fadeInUp" delay={600}>
          <div className="mb-12">
            <h3 className="text-3xl font-light text-white mb-8 text-center heading-font">
              My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">Journey</span>
            </h3>
            <CareerTimeline data={data} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;