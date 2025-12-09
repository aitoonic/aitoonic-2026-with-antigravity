'use client';

import { useEffect } from 'react';

export function OverflowDebugger() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const checkOverflow = () => {
      // Remove previous outlines
      document.querySelectorAll('.overflow-debug-outline').forEach(el => {
        el.classList.remove('overflow-debug-outline');
      });

      // Find elements that are wider than the viewport
      const viewportWidth = window.innerWidth;
      const allElements = document.body.getElementsByTagName('*');

      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i] as HTMLElement;
        const rect = el.getBoundingClientRect();

        if (rect.right > viewportWidth || rect.left < 0) {
          el.classList.add('overflow-debug-outline');
          console.warn('Overflowing element:', el, {
            width: rect.width,
            right: rect.right,
            viewportWidth,
            overflow: rect.right - viewportWidth,
            element: el.outerHTML.substring(0, 200) + (el.outerHTML.length > 200 ? '...' : '')
          });
        }
      }
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedCheckOverflow = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkOverflow, 500);
    };

    // Run on load and after any DOM changes
    const observer = new MutationObserver(debouncedCheckOverflow);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Also check on resize
    window.addEventListener('resize', debouncedCheckOverflow);
    // Initial check
    timeoutId = setTimeout(checkOverflow, 1000);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', debouncedCheckOverflow);
      clearTimeout(timeoutId);
    };
  }, []);

  // Add debug styles
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const style = document.createElement('style');
    style.textContent = `
      .overflow-debug-outline {
        outline: 2px dashed #ff00ff !important;
        position: relative;
      }
      .overflow-debug-outline::after {
        content: 'OVERFLOW: ' attr(class);
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        font-size: 10px;
        padding: 2px 4px;
        z-index: 10000;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

// Add this to your root layout to enable debugging
// <OverflowDebugger />
