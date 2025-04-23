import { useEffect } from 'react';

import { getScrollBarWidth } from '../utils/utils';

const useScrollbarCompensation = () => {
  useEffect(() => {
    const scrollbarWidth = getScrollBarWidth();
    const adjustContentPadding = () => {
      if (document.body.scrollHeight > window.innerHeight) {
        document.documentElement.style.setProperty(
          '--scrollbar-width',
          `${scrollbarWidth}px`
        );
      } else {
        document.documentElement.style.setProperty('--scrollbar-width', '0px');
      }
    };

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === document.body) {
          adjustContentPadding();
        }
      });
    });

    resizeObserver.observe(document.body);

    adjustContentPadding();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
};

export default useScrollbarCompensation;
