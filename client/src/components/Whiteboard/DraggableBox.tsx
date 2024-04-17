import React, { ReactNode, useState, useEffect } from 'react';

interface DraggableBoxProps {
  children: ReactNode;
  initialSize?: { width: number; height: number };
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ children, initialSize = { width: 360, height: 640 } }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [boxSize, setBoxSize] = useState(initialSize);

  useEffect(() => {
    const handleMouseMoveDocument = (e: MouseEvent) => {
      if (isResizing) {
        const dw = e.clientX - resizeStart.x;
        const dh = e.clientY - resizeStart.y;
        const maxD=Math.max(dw, dh)
        setBoxSize({ width: boxSize.width + maxD, height: boxSize.height + maxD });
        setResizeStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUpDocument = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.cursor = "auto";
      }
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMoveDocument);
      document.addEventListener('mouseup', handleMouseUpDocument);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveDocument);
      document.removeEventListener('mouseup', handleMouseUpDocument);
    };
  }, [isResizing, boxSize, resizeStart]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.clientX >= position.x + boxSize.width - 30 && // 10 is the margin for clicking for resizing
      e.clientY >= position.y + boxSize.height - 30
    ) {
      setIsResizing(true);
      setResizeStart({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = "se-resize";
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPosition({ x: position.x + dx, y: position.y + dy });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isResizing) {
      document.body.style.cursor = "auto";
    }
  };

  return (
    <div
      className='absolute z-50 border-black border-8 bg-secondaryColor'
      style={{ left: position.x, top: position.y, width: boxSize.width, height: boxSize.height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableBox;
