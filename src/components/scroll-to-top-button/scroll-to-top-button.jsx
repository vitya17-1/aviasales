import React, { useState, useEffect } from 'react';

import { scrollToTop } from '../../utils/utils';

import styles from './scroll-to-top-button.module.scss';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.scrollToTop}>
      {isVisible && (
        <button type="button" onClick={scrollToTop} className={styles.button}>
          &#8679; Наверх
        </button>
      )}
    </div>
  );
}
