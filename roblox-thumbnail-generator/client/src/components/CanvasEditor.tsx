import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Stage, Layer, Line, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

// The state that will be saved and restored
export interface CanvasState {
  lines: any[];
  texts: any[];
  history: { lines: any[], texts: any[] }[];
  historyStep: number;
}

interface CanvasEditorProps {
  image: string;
  onImageChange: () => void;
  onSelectText: (text: any) => void;
  onDeselectText: () => void;
  isEditingText: boolean;
}

const CanvasEditor = forwardRef<any, CanvasEditorProps>(({ image, onImageChange, onSelectText, onDeselectText, isEditingText }, ref) => {
  const [tool, setTool] = useState('brush');
  const [lines, setLines] = useState<any[]>([]);
  const [texts, setTexts] = useState<any[]>([]);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(5);
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);
  const [img, status] = useImage(image);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const [history, setHistory] = useState<{ lines: any[], texts: any[] }[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    if (img) {
      const container = stageRef.current?.container().parentElement;
      if (container) {
        const containerWidth = container.offsetWidth;
        const scale = containerWidth / img.width;
        const newHeight = img.height * scale;
        setCanvasSize({ width: containerWidth, height: newHeight });
      }
    }
  }, [img]);

  // Expose methods to the parent component (Home.tsx)
  useImperativeHandle(ref, () => ({
    exportImage: () => {
      if (stageRef.current) {
        return stageRef.current.toDataURL();
      }
      return null;
    },
    getCanvasState: (): CanvasState => {
      return { lines, texts, history, historyStep };
    },
    setCanvasState: (state: CanvasState | null) => {
      if (state) {
        setLines(state.lines);
        setTexts(state.texts);
        setHistory(state.history);
        setHistoryStep(state.historyStep);
      } else {
        // Reset to initial state if no state is provided
        const initialLines: any[] = [];
        const initialTexts: any[] = [];
        setLines(initialLines);
        setTexts(initialTexts);
        // Start history with one empty state
        setHistory([{ lines: initialLines, texts: initialTexts }]);
        setHistoryStep(0);
      }
    },
    updateText: (id: string, newText: string) => {
      const newTexts = texts.map(t => {
        if (t.id === id) {
          return { ...t, text: newText };
        }
        return t;
      });
      setTexts(newTexts);
    },
    finalizeTextEdit: () => {
      saveToHistory(lines, texts);
    },
    removeText: (id: string) => {
      const newTexts = texts.filter(t => t.id !== id);
      setTexts(newTexts);
      saveToHistory(lines, newTexts);
    },
  }));

  // When the image prop changes, it means we switched to a different thumbnail.
  // The Home component will call setCanvasState to load the state for the new image.
  useEffect(() => {
    // This effect now primarily serves to indicate that the image has changed.
    // The actual state management is handled by the parent.
  }, [image]);


  const saveToHistory = (newLines: any[], newTexts: any[]) => {
    // Create a new history entry from the current step
    const newHistory = history.slice(0, historyStep + 1);
    setHistory([...newHistory, { lines: newLines, texts: newTexts }]);
    setHistoryStep(prev => prev + 1);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      const prevState = history[newStep];
      setLines(prevState.lines);
      setTexts(prevState.texts);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      const nextState = history[newStep];
      setLines(nextState.lines);
      setTexts(nextState.texts);
    }
  };

  const handleClear = () => {
    const newLines: any[] = [];
    const newTexts: any[] = [];
    setLines(newLines);
    setTexts(newTexts);
    saveToHistory(newLines, newTexts);
  };

  const handleMouseDown = (e: any) => {
    const stage = e.target.getStage();
    if (e.target === stage) {
      if (!isEditingText) {
        onDeselectText();
      }
    }
    const pos = stage.getPointerPosition();

    if (tool === 'brush') {
      isDrawing.current = true;
      const newLine = {
        id: `line-${lines.length}-${Date.now()}`,
        tool,
        stroke: brushColor,
        strokeWidth: brushSize,
        points: [pos.x, pos.y],
      };
      setLines([...lines, newLine]);
    } else if (tool === 'text' && !isEditingText) {
      const newTextId = `text-${texts.length}-${Date.now()}`;
      const newText = {
        x: pos.x,
        y: pos.y,
        text: 'New Text', // Start with placeholder text
        fill: brushColor,
        fontSize: brushSize * 4,
        id: newTextId,
      };
      
      const newTexts = [...texts, newText];
      setTexts(newTexts);
      saveToHistory(lines, newTexts);
      onSelectText(newText);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current || tool !== 'brush') return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    if (isDrawing.current) {
      isDrawing.current = false;
      saveToHistory(lines, texts);
    }
  };

  const handleTextDblClick = (e: any) => {
    const textNode = e.target;
    onSelectText(textNode.attrs);
  };

  const handleTextDragEnd = (e: any) => {
    const id = e.target.id();
    const newTexts = texts.map(text => {
      if (text.id === id) {
        return {
          ...text,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return text;
    });
    setTexts(newTexts);
    saveToHistory(lines, newTexts);
  };

  const handleLineDragEnd = (e: any) => {
    const id = e.target.id();
    const deltaX = e.target.x();
    const deltaY = e.target.y();

    const newLines = lines.map(line => {
      if (line.id === id) {
        const newPoints = line.points.map((point: number, i: number) => {
          return i % 2 === 0 ? point + deltaX : point + deltaY;
        });
        return { ...line, points: newPoints };
      }
      return line;
    });

    setLines(newLines);
    saveToHistory(newLines, texts);

    // reset the line's position for next drag
    e.target.position({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toolbar */}
      <div className="w-full bg-gray-900/50 border border-gray-700 rounded-t-lg p-2 flex items-center justify-between space-x-2 mb-2">
        <div className="flex items-center space-x-2">
          <button onClick={() => setTool('brush')} className={`px-3 py-2 rounded-md text-sm ${tool === 'brush' ? 'bg-purple-600' : 'bg-gray-700'}`}>Brush</button>
          <button onClick={() => setTool('text')} className={`px-3 py-2 rounded-md text-sm ${tool === 'text' ? 'bg-purple-600' : 'bg-gray-700'}`}>Text</button>
          <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} className="w-10 h-10 bg-gray-700 border-none" />
          <input type="range" min="1" max="50" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-32" />
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={handleUndo} disabled={historyStep <= 0} className="px-3 py-2 rounded-md text-sm bg-gray-700 disabled:opacity-50">Undo</button>
            <button onClick={handleRedo} disabled={historyStep >= history.length - 1} className="px-3 py-2 rounded-md text-sm bg-gray-700 disabled:opacity-50">Redo</button>
            <button onClick={handleClear} className="px-3 py-2 rounded-md text-sm bg-red-600">Clear</button>
        </div>
      </div>

      <div className="w-full relative">
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
          className="bg-gray-700 rounded-b-lg"
        >
          <Layer>
            <KonvaImage
              image={img}
              width={canvasSize.width}
              height={canvasSize.height}
            />
            {texts.map((text) => (
              <Text
                key={text.id}
                id={text.id}
                {...text}
                draggable={tool === 'text'}
                onDblClick={handleTextDblClick}
                onDragEnd={handleTextDragEnd}
              />
            ))}
            {lines.map((line) => (
              <Line
                key={line.id}
                id={line.id}
                points={line.points}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
                draggable={false}
                onDragEnd={handleLineDragEnd}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Bottom buttons */}
      <div className="w-full flex justify-end mt-4">
        <button onClick={onImageChange} className="text-sm text-gray-400 hover:text-white">
          Change Image
        </button>
      </div>
    </div>
  );
});

export default CanvasEditor;
