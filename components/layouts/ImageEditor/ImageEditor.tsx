// // components/CanvasDraw.tsx
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

interface ImageEditorProps {
  backgroundImageUrl: string;
}

const ImageEditor = ({
  backgroundImageUrl
}: ImageEditorProps) => {
  const canvasRef = useRef<CanvasDraw | null>(null);


  

  function Undo() {

    canvasRef.current?.undo();
  }
  function Erase() {

    canvasRef.current?.clear();
  }

  return (
    <div className='mx-8'>
      <div className='flexi tems-center justify-center'>
        <Button onClick={Undo} variant="outline" className='m-2'>Undo</Button>
        <Button onClick={Erase} variant="outline" className='m-2'>Clear All</Button>
      </div>
      <CanvasDraw
        ref={canvasRef}
        brushColor="#000"
        // canvasWidth={100}
        // canvasHeight={100}
        hideGrid={true} // Optional: Hide the grid lines
        imgSrc={backgroundImageUrl} // Use imgSrc prop to set background image
        loadTimeOffset={10} // Adjust as needed
      />
    </div>
  );
};

export default ImageEditor;


