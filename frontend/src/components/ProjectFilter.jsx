import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ProjectFilter = ({ projects = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'alphabetical', 'status'

  // Extract all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      project.technologies?.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Extract all unique statuses
  const allStatuses = useMemo(() => {
    const statusSet = new Set();
    projects.forEach(project => {
      if (project.status) statusSet.add(project.status);
    });
    return Array.from(statusSet);
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTechnology = selectedTechnology === 'all' || 
                               project.technologies?.includes(selectedTechnology);
      
      const matchesStatus = selectedStatus === 'all' || 
                           project.status === selectedStatus;

      return matchesSearch && matchesTechnology && matchesStatus;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'recent':
        default:
          // Assuming more recent projects have later periods
          return b.period.localeCompare(a.period);
      }
    });

    return filtered;
  }, [projects, searchTerm, selectedTechnology, selectedStatus, sortBy]);

  const ProjectCard = ({ project, isListView = false }) => (
    <Card className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group ${isListView ? 'mb-4' : ''}`}>
      <div className={`${isListView ? 'flex items-center' : 'block'}`}>
        {/* Project Icon/Visual */}
        <div className={`${isListView ? 'w-24 h-24 flex-shrink-0' : 'h-32'} bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center ${isListView ? 'm-4 rounded-lg' : 'rounded-t-lg'}`}>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Github className="w-6 h-6 text-blue-400" />
            </div>
            {!isListView && (
              <div className="text-xs text-gray-400">
                {project.technologies?.slice(0, 2).join(' • ')}
              </div>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className={`${isListView ? 'flex-1' : ''}`}>
          <CardHeader className={isListView ? 'pb-2' : ''}>
            <div className="flex items-start justify-between">
              <div className={isListView ? 'flex-1' : ''}>
                <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.name}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
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
              
              {!isListView && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className={`${isListView ? 'pt-0' : ''}`}>
            <p className={`text-gray-300 ${isListView ? 'text-sm' : ''} mb-4`}>
              {isListView ? project.description.substring(0, 120) + '...' : project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.map((tech, index) => (
                <Badge 
                  key={index}
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer"
                  onClick={() => setSelectedTechnology(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {isListView && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Technology Filter */}
          <select
            value={selectedTechnology}
            onChange={(e) => setSelectedTechnology(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
          >
            <option value="all">All Technologies</option>
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
          >
            <option value="all">All Status</option>
            {allStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="status">By Status</option>
          </select>
        </div>

        {/* View Mode and Results Count */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {filteredProjects.length} of {projects.length} projects
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="border-gray-600"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="border-gray-600"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(searchTerm || selectedTechnology !== 'all' || selectedStatus !== 'all') && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-400">Active filters:</span>
          
          {searchTerm && (
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              Search: "{searchTerm}"
              <button 
                onClick={() => setSearchTerm('')}
                className="ml-1 hover:text-white"
              >
                ×
              </button>
            </Badge>
          )}
          
          {selectedTechnology !== 'all' && (
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">
              Tech: {selectedTechnology}
              <button 
                onClick={() => setSelectedTechnology('all')}
                className="ml-1 hover:text-white"
              >
                ×
              </button>
            </Badge>
          )}
          
          {selectedStatus !== 'all' && (
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              Status: {selectedStatus}
              <button 
                onClick={() => setSelectedStatus('all')}
                className="ml-1 hover:text-white"
              >
                ×
              </button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedTechnology('all');
              setSelectedStatus('all');
            }}
            className="text-gray-400 hover:text-white text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-0'}>
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id || index} 
              project={project} 
              isListView={viewMode === 'list'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;