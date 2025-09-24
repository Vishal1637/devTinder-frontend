import axios from "axios";
import { useEffect, useCallback } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch {
      alert("Failed to process request. Please try again.");
    }
  };

  const fetchRequests = useCallback(async () => {
    try {
      console.log('Fetching requests from:', `${BASE_URL}/user/requests/received`);
      const requests = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log('Requests response:', requests.data);
      dispatch(setRequests(requests.data.data));
    } catch (error) {
      console.error('Failed to fetch requests:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.log('Not authenticated, redirecting to login');
        window.location.href = '/login';
      } else {
        dispatch(setRequests([]));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRequests();
    
    // Auto-refresh every 30 seconds to check for new requests
    const interval = setInterval(() => {
      fetchRequests();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchRequests]);
  if (!requests) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-md">
          <div className="text-6xl mb-6">📋</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            No Connection Requests
          </h1>
          <p className="text-gray-300 mb-6">
            You haven't received any connection requests yet. Keep networking!
          </p>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-400">
              💡 Tip: Visit the Discover page to connect with other developers!
            </p>
          </div>
          <button 
            onClick={fetchRequests}
            className="mt-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 text-blue-300 border border-blue-400/30 hover:border-blue-400/60 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-3xl text-pink-400 p-4">
        Requests ({requests.length})
      </h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-2 p-2  rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-14 h-14 rounded-full object-contain"
                src={photoUrl}
              />
            </div>
            <div className="text-left m-4 p-4 ">
              <h2 className="font-bold text-xl">
                {`${firstName} ${lastName}`}
              </h2>
              {age && gender && <p>{`${age} ${gender}`}</p>}
              {about && <p>{about}</p>}
            </div>
            <div className="">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
