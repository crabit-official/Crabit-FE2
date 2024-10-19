import type React from 'react';
import { useCallback, useRef, useState } from 'react';

export const useDraggable = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);

  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<T>) => {
    setDragging(true);
    if (containerRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!dragging) return;

      e.preventDefault();
      if (containerRef.current) {
        const walk = e.pageX - clickPoint;
        containerRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [dragging, clickPoint, scrollLeft],
  );

  const handleMouseUpOrLeave = useCallback(() => {
    setDragging(false);
  }, []);

  return {
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    dragging,
  };
};
