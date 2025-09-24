import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection, clearConnections } from "../utils/connectionSlice";

const Connections = () => {
 
  const connections = useSelector((store) => store.connection);

  const dispatch = useDispatch();
  
  const fetchConnections = useCallback(async () => {
    try {
      dispatch(clearConnections());
      console.log('Fetching connections from:', BASE_URL + '/user/connections');
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log('Connections response:', connections.data);
      dispatch(addConnection(connections.data.data));
    } catch (error) {
      console.error('Failed to fetch connections:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.log('Not authenticated, redirecting to login');
        window.location.href = '/login';
      } else {
        dispatch(addConnection([]));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  if (!connections) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="loading loading-spinner loading-lg text-blue-400 mb-4"></div>
          <p className="text-gray-300 font-mono text-sm">
            🔍 Loading your professional network...
          </p>
        </div>
      </div>
    );
  }
  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-md">
          <div className="text-6xl mb-6">🤝</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Build Your Network
          </h1>
          <p className="text-gray-300 mb-6">
            Start connecting with talented developers to grow your professional network.
          </p>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-400">
              💡 Visit the Discover page to find developers to connect with!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          🌐 Your Professional Network
        </h1>
        <p className="text-gray-400 font-mono">
          {"// "}{connections.length} talented developers in your network
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const {_id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div key={_id} className="bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75"></div>
                  <img
                    alt="Developer photo"
                    className="relative w-16 h-16 rounded-full object-cover border-2 border-white/30"
                    src={photoUrl}
                    onError={(e) => {
                      e.target.src = "https://geographyandyou.com/images/user-profile.png";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-xl text-white mb-1">
                    {`${firstName} ${lastName}`}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-300 text-sm font-mono">
                      📅 {age} • {gender}
                    </p>
                  )}
                </div>
              </div>
              
              {about && (
                <div className="bg-gradient-to-r from-slate-800/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <p className="text-gray-200 text-sm leading-relaxed italic">
                    📝 &quot;{about}&quot;
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex justify-center">
                <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-mono border border-blue-400/30">
                  🤝 Professional Connection
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
