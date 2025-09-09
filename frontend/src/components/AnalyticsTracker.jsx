import { useEffect, useRef } from 'react';

const AnalyticsTracker = () => {
  const sessionId = useRef(generateSessionId());
  const pageStartTime = useRef(Date.now());
  const isTracking = useRef(true);

  function generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  const trackPageView = async (page) => {
    if (!isTracking.current) return;
    
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: page,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          session_id: sessionId.current
        }),
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  const trackInteraction = async (action, element = null, data = null) => {
    if (!isTracking.current) return;

    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/interaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          element: element,
          page: window.location.pathname,
          session_id: sessionId.current,
          data: data
        }),
      });
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  };

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);

    // Track scroll events
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercentage > 0 && scrollPercentage % 25 === 0) {
          trackInteraction('scroll', null, { scroll_percentage: scrollPercentage });
        }
      }, 100);
    };

    // Track clicks on buttons and links
    const handleClick = (event) => {
      const element = event.target;
      const tagName = element.tagName.toLowerCase();
      const elementId = element.id || null;
      const elementClass = element.className || null;
      const elementText = element.textContent?.slice(0, 50) || null;

      if (tagName === 'button' || tagName === 'a' || element.closest('button') || element.closest('a')) {
        trackInteraction('click', tagName, {
          id: elementId,
          class: elementClass,
          text: elementText
        });
      }
    };

    // Track form submissions
    const handleFormSubmit = (event) => {
      const form = event.target;
      const formId = form.id || 'unknown';
      
      trackInteraction('form_submit', 'form', {
        form_id: formId,
        form_action: form.action || null
      });
    };

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackInteraction('page_hidden', null, {
          time_on_page: Date.now() - pageStartTime.current
        });
      } else {
        trackInteraction('page_visible', null, null);
        pageStartTime.current = Date.now();
      }
    };

    // Track navigation section visits
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionId = entry.target.id;
          if (sectionId) {
            trackInteraction('section_view', 'section', { section_id: sectionId });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5
    });

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track session end on page unload
    const handleBeforeUnload = () => {
      trackInteraction('session_end', null, {
        session_duration: Date.now() - pageStartTime.current
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      observer.disconnect();
    };
  }, []);

  // Expose tracking functions globally for manual tracking
  useEffect(() => {
    window.trackInteraction = trackInteraction;
    window.trackPageView = trackPageView;
    
    return () => {
      delete window.trackInteraction;
      delete window.trackPageView;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;