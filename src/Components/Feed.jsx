
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  
  const getFeed = useCallback(async () => {
    console.log('getFeed called, current feed:', feed);
    if (feed !== null && feed.length > 0) return;
    
    try {
      console.log('Trying to fetch from backend:', BASE_URL + '/feed');
      const response = await fetch(BASE_URL + "/feed", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Backend response:', data);
      dispatch(addFeed(data.data || data));
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('❌ Authentication failed - Please login first');
        console.log('Redirecting to login...');
        window.location.href = '/login';
      } else if (error.code === 'ECONNREFUSED') {
        console.error('❌ Backend server is not running on port 3001');
      } else if (error.code === 'ECONNABORTED') {
        console.error('❌ Request timed out - backend is not responding');
      } else {
        console.error('❌ Failed to fetch feed:', error.response?.data || error.message);
        console.log('Error details:', error.response?.status, error.response?.statusText);
      }
      dispatch(addFeed([]));
    }
  }, [feed, dispatch]);
  
  useEffect(() => {
    getFeed();
  }, [getFeed]);



  if (feed === null) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="loading loading-spinner loading-lg text-blue-400 mb-4"></div>
          <p className="text-gray-300 font-mono text-sm">
            🔍 Discovering amazing developers...
          </p>
        </div>
      </div>
    );
  }

  if (Array.isArray(feed) && feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-md">
          <div className="text-6xl mb-6">🌐</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            You&apos;ve Explored Everyone!
          </h2>
          <p className="text-gray-300 mb-6">
            Great job networking! Check back later for new developers joining the community.
          </p>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-400">
              💡 Tip: Update your profile to attract more connections!
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          🌐 Discover Developers
        </h1>
        <p className="text-gray-400 font-mono text-sm">
          Connect with talented developers from around the world
        </p>
      </div>
      {feed.map((user) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};

export default Feed;
