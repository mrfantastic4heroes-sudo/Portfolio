import React, { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once !== false) {
            observer.disconnect();
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isVisible];
};

const ScrollReveal = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  once = true
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold, once });

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    fadeInUp: {
      initial: { opacity: 0, transform: 'translateY(60px)' },
      animate: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeInDown: {
      initial: { opacity: 0, transform: 'translateY(-60px)' },
      animate: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeInLeft: {
      initial: { opacity: 0, transform: 'translateX(-60px)' },
      animate: { opacity: 1, transform: 'translateX(0)' }
    },
    fadeInRight: {
      initial: { opacity: 0, transform: 'translateX(60px)' },
      animate: { opacity: 1, transform: 'translateX(0)' }
    },
    scaleIn: {
      initial: { opacity: 0, transform: 'scale(0.8)' },
      animate: { opacity: 1, transform: 'scale(1)' }
    },
    slideInUp: {
      initial: { transform: 'translateY(100%)' },
      animate: { transform: 'translateY(0)' }
    },
    rotateIn: {
      initial: { opacity: 0, transform: 'rotate(-10deg) scale(0.8)' },
      animate: { opacity: 1, transform: 'rotate(0deg) scale(1)' }
    }
  };

  const animationConfig = animations[animation] || animations.fadeInUp;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...animationConfig.initial,
        ...(isVisible ? animationConfig.animate : {}),
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const ParallaxElement = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'vertical' 
}) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        
        if (direction === 'vertical') {
          setOffset(rate);
        } else {
          // Horizontal parallax could be added here
          setOffset(rate * 0.1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: direction === 'vertical' 
          ? `translateY(${offset}px)` 
          : `translateX(${offset}px)`
      }}
    >
      {children}
    </div>
  );
};

const StaggeredReveal = ({ 
  children, 
  staggerDelay = 100,
  animation = 'fadeInUp',
  className = '' 
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};

const CountUpAnimation = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.5 });

  useEffect(() => {
    if (isVisible) {
      let startTime;
      const startValue = 0;
      const endValue = end;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

const TypewriterText = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  cursor = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.5 });

  useEffect(() => {
    if (isVisible && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay + currentIndex * speed);

      return () => clearTimeout(timer);
    } else if (isVisible && currentIndex >= text.length) {
      // Blink cursor after typing is complete
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }
  }, [isVisible, currentIndex, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && (
        <span className={`inline-block w-0.5 h-5 bg-current ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          |
        </span>
      )}
    </span>
  );
};

export { 
  ScrollReveal, 
  ParallaxElement, 
  StaggeredReveal, 
  CountUpAnimation, 
  TypewriterText,
  useScrollAnimation 
};