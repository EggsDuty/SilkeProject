import React, { ReactNode, useState } from 'react';

interface DraggableBoxProps {
  children: ReactNode;
}

const DraggableBox: React.FC<DraggableBoxProps> = (props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [boxSize, setBoxSize] = useState({ width: 360, height: 640 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetClassName = (e.target as HTMLElement).className;
    if (targetClassName.includes('resize-icon')) {
      setIsResizing(true);
      setResizeStart({ x: e.clientX, y: e.clientY });
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
    } else if (isResizing) {
      const dw = e.clientX - resizeStart.x;
      const dh = e.clientY - resizeStart.y;
      setBoxSize({ width: boxSize.width + dw, height: boxSize.height + dh });
      setResizeStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    document.body.style.cursor = "auto";
  };

  return (
    <div
      className='absolute z-50'
      style={{ left: position.x, top: position.y, width: boxSize.width, height: boxSize.height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {props.children}
      <div className="resize-icon absolute right-0 bottom-0 w-5 h-5 bg-gray-500 cursor-se-resize"></div>
    </div>
  );
};

export default DraggableBox;
