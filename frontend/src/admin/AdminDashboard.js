import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FiFilm, FiTv, FiDownload, FiEye, 
  FiClock, FiAlertCircle, FiLoader,
  FiPlusCircle, FiRefreshCw
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalCategories: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/dashboard');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockData = {
          totalMovies: 250,
          totalUsers: 1543,
          totalCategories: 12,
          recentActivity: [
            { id: 1, type: 'movie_added', title: 'The Shawshank Redemption', timestamp: '2023-10-25T14:32:10Z' },
            { id: 2, type: 'movie_updated', title: 'The Godfather', timestamp: '2023-10-24T09:15:22Z' },
            { id: 3, type: 'movie_deleted', title: 'Pulp Fiction', timestamp: '2023-10-23T18:05:47Z' },
            { id: 4, type: 'user_registered', title: 'johndoe@example.com', timestamp: '2023-10-22T11:42:33Z' },
            { id: 5, type: 'movie_added', title: 'Inception', timestamp: '2023-10-21T16:20:15Z' },
          ]
        };
        
        setStats(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-lg shadow h-32"></div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">Total Movies</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalMovies}</p>
          <Link to="/admin/movies" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
            View all movies
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          <Link to="/admin/users" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
            Manage users
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">Categories</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalCategories}</p>
          <Link to="/admin/categories" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
            Manage categories
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        <div className="divide-y">
          {stats.recentActivity.map(activity => (
            <div key={activity.id} className="py-3 flex items-start">
              <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                activity.type.includes('added') ? 'bg-green-500' :
                activity.type.includes('updated') ? 'bg-blue-500' :
                activity.type.includes('deleted') ? 'bg-red-500' : 'bg-gray-500'
              }`}></div>
              
              <div className="flex-1">
                <p className="text-gray-800">
                  {activity.type.includes('added') && 'Added new movie: '}
                  {activity.type.includes('updated') && 'Updated movie: '}
                  {activity.type.includes('deleted') && 'Deleted movie: '}
                  {activity.type.includes('user') && 'New user registered: '}
                  <span className="font-medium">{activity.title}</span>
                </p>
                <p className="text-sm text-gray-500">{formatDate(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Link to="/admin/logs" className="text-blue-600 hover:underline mt-4 inline-block">
          View all activity
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard; 