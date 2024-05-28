import { useEffect, useContext } from 'react';
import IntersectionObserverContext from '../context/IntersectionObserverContext';

const useIntersectionObserver = (selector) => {
  const observer = useContext(IntersectionObserverContext);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [observer, selector]);
};

export default useIntersectionObserver;
