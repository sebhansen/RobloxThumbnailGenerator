### Project: Roblox Thumbnail Generator

This is a full-stack starter project scaffold for a Roblox Thumbnail Generator MVP.

**Stack**:
- Frontend: React + Vite + TypeScript
- Backend: ASP.NET Core 8 Web API

---

📁 `roblox-thumbnail-generator/`

```
├── client/                   # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CanvasEditor.tsx     # Drawing component using Konva
│   │   │   ├── ImageUploader.tsx    # File upload with preview
│   │   │   ├── PromptInput.tsx      # Text input field
│   │   │   └── ThumbnailPreview.tsx # Renders blurred/unlocked images
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Main editor UI
│   │   │   ├── Results.tsx          # Shows thumbnails post-gen
│   │   │   └── Success.tsx          # Post-payment success screen
│   │   ├── api/
│   │   │   └── api.ts               # Axios-based client for backend API
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── vite.config.ts
│   └── package.json
│
├── server/                   # .NET 8 Web API
│   ├── Controllers/
│   │   ├── GenerateController.cs    # Accepts drawing/uploaded images/text
│   │   ├── StripeController.cs      # Creates sessions + webhook endpoint
│   ├── Services/
│   │   └── AiImageService.cs        # Stub AI gen (replace with OpenAI later)
│   ├── Models/
│   │   ├── GenerationRequest.cs
│   │   └── ThumbnailResult.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── roblox-thumbnail-generator.csproj
│
├── README.md
└── .env.example                # For API keys and Stripe secret
```

---

### 🖌️ `CanvasEditor.tsx`
A React component for sketching the thumbnail concept. Uses Konva.js for drawing.

```tsx
import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const CanvasEditor: React.FC = () => {
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool: 'pen', points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => setLines([]);

  return (
    <div>
      <button onClick={clearCanvas}>Clear</button>
      <Stage
        width={600}
        height={400}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ border: '1px solid #ccc', background: 'white' }}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasEditor;
```

---

Let me know when you're ready to move on to `ImageUploader.tsx` or want enhancements like brush size or color!
