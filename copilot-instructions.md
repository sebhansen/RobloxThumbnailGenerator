# GitHub Copilot Instructions for Roblox Thumbnail Generator

This file provides GitHub Copilot with a full context of the Roblox Thumbnail Generator project so it can assist with meaningful code generation and architecture.

---

## 🧠 Project Purpose
A full-stack web app that allows users to:
- Upload reference images
- Draw and annotate over them (shapes, freehand, text)
- Enter a text prompt describing the scene
- Generate 5 preview thumbnails using AI
- Pay to unlock full-resolution versions using Stripe

---

## 🧱 Tech Stack

### Frontend
- React (TypeScript)
- Vite
- TailwindCSS
- Libraries:
  - `react-konva` for canvas drawing and image layering
  - `@stripe/react-stripe-js` for payment UI
  - `@headlessui/react` for dropdowns and modals

### Backend
- ASP.NET Core 8 Web API
- Endpoints:
  - `POST /api/generate` — Accepts drawing/image/prompt and returns thumbnail previews
  - `POST /api/stripe/create-session` — Initiates Stripe Checkout session
  - `POST /api/stripe/webhook` — Confirms payment
- Initially uses mocked data for image generation

---

## 📁 Folder Structure

```
roblox-thumbnail-generator/
├── client/
│   └── src/
│       ├── components/
│       │   ├── CanvasEditor.tsx         # Drawing layer using react-konva
│       │   ├── ImageUploader.tsx        # File input + preview
│       │   ├── PromptInput.tsx          # Text prompt field
│       │   ├── StyleSelector.tsx        # Dropdowns for style/aspect
│       │   └── ThumbnailGallery.tsx     # Image result previews
│       ├── pages/
│       │   ├── Home.tsx                 # Drawing + prompt + upload UI
│       │   ├── Results.tsx              # Shows 5 thumbnails + payment button
│       │   └── Success.tsx              # Payment confirmed screen
│       ├── App.tsx                      # Main router
│       └── main.tsx                     # ReactDOM render
├── server/
│   ├── Controllers/
│   │   ├── GenerateController.cs        # POST /generate
│   │   └── StripeController.cs          # POST /stripe/... endpoints
│   ├── Services/
│   │   └── AiImageService.cs            # Simulated generation logic
│   ├── Models/
│   │   ├── GenerationRequest.cs
│   │   └── ThumbnailResult.cs
│   ├── Program.cs
│   └── roblox-thumbnail-generator.csproj
```

---

## ✅ Functional Requirements
- [ ] Upload up to 3 images
- [ ] Draw with brush tool
- [ ] Add text overlays
- [ ] Enter a text prompt (≤ 300 chars)
- [ ] Select art style + aspect ratio
- [ ] Preview blurred thumbnails (x5)
- [ ] Checkout via Stripe
- [ ] Show full images after payment

---

## 🧩 Component Responsibilities

### CanvasEditor.tsx
- Shows uploaded image
- Layers brush drawings (react-konva)
- Allows adding movable text

### ImageUploader.tsx
- Accepts file drop or picker input
- Validates PNG/JPEG
- Shows image preview

### PromptInput.tsx
- Textarea or input field
- Shows character count

### StyleSelector.tsx
- Dropdowns for style (e.g., Roblox, Realistic)
- Dropdown for aspect ratio (1:1, 16:9, 4:3)

### ThumbnailGallery.tsx
- Shows blurred images
- Each image is locked until payment success

---

## 🛠 Suggestions for Copilot

### React
- Generate Tailwind-based components
- Suggest Konva shapes and event handlers
- Manage shared state via props or context

### ASP.NET Core
- Scaffold REST endpoints
- Serialize `multipart/form-data` requests
- Handle Stripe sessions and webhook
- Use placeholder logic for AI image output

---

## 🚀 Dev Commands

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
dotnet restore
dotnet run
```

---

## 🤝 Integration Flow
1. User uploads images + draws
2. Adds text + selects style/aspect
3. Submits to `/api/generate`
4. Gets 5 previews
5. Clicks "Unlock Full Images" → Stripe Checkout
6. Stripe redirects to `/success`
7. Show high-res images

---

This file should stay updated as the project evolves.
