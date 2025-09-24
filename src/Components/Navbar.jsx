import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import DevTinderLogo from "./DevTinderLogo";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navRef = useRef();
  const logoRef = useRef();

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    gsap.fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
    );
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { 
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div ref={navRef} className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl text-white shadow-2xl z-50 border-b border-white/20">
      <div className="navbar px-6 py-3 flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link ref={logoRef} to="/" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-lg">
          <DevTinderLogo size="lg" animated={true} />
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105 flex items-center gap-2">
                <span className="text-lg">🌐</span> Discover
              </Link>
              <Link to="/connections" className="px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105 flex items-center gap-2">
                <span className="text-lg">🤝</span> Network
              </Link>
              <Link to="/requests" className="px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105 flex items-center gap-2">
                <span className="text-lg">📋</span> Requests
              </Link>
            </nav>

            {/* Welcome Message */}
            <div className="hidden lg:block bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-4 py-2 rounded-full shadow-lg">
              <span className="text-green-400">👋</span> Welcome, {user.firstName}!
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-white/20 transition-all duration-300 hover:scale-110 ring-2 ring-white/30 hover:ring-white/50"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50">
                  <img 
                    alt="User Photo" 
                    src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                    onError={(e) => {
                      e.target.src = "https://geographyandyou.com/images/user-profile.png";
                    }}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-900/95 backdrop-blur-xl text-gray-100 border border-white/20 rounded-2xl shadow-2xl mt-3 w-56 p-3 right-0 z-50"
              >
                <li className="mb-1">
                  <Link to="/profile" className="justify-between hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl p-3 transition-all duration-300 hover:scale-105">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">👤</span> Profile
                    </span>
                    <span className="badge badge-info text-xs">💼</span>
                  </Link>
                </li>
                <li className="mb-1 md:hidden">
                  <Link to="/connections" className="justify-between hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl p-3 transition-all duration-300 hover:scale-105">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🤝</span> Network
                    </span>
                  </Link>
                </li>
                <li className="mb-1 md:hidden">
                  <Link to="/requests" className="justify-between hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl p-3 transition-all duration-300 hover:scale-105">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">📋</span> Requests
                    </span>
                  </Link>
                </li>
                <li className="border-t border-white/10 pt-2 mt-2">
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 w-full p-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <span className="text-lg">🚪</span> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
