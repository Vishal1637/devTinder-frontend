import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    user;
  const cardRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );
    
    gsap.fromTo(imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 0.2, ease: "back.out(1.7)" }
    );
  }, [_id]);

  const handleSendRequest = useCallback(async (status, userId) => {
    console.log(`Sending ${status} request to user ${userId}`);
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      console.log('Request successful:', response.data);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error('Request failed:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert('Please login first');
        window.location.href = '/login';
      } else if (error.response?.status === 400) {
        alert(error.response.data.message || 'Invalid request');
      } else {
        alert("Failed to send request. Please try again.");
      }
    }
  }, [dispatch]);

  return (
    <div ref={cardRef} className="relative bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl w-96 rounded-3xl shadow-2xl border border-white/20 hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 overflow-hidden">
      {/* Network Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-xs font-mono leading-4 p-3 text-blue-400">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="mb-2">
              {`// Professional developer profile ${i + 1}`}
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-75"></div>
            <img 
              ref={imageRef} 
              src={photoUrl} 
              alt="Profile" 
              className="relative w-48 h-48 object-cover rounded-2xl border-2 border-white/30 hover:scale-110 transition-transform duration-300" 
            />
          </div>
        </div>
        
        {/* Developer Info */}
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {firstName + " " + lastName}
          </h2>
          
          {age && gender && (
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 mb-4 inline-block">
              <p className="text-gray-300 font-mono text-sm">
                📅 {age} years • {gender}
              </p>
            </div>
          )}
          
          {about && (
            <div className="bg-gradient-to-r from-slate-800/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
              <p className="text-gray-200 text-sm leading-relaxed italic">
                📝 &quot;{about}&quot;
              </p>
            </div>
          )}
          
          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-3 flex items-center justify-center gap-2">
                🚀 Technical Expertise:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-mono border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300 hover:scale-105"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              className="flex-1 bg-gradient-to-r from-gray-600/20 to-slate-600/20 hover:from-gray-600/40 hover:to-slate-600/40 text-gray-300 border border-gray-400/30 hover:border-gray-400/60 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              🚫 Skip
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 text-blue-300 border border-blue-400/30 hover:border-blue-400/60 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => handleSendRequest("interested", _id)}
            >
              🤝 Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number,
    gender: PropTypes.string,
    about: PropTypes.string,
    photoUrl: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default UserCard;
