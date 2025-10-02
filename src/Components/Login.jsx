
import { BASE_URL } from "../utils/constants";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import AnimatedBackground from "./AnimatedBackground";
import DevTinderLogo from "./DevTinderLogo";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const titleRef = useRef();
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef();


  useEffect(() => {
    // Animate card entrance
    gsap.fromTo(cardRef.current, 
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
    
    // Animate title
    gsap.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    // Animate form switch
    gsap.fromTo(cardRef.current,
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [isLoginFrom]);

  const handleLogin = async () => {
    // Input validation
    if (!emailId || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId,
          password,
        }),
      });
      
      if (!res.ok) {
        throw new Error('Login failed');
      }
      
      const data = await res.json();
      dispatch(addUser(data.user));
      return navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleSignUp = async () => {
    // Input validation
    if (!firstName || !lastName || !emailId || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailId,
          password,
        }),
      });
      
      if (!res.ok) {
        throw new Error('Signup failed');
      }
      
      const data = await res.json();
      dispatch(addUser(data.user));
      return navigate("/profile");
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div ref={cardRef} className="card bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl w-96 shadow-2xl border border-white/20 rounded-3xl">
          <div className="card-body">
            <div className="flex justify-center mb-4">
              <DevTinderLogo size="xl" animated={true} />
            </div>
            <h2 ref={titleRef} className="card-title justify-center text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {isLoginFrom ? "Welcome Back, Developer!" : "Join the Network"}
            </h2>
            <p className="text-center text-gray-400 text-sm mb-4">
              {isLoginFrom ? "Connect with fellow developers" : "Build your professional developer network"}
            </p>
          <div>
            {!isLoginFrom && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Lastname</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          {error && <p className="text-red-500 text-center">{String(error)}</p>}
          <div className="card-actions justify-center mt-2">
            <button
              className="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-none text-white font-semibold transition-all duration-300 hover:scale-105"
              onClick={isLoginFrom ? handleLogin : handleSignUp}
            >
              {isLoginFrom ? "🚀 Enter Network" : "🌟 Join Community"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer py-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginFrom
              ? "New to DevTinder? Create your profile →"
              : "Already have an account? Sign in →"}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
