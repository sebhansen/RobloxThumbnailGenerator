I want to build a full-stack MVP for a web app called “Roblox Thumbnail Generator.”

### 💡 High-level goal:
The app allows users to:
1. Draw on a canvas
2. Upload reference images
3. Type a text prompt describing their scene
4. Get back 5 AI-generated Roblox-style thumbnails
5. Pay via Stripe to unlock the full-resolution images

### 🧱 Tech stack:
- **Frontend**: React (with TypeScript)
  - Canvas drawing via Konva.js or Fabric.js
  - File uploader with preview
  - Text input for prompt
  - Stripe payment via `@stripe/react-stripe-js`
- **Backend**: ASP.NET Core 8 Web API (C#)
  - `POST /api/generate` to handle input (images + drawing + text) and call AI API (OpenAI/DALL·E or local stub)
  - `POST /api/stripe/create-session` to create Stripe checkout session
  - `POST /api/stripe/webhook` to receive payment confirmations
  - Serve thumbnail previews (blurred) unless payment complete

### ✅ Functional requirements:
- Users can draw with mouse/touch (freehand only is fine)
- Upload PNG/JPEG files (max 3)
- Enter a short text prompt
- Show 5 generated thumbnails as blurred previews
- Only show full thumbnails after Stripe checkout
- Track payment session in backend memory or simple storage
- Frontend routes:
  - `/` - Editor (canvas + image upload + prompt + generate button)
  - `/results/:sessionId` - Result preview page (blurred)
  - `/success` - Stripe payment success

### 📦 Extras:
- No need for database yet — use in-memory for session state
- Add simple .env config for API keys (Stripe + OpenAI)
- Use minimal CSS or Tailwind
- Optionally use Vite for React app build

Please scaffold the project structure:
- React + Vite frontend folder
- ASP.NET Core 8 backend folder
- API connection between frontend and backend
- Provide placeholder AI generation logic that returns fake thumbnails for now
