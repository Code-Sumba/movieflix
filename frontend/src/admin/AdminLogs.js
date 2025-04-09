import React, { useState, useEffect } from 'react';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, movie, user, error

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/admin/logs?filter=${filter}`);
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock logs data
        const mockLogs = [
          { id: 1, type: 'movie_added', message: 'Movie "The Shawshank Redemption" was added', timestamp: '2023-10-25T14:32:10Z', user: 'admin@example.com' },
          { id: 2, type: 'movie_updated', message: 'Movie "The Godfather" was updated', timestamp: '2023-10-24T09:15:22Z', user: 'admin@example.com' },
          { id: 3, type: 'movie_deleted', message: 'Movie "Pulp Fiction" was deleted', timestamp: '2023-10-23T18:05:47Z', user: 'admin@example.com' },
          { id: 4, type: 'user_registered', message: 'New user registered: johndoe@example.com', timestamp: '2023-10-22T11:42:33Z', user: 'system' },
          { id: 5, type: 'login_success', message: 'User logged in successfully', timestamp: '2023-10-22T10:15:18Z', user: 'johndoe@example.com' },
          { id: 6, type: 'login_error', message: 'Failed login attempt', timestamp: '2023-10-21T22:45:11Z', user: 'unknown' },
          { id: 7, type: 'system_error', message: 'Database connection error', timestamp: '2023-10-21T16:32:45Z', user: 'system' },
          { id: 8, type: 'movie_added', message: 'Movie "Inception" was added', timestamp: '2023-10-21T14:18:05Z', user: 'admin@example.com' },
          { id: 9, type: 'system_backup', message: 'System backup completed successfully', timestamp: '2023-10-20T03:00:00Z', user: 'system' },
          { id: 10, type: 'user_updated', message: 'User profile updated', timestamp: '2023-10-19T09:22:17Z', user: 'johndoe@example.com' },
        ];
        
        // Apply filtering
        const filteredLogs = filter === 'all' 
          ? mockLogs 
          : mockLogs.filter(log => {
              if (filter === 'movie') return log.type.includes('movie');
              if (filter === 'user') return log.type.includes('user') || log.type.includes('login');
              if (filter === 'error') return log.type.includes('error');
              return true;
            });
        
        setLogs(filteredLogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError('Failed to load activity logs. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchLogs();
  }, [filter]);

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

  const getTypeLabel = (type) => {
    if (type.includes('movie_added')) return 'Added';
    if (type.includes('movie_updated')) return 'Updated';
    if (type.includes('movie_deleted')) return 'Deleted';
    if (type.includes('user_registered')) return 'User Registered';
    if (type.includes('login_success')) return 'Login Success';
    if (type.includes('login_error')) return 'Login Failed';
    if (type.includes('system_error')) return 'System Error';
    if (type.includes('system_backup')) return 'System Backup';
    if (type.includes('user_updated')) return 'User Updated';
    return 'Activity';
  };

  const getTypeBadgeColor = (type) => {
    if (type.includes('added')) return 'bg-green-100 text-green-800 border-green-200';
    if (type.includes('updated')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (type.includes('deleted')) return 'bg-red-100 text-red-800 border-red-200';
    if (type.includes('error')) return 'bg-red-100 text-red-800 border-red-200';
    if (type.includes('login_success')) return 'bg-green-100 text-green-800 border-green-200';
    if (type.includes('system')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (type.includes('user')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded border ${
              filter === 'all' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => setFilter('movie')}
            className={`px-3 py-1 rounded border ${
              filter === 'movie' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            Movie Logs
          </button>
          <button
            onClick={() => setFilter('user')}
            className={`px-3 py-1 rounded border ${
              filter === 'user' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            User Logs
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-3 py-1 rounded border ${
              filter === 'error' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            Error Logs
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getTypeBadgeColor(log.type)}`}>
                        {getTypeLabel(log.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{log.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{log.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(log.timestamp)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs; 