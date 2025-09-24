import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

const DevTinderLogo = ({ size = 'md', animated = true }) => {
  const logoRef = useRef();
  const networkRef = useRef();
  const codeRef = useRef();

  const sizes = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-xl' },
    lg: { width: 48, height: 48, text: 'text-2xl' },
    xl: { width: 64, height: 64, text: 'text-3xl' }
  };

  useEffect(() => {
    if (animated) {
      // Network pulse animation
      gsap.to(networkRef.current, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Code brackets rotation
      gsap.to(codeRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none"
      });
    }
  }, [animated]);

  return (
    <div ref={logoRef} className="flex items-center gap-2">
      {/* Logo Icon */}
      <div className="relative">
        <svg
          width={sizes[size].width}
          height={sizes[size].height}
          viewBox="0 0 64 64"
          className="drop-shadow-lg"
        >
          {/* Background Circle */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="url(#gradient1)"
            stroke="url(#gradient2)"
            strokeWidth="2"
          />
          
          {/* Code Brackets */}
          <g ref={codeRef} transform="translate(32,32)">
            <path
              d="M-10,-6 L-14,-2 L-10,2 M10,-6 L14,-2 L10,2"
              stroke="#ffffff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="2" fill="#00ff88" />
          </g>
          
          {/* Network Connections */}
          <g ref={networkRef} transform="translate(32,32)">
            {/* Connection nodes */}
            <circle cx="-12" cy="-8" r="2" fill="#00ff88" opacity="0.8" />
            <circle cx="12" cy="-8" r="2" fill="#00ff88" opacity="0.8" />
            <circle cx="-12" cy="8" r="2" fill="#00ff88" opacity="0.8" />
            <circle cx="12" cy="8" r="2" fill="#00ff88" opacity="0.8" />
            
            {/* Connection lines */}
            <path
              d="M-12,-8 L0,0 L12,-8 M-12,8 L0,0 L12,8"
              stroke="#00ff88"
              strokeWidth="1.5"
              opacity="0.6"
              strokeLinecap="round"
            />
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#3730a3" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logo Text */}
      <div className={`font-bold ${sizes[size].text} bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent`}>
        DevTinder
      </div>
    </div>
  );
};

DevTinderLogo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  animated: PropTypes.bool
};

export default DevTinderLogo;