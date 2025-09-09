import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Briefcase, GraduationCap, Award, Users } from 'lucide-react';

const CareerTimeline = ({ data }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef();

  // Combine all timeline events
  const timelineEvents = [
    // Education
    ...data?.personal?.education?.map(edu => ({
      id: `edu-${edu.institution}`,
      type: 'education',
      title: edu.degree,
      organization: edu.institution,
      period: edu.period,
      description: `Completed ${edu.degree} with ${edu.grade || 'excellent performance'}`,
      icon: GraduationCap,
      color: 'blue',
      details: {
        grade: edu.grade,
        type: 'Academic Achievement'
      }
    })) || [],

    // Experience
    ...data?.experience?.map(exp => ({
      id: `exp-${exp.id}`,
      type: 'experience',
      title: exp.title,
      organization: exp.company,
      period: exp.period,
      location: exp.location,
      description: exp.achievements?.[0] || 'Professional experience in data consulting',
      icon: Briefcase,
      color: 'green',
      details: {
        achievements: exp.achievements,
        technologies: exp.technologies,
        type: exp.type
      }
    })) || [],

    // Certifications
    ...data?.certifications?.map(cert => ({
      id: `cert-${cert.name}`,
      type: 'certification',
      title: cert.name,
      organization: cert.issuer,
      period: cert.period,
      description: cert.description,
      icon: Award,
      color: 'purple',
      details: {
        type: cert.type,
        category: 'Professional Certification'
      }
    })) || [],

    // Activities (converted to timeline format)
    ...data?.activities?.map((activity, index) => ({
      id: `activity-${index}`,
      type: 'activity',
      title: activity.includes('IEEE') ? 'IEEE Society Member' : 'Professional Development',
      organization: activity.includes('IEEE') ? 'IEEE' : 'Various Platforms',
      period: '2020 - Present',
      description: activity,
      icon: Users,
      color: 'cyan',
      details: {
        type: 'Extracurricular',
        category: 'Professional Activity'
      }
    })) || []
  ];

  // Sort events by period (most recent first)
  const sortedEvents = timelineEvents.sort((a, b) => {
    // Extract year from period string for sorting
    const getYear = (period) => {
      const match = period.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    return getYear(b.period) - getYear(a.period);
  });

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = timelineRef.current?.querySelectorAll('[data-id]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'from-blue-500/20 to-blue-600/20',
        border: 'border-blue-500/30',
        icon: 'bg-blue-500/20 text-blue-400',
        line: 'bg-blue-500/30'
      },
      green: {
        bg: 'from-green-500/20 to-green-600/20',
        border: 'border-green-500/30', 
        icon: 'bg-green-500/20 text-green-400',
        line: 'bg-green-500/30'
      },
      purple: {
        bg: 'from-purple-500/20 to-purple-600/20',
        border: 'border-purple-500/30',
        icon: 'bg-purple-500/20 text-purple-400',
        line: 'bg-purple-500/30'
      },
      cyan: {
        bg: 'from-cyan-500/20 to-cyan-600/20',
        border: 'border-cyan-500/30',
        icon: 'bg-cyan-500/20 text-cyan-400',
        line: 'bg-cyan-500/30'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative" ref={timelineRef}>
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-green-500/30 to-purple-500/30"></div>

      <div className="space-y-8">
        {sortedEvents.map((event, index) => {
          const colorClasses = getColorClasses(event.color);
          const isVisible = visibleItems.has(event.id);
          const isActive = activeItem === event.id;

          return (
            <div
              key={event.id}
              data-id={event.id}
              className={`relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline Icon */}
              <div className={`absolute left-6 w-4 h-4 rounded-full ${colorClasses.icon} border-2 border-gray-800 z-10 flex items-center justify-center transform -translate-x-1/2`}>
                <event.icon size={8} />
              </div>

              {/* Content Card */}
              <div className="ml-20">
                <Card 
                  className={`bg-gradient-to-br ${colorClasses.bg} ${colorClasses.border} hover:bg-opacity-80 transition-all duration-300 cursor-pointer group ${
                    isActive ? 'ring-2 ring-blue-400/50 scale-105' : ''
                  }`}
                  onClick={() => setActiveItem(isActive ? null : event.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 font-medium">{event.organization}</p>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={`${colorClasses.icon} border-current`}
                      >
                        {event.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {event.period}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Expandable Details */}
                    {isActive && event.details && (
                      <div className="border-t border-gray-600/30 pt-4 mt-4 space-y-3 animate-fadeIn">
                        {event.details.achievements && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-2">Key Achievements:</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {event.details.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {event.details.technologies && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {event.details.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-gray-700/50 text-gray-300">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {event.details.grade && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-1">Performance:</h4>
                            <p className="text-sm text-green-400">{event.details.grade}</p>
                          </div>
                        )}

                        {event.details.type && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-1">Type:</h4>
                            <p className="text-sm text-gray-300">{event.details.type}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Click indicator */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xs text-gray-500">
                        Click to {isActive ? 'collapse' : 'expand'} details
                      </div>
                      <div className={`w-2 h-2 rounded-full ${colorClasses.icon.split(' ')[0]} transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                      }`}>
                        <div className="w-full h-full rounded-full animate-pulse opacity-60"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline Summary */}
      <div className="mt-12 ml-20">
        <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Journey Summary</h3>
            <p className="text-gray-300 mb-4">
              From academic excellence to professional growth in data science and analytics
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Education', count: data?.personal?.education?.length || 0, color: 'blue' },
                { label: 'Experience', count: data?.experience?.length || 0, color: 'green' },
                { label: 'Certifications', count: data?.certifications?.length || 0, color: 'purple' },
                { label: 'Activities', count: data?.activities?.length || 0, color: 'cyan' }
              ].map(({ label, count, color }) => {
                const colorClasses = getColorClasses(color);
                return (
                  <div key={label} className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses.bg} ${colorClasses.border}`}>
                    <div className={`text-2xl font-bold ${colorClasses.icon.split(' ')[2]}`}>
                      {count}
                    </div>
                    <div className="text-sm text-gray-300">{label}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerTimeline;