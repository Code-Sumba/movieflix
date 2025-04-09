import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FiFilm, FiTv, FiDownload, FiEye, 
  FiClock, FiAlertCircle, FiLoader,
  FiPlusCircle, FiRefreshCw
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const API_BASE_URL = 'http://localhost:5000/api';
        const response = await axios.get(`${API_BASE_URL}/admin/stats`);
        
        if (response.data.success) {
          setStats(response.data.stats);
        } else {
          setError('Failed to load dashboard statistics.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics. Please try again later.');
        setLoading(false);
        
        // Set sample data for demonstration
        setSampleStats();
      }
    };
    
    fetchStats();
  }, []);
  
  // Fallback sample data for demonstration
  const setSampleStats = () => {
    setStats({
      totalMovies: 1285,
      totalSeries: 145,
      totalMoviesOnly: 1140,
      latestMovies: [
        {
          _id: '1',
          title: 'Dune',
          poster: 'https://via.placeholder.com/150x225?text=Dune',
          createdAt: '2023-09-01T12:00:00.000Z',
          views: 1250,
          downloads: 750
        },
        {
          _id: '2',
          title: 'No Time to Die',
          poster: 'https://via.placeholder.com/150x225?text=No+Time+To+Die',
          createdAt: '2023-08-29T10:00:00.000Z',
          views: 980,
          downloads: 620
        },
        {
          _id: '3',
          title: 'Venom: Let There Be Carnage',
          poster: 'https://via.placeholder.com/150x225?text=Venom',
          createdAt: '2023-08-27T09:30:00.000Z',
          views: 1100,
          downloads: 540
        },
        {
          _id: '4',
          title: 'The French Dispatch',
          poster: 'https://via.placeholder.com/150x225?text=French+Dispatch',
          createdAt: '2023-08-25T14:15:00.000Z',
          views: 580,
          downloads: 320
        },
        {
          _id: '5',
          title: 'Last Night in Soho',
          poster: 'https://via.placeholder.com/150x225?text=Soho',
          createdAt: '2023-08-22T11:45:00.000Z',
          views: 760,
          downloads: 450
        }
      ],
      mostViewed: [
        {
          _id: '1',
          title: 'Spider-Man: No Way Home',
          poster: 'https://via.placeholder.com/150x225?text=Spider-Man',
          views: 15250
        },
        {
          _id: '2',
          title: 'The Batman',
          poster: 'https://via.placeholder.com/150x225?text=Batman',
          views: 12980
        },
        {
          _id: '3',
          title: 'Avengers: Endgame',
          poster: 'https://via.placeholder.com/150x225?text=Avengers',
          views: 11100
        },
        {
          _id: '4',
          title: 'Joker',
          poster: 'https://via.placeholder.com/150x225?text=Joker',
          views: 10580
        },
        {
          _id: '5',
          title: 'Parasite',
          poster: 'https://via.placeholder.com/150x225?text=Parasite',
          views: 9760
        }
      ],
      mostDownloaded: [
        {
          _id: '1',
          title: 'The Shawshank Redemption',
          poster: 'https://via.placeholder.com/150x225?text=Shawshank',
          downloads: 8750
        },
        {
          _id: '2',
          title: 'The Godfather',
          poster: 'https://via.placeholder.com/150x225?text=Godfather',
          downloads: 7620
        },
        {
          _id: '3',
          title: 'The Dark Knight',
          poster: 'https://via.placeholder.com/150x225?text=Dark+Knight',
          downloads: 7540
        },
        {
          _id: '4',
          title: 'Pulp Fiction',
          poster: 'https://via.placeholder.com/150x225?text=Pulp+Fiction',
          downloads: 6320
        },
        {
          _id: '5',
          title: 'Fight Club',
          poster: 'https://via.placeholder.com/150x225?text=Fight+Club',
          downloads: 5450
        }
      ],
      sourceStats: [
        { _id: 'manual', count: 350 },
        { _id: 'vegamovies', count: 420 },
        { _id: 'bollyflix', count: 315 },
        { _id: 'hdhub4u', count: 200 }
      ],
      recentLogs: [
        {
          _id: '1',
          type: 'scraper',
          source: 'vegamovies',
          message: 'Vegamovies scraper completed successfully',
          status: 'success',
          timestamp: '2023-09-01T12:30:00.000Z'
        },
        {
          _id: '2',
          type: 'admin',
          source: 'admin-api',
          message: 'Movie "Dune" added by admin',
          status: 'success',
          timestamp: '2023-09-01T11:45:00.000Z'
        },
        {
          _id: '3',
          type: 'scraper',
          source: 'bollyflix',
          message: 'Bollyflix scraper completed with warnings',
          status: 'warning',
          timestamp: '2023-09-01T10:15:00.000Z'
        },
        {
          _id: '4',
          type: 'api',
          source: 'movie-api',
          message: 'Error processing download request',
          status: 'error',
          timestamp: '2023-09-01T09:20:00.000Z'
        },
        {
          _id: '5',
          type: 'system',
          source: 'cron',
          message: 'Scheduled scraping task started',
          status: 'info',
          timestamp: '2023-09-01T06:00:00.000Z'
        }
      ]
    });
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin h-8 w-8 text-primary-600" />
        <span className="ml-2 text-xl">Loading dashboard data...</span>
      </div>
    );
  }
  
  // Error state
  if (error || !stats) {
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="mx-auto h-12 w-12 text-red-600" />
        <h2 className="text-2xl font-bold text-red-600 mb-4">Dashboard Error</h2>
        <p className="mb-6">{error || "Unable to load dashboard statistics."}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Link to="/admin/movies/add" className="btn btn-primary flex items-center">
            <FiPlusCircle className="mr-2" />
            Add Movie
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-secondary flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              <FiFilm className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Movies</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMovies}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
              <FiTv className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Web Series</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSeries}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
              <FiEye className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Most Viewed</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.mostViewed[0]?.views.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
              <FiDownload className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Most Downloads</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.mostDownloaded[0]?.downloads.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Latest added movies */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Added</h2>
              <Link to="/admin/movies" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Movie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Added On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Downloads
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {stats.latestMovies.map((movie) => (
                    <tr key={movie._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-7 flex-shrink-0">
                            <img 
                              className="h-10 w-7 rounded object-cover" 
                              src={movie.poster} 
                              alt={movie.title} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              <Link 
                                to={`/admin/movies/edit/${movie._id}`}
                                className="hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {movie.title}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(movie.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {movie.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {movie.downloads.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recent logs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Logs</h2>
              <Link to="/admin/logs" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
                View All Logs
              </Link>
            </div>
            
            <div className="space-y-4">
              {stats.recentLogs.map((log) => (
                <div 
                  key={log._id} 
                  className={`border-l-4 p-4 ${
                    log.status === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/10' :
                    log.status === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10' :
                    log.status === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/10' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className={`text-sm font-medium ${
                      log.status === 'success' ? 'text-green-800 dark:text-green-400' :
                      log.status === 'warning' ? 'text-yellow-800 dark:text-yellow-400' :
                      log.status === 'error' ? 'text-red-800 dark:text-red-400' :
                      'text-blue-800 dark:text-blue-400'
                    }`}>
                      {log.type.toUpperCase()} - {log.source}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(log.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-8">
          {/* Top movies by views */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Most Viewed</h2>
            
            <div className="space-y-4">
              {stats.mostViewed.map((movie) => (
                <div key={movie._id} className="flex items-center">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{movie.title}</h3>
                    <div className="flex items-center mt-1">
                      <FiEye className="text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {movie.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top movies by downloads */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Most Downloaded</h2>
            
            <div className="space-y-4">
              {stats.mostDownloaded.map((movie) => (
                <div key={movie._id} className="flex items-center">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{movie.title}</h3>
                    <div className="flex items-center mt-1">
                      <FiDownload className="text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {movie.downloads.toLocaleString()} downloads
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Source stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Data Sources</h2>
            
            <div className="space-y-3">
              {stats.sourceStats.map((source) => (
                <div key={source._id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      source._id === 'manual' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      source._id === 'vegamovies' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      source._id === 'bollyflix' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                      'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    }`}>
                      <FiFilm className="h-4 w-4" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                      {source._id.charAt(0).toUpperCase() + source._id.slice(1)}
                    </span>
                  </div>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-700 dark:text-gray-300">
                    {source.count} movies
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Link 
                to="/admin/scraper/sources"
                className="text-primary-600 dark:text-primary-400 text-sm flex items-center justify-center hover:underline"
              >
                <FiRefreshCw className="mr-1" />
                Manage Scrapers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 