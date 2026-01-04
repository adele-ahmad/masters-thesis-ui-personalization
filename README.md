This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# AI-Driven UI Personalization System

A Next.js application demonstrating real-time user interface personalization using TensorFlow.js machine learning models.

## Features

- 🤖 **ML-Powered Personalization**: TensorFlow.js model predicts optimal UI configurations
- 🎨 **Dynamic Theming**: Real-time CSS variable updates without page reloads
- 📊 **Multi-Dimensional Adaptation**: Typography, spacing, colors, motion, and more
- 🚀 **Quick Presets**: One-click UI transformations (Minimal, Balanced, Rich)
- 🛒 **Full E-commerce Demo**: Product browsing, search, and cart functionality

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **ML Library:** TensorFlow.js
- **Styling:** CSS Modules + CSS Variables
- **State Management:** React Context API

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ui-personalization-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Add ML model files**
Place these files in `public/model/`:
- `model.json`
- `group1-shard1of1.bin`
- `feature_columns.json`
- `label_encoders.json`

4. **Run the development server**
```bash
npm run dev
```

5. **Open the application**
Navigate to `http://localhost:3000`

## Usage

### Quick Presets

Click one of three preset buttons for instant UI transformation:

- **👴 Minimal**: Large text, grey background, high contrast (accessibility-focused)
- **👤 Balanced**: Medium text, dark background, standard UI (general users)
- **🎮 Rich**: Small text, vibrant background, compact layout (power users)

### Manual Personalization

1. Configure user profile (age, gender, platform, experience)
2. Adjust UI/UX preference sliders (optional)
3. Click "Run Personalization" 
4. AI model predicts optimal UI and applies changes instantly

### Navigation

- **Home**: Personalization controls and live preview
- **Shop**: Browse products with personalized UI
- **Cart**: View cart items with adaptive styling

## How It Works

### ML Model Pipeline
```
User Profile (20 features) 
    ↓
TensorFlow.js Model
    ↓
Engagement Classification (0/1/2)
    ↓
UI Profile Mapping
    ↓
CSS Variable Updates
    ↓
Real-time UI Transformation
```

### Personalized UI Dimensions

| Dimension | Range | Example |
|-----------|-------|---------|
| Typography Base | 14px - 20px | Font size scaling |
| Spacing Base | 6px - 16px | Layout breathing room |
| Component Density | Compact/Normal/Spacious | Button/card sizing |
| Color Scheme | Grey/Dark/Vibrant | Background themes |
| Accent Color | Green/Blue/Pink | Interactive elements |
| Motion Duration | 0.05s - 0.5s | Animation speed |

### CSS Variables (Design Tokens)

The system updates these root-level CSS variables:
```css
--font-base, --font-h1, --font-h2, --font-h3
--space-1, --space-2, --space-3, --space-4, --space-5
--component-padding, --component-gap, --component-min-height
--color-bg, --color-surface, --color-border, --color-text
--color-accent, --motion-duration
--radius, --shadow, --focus-ring
```

All components reference these variables, ensuring consistent personalization across the app.

## Project Structure
```
ui-personalization-app/
├── public/
│   └── model/              # ML model files
├── src/
│   ├── app/                # Next.js pages
│   │   ├── page.tsx        # Home page
│   │   ├── shop/           # Shop page
│   │   └── cart/           # Cart page
│   ├── components/         # React components
│   ├── contexts/           # State management
│   ├── services/           # ML model service
│   ├── styles/             # CSS modules
│   └── types/              # TypeScript types
└── package.json
```

## Key Files

- `src/services/modelService.ts`: ML model loading and inference
- `src/contexts/PersonalizationContext.tsx`: UI state and CSS variable updates
- `src/components/PersonalizationPanel.tsx`: User input controls
- `src/types/index.ts`: TypeScript interfaces

## Model Details

- **Input:** 20 features (4 demographic + 16 UI preferences)
- **Architecture:** Neural network (20 → 64 → 32 → 3)
- **Output:** 3 engagement classes with probability scores
- **Format:** TensorFlow.js graph model

## Performance

- ✅ No server-side rendering for personalization
- ✅ Client-side ML inference (<100ms)
- ✅ Zero page reloads for UI changes
- ✅ Smooth transitions with CSS variables

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development Notes

- Manual slider adjustments have limited effect (reserved for future development)
- Quick Presets provide the most dramatic demonstrations
- Model predictions can be overridden based on age for demo purposes

## License

MIT

## Author

[Your Name] - Master's Thesis Project

## Acknowledgments

- TensorFlow.js team for browser-based ML
- Next.js for the React framework
- Anthropic Claude for development assistance