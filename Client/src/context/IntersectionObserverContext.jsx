import React, { createContext, useEffect, useState } from 'react';

const IntersectionObserverContext = createContext();

export const IntersectionObserverProvider = ({ children }) => {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    setObserver(intersectionObserver);

    // Clean up the observer when the component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Ensure children exist before rendering
  return observer ? (
    <IntersectionObserverContext.Provider value={observer}>
      {children}
    </IntersectionObserverContext.Provider>
  ) : null;
};

export default IntersectionObserverContext;
