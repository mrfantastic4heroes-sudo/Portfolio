import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BarChart3, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Globe,
  MousePointer,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/dashboard`);
      const data = await response.json();
      setDashboardData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const summary = dashboardData?.summary || {};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold heading-font">Portfolio Analytics</h1>
            <p className="text-gray-400 body-font">
              {lastUpdated && `Last updated: ${lastUpdated.toLocaleString()}`}
            </p>
          </div>
          <Button 
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm body-font">Total Views</p>
                  <p className="text-3xl font-bold text-blue-400 heading-font">
                    {summary.total_views?.toLocaleString() || '0'}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm body-font">Unique Visitors</p>
                  <p className="text-3xl font-bold text-green-400 heading-font">
                    {summary.unique_visitors?.toLocaleString() || '0'}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm body-font">Avg. Session</p>
                  <p className="text-3xl font-bold text-purple-400 heading-font">
                    {Math.round(summary.avg_session_duration || 0)}s
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm body-font">Contact Forms</p>
                  <p className="text-3xl font-bold text-cyan-400 heading-font">
                    {summary.contact_form_submissions || '0'}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Pages */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 heading-font">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Popular Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summary.popular_pages?.slice(0, 5).map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium body-font">
                        {page.page === '/' ? 'Home' : page.page}
                      </p>
                      <p className="text-gray-400 text-sm body-font">
                        {page.unique_visitors} unique visitors
                      </p>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {page.views} views
                    </Badge>
                  </div>
                )) || (
                  <p className="text-gray-400 text-center body-font">No data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Referrers */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 heading-font">
                <Globe className="w-5 h-5 text-green-400" />
                Top Referrers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summary.top_referrers?.slice(0, 5).map((referrer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium body-font truncate">
                        {new URL(referrer.referrer).hostname}
                      </p>
                      <p className="text-gray-400 text-xs body-font truncate">
                        {referrer.referrer}
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300">
                      {referrer.count}
                    </Badge>
                  </div>
                )) || (
                  <p className="text-gray-400 text-center body-font">No referrer data</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Daily Views Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 heading-font">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Daily Views (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dashboardData?.daily_views?.slice(-7).map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 body-font">
                      {new Date(day.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-400 h-2 rounded-full"
                          style={{ 
                            width: `${Math.min(100, (day.views / Math.max(...dashboardData.daily_views.map(d => d.views))) * 100)}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-purple-400 font-medium body-font">{day.views}</span>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-400 text-center body-font">No daily data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Interactions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 heading-font">
                <MousePointer className="w-5 h-5 text-cyan-400" />
                User Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.top_interactions?.slice(0, 5).map((interaction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white capitalize body-font">
                      {interaction.action.replace('_', ' ')}
                    </span>
                    <Badge className="bg-cyan-500/20 text-cyan-300">
                      {interaction.count}
                    </Badge>
                  </div>
                )) || (
                  <p className="text-gray-400 text-center body-font">No interaction data</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Contacts */}
        <Card className="bg-gray-800 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 heading-font">
              <MessageSquare className="w-5 h-5 text-yellow-400" />
              Recent Contact Form Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.recent_contacts?.map((contact, index) => (
                <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2 bg-gray-700/30 rounded-r">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white heading-font">{contact.name}</h4>
                    <span className="text-gray-400 text-sm body-font">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 body-font">{contact.subject}</p>
                  <p className="text-gray-400 text-sm body-font">{contact.email}</p>
                </div>
              )) || (
                <p className="text-gray-400 text-center body-font">No recent contacts</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;