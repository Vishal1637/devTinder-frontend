import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    
    // Create floating particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
        border-radius: 50%;
        opacity: ${Math.random() * 0.8 + 0.2};
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, i) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 animate-pulse"></div>
      
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500/10 rounded-full animate-bounce"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-32 w-24 h-24 bg-green-500/10 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 right-10 w-12 h-12 bg-yellow-500/10 rounded-full animate-pulse"></div>
    </div>
  );
};

export default AnimatedBackground;