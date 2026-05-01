import React, { useCallback, useRef, useState, useEffect } from 'react';

/**
 * Resizable horizontal split pane.
 * Drag the center handle to resize left vs right.
 * Persists the ratio in localStorage.
 *
 * Props:
 *  - left   : React node for left pane
 *  - right  : React node for right pane
 *  - storageKey : localStorage key (default: 'ol-split')
 */
const STORAGE_KEY = 'ol-split-ratio';

const clampRatio = (v) => Math.max(0.2, Math.min(0.8, v));

const ResizableSplit = ({ left, right, storageKey = STORAGE_KEY }) => {
  const [ratio, setRatio] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? clampRatio(parseFloat(stored)) : 0.5;
    } catch {
      return 0.5;
    }
  });

  const containerRef = useRef(null);
  const dragging = useRef(false);

  const persist = useCallback(
    (r) => {
      try {
        localStorage.setItem(storageKey, String(r));
      } catch { /* ignore */ }
    },
    [storageKey],
  );

  const onMouseDown = useCallback((event) => {
    event.preventDefault();
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const onMouseMove = (event) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newRatio = clampRatio((event.clientX - rect.left) / rect.width);
      setRatio(newRatio);
    };

    const onMouseUp = () => {
      if (dragging.current) {
        dragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        setRatio((current) => {
          persist(current);
          return current;
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [persist]);

  return (
    <div className="ol-split" ref={containerRef}>
      <div className="ol-split-left" style={{ flex: `0 0 ${ratio * 100}%` }}>
        {left}
      </div>
      <div className="ol-split-handle" onMouseDown={onMouseDown}>
        <div className="ol-split-handle-grip" />
      </div>
      <div className="ol-split-right" style={{ flex: 1 }}>
        {right}
      </div>
    </div>
  );
};

export default ResizableSplit;
