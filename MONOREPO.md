# Open Resume Builder - Monorepo

A modern monorepo setup for developing and maintaining both web and mobile versions of the Open Resume Builder application.

## 📦 Monorepo Structure

```
open-resume-builder/
├── apps/
│   ├── web/                    # React + Vite web application
│   │   ├── src/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   │
│   └── mobile/                 # React Native Expo mobile application
│       ├── src/
│       ├── app.json
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                 # Shared types, utilities, and constants
│       ├── src/
│       │   ├── types.ts
│       │   ├── templates.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── pnpm-workspace.yaml         # Workspace configuration
├── package.json                # Root package.json
└── tsconfig.json               # Shared TypeScript config
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** 8+ (install with: `npm install -g pnpm`)

### Installation

```bash
# Install dependencies for all packages and apps
pnpm install
```

### Development

**Run all apps in parallel:**
```bash
pnpm dev
```

**Run specific app:**
```bash
pnpm dev:web      # Start web development server
pnpm dev:mobile   # Start Expo development server
```

### Building

**Build all apps:**
```bash
pnpm build
```

**Build specific app:**
```bash
pnpm build:web      # Build web app
pnpm build:mobile   # Build Expo app
```

### Linting & Type Checking

```bash
pnpm lint           # Lint all packages
pnpm type-check     # Type check all packages
```

## 📱 Apps Overview

### Web Application (`apps/web`)

A modern resume builder web application built with:
- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form** - Form handling
- **jsPDF** - PDF export

**Key Features:**
- Resume template selection
- Drag-and-drop section reordering
- Real-time preview
- PDF export
- Theme toggle (light/dark mode)

**Development:**
```bash
cd apps/web
pnpm dev
# Open http://localhost:5173
```

### Mobile Application (`apps/mobile`)

A native mobile resume builder using:
- **React Native** - Mobile framework
- **Expo** - Development framework
- **Expo Router** - Navigation
- **TypeScript** - Type safety
- **Zustand** - State management

**Key Features:**
- Native iOS and Android apps
- Mobile-optimized UI
- Local storage for resume data
- Share and export options

**Development:**
```bash
cd apps/mobile
pnpm dev
# Follow the terminal prompts to run on iOS simulator, Android emulator, or web
```

**Build for Deployment:**
```bash
pnpm build:ios      # Build for App Store
pnpm build:android  # Build for Play Store
```

## 📚 Shared Package (`packages/shared`)

Contains all shared code between web and mobile applications:

### Types & Interfaces

- `Resume` - Main resume data structure
- `PersonalInfo` - Personal information interface
- `ResumeSection` - Section structure
- `SectionItem` - Item within sections
- `ResumeTemplate` - Template interface
- `SECTION_DEFINITIONS` - Available sections configuration

### Usage in Apps

```typescript
import { 
  Resume, 
  PersonalInfo, 
  SECTION_DEFINITIONS,
  ResumeTemplate 
} from '@open-resume-builder/shared';
```

### Adding Shared Code

1. Add types/utilities to `packages/shared/src/`
2. Export from `packages/shared/src/index.ts`
3. Use in any app with `@open-resume-builder/shared` import

## 🔗 Workspace Scripts

All scripts can be run from the root directory with `pnpm`:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all apps in development mode |
| `pnpm dev:web` | Run only web app |
| `pnpm dev:mobile` | Run only mobile app |
| `pnpm build` | Build all apps and packages |
| `pnpm build:web` | Build web app for production |
| `pnpm build:mobile` | Build mobile app for production |
| `pnpm build:ios` | Build iOS app for App Store |
| `pnpm build:android` | Build Android app for Play Store |
| `pnpm lint` | Lint all code |
| `pnpm type-check` | Type check all packages |
| `pnpm preview` | Preview web build locally |

## 🎯 Development Workflows

### Adding a New Feature

1. **For both apps:** Add to `packages/shared`
   ```typescript
   // packages/shared/src/newFeature.ts
   export interface NewFeature { ... }
   ```

2. **For web app:**
   ```typescript
   import { NewFeature } from '@open-resume-builder/shared';
   ```

3. **For mobile app:**
   ```typescript
   import { NewFeature } from '@open-resume-builder/shared';
   ```

### Creating a New Section Type

1. Update `SECTION_DEFINITIONS` in `packages/shared/src/types.ts`
2. Create section components in each app:
   - Web: `apps/web/src/components/Editor/sections/`
   - Mobile: `apps/mobile/src/components/sections/`

### Updating Dependencies

**For a specific app:**
```bash
pnpm --filter @open-resume-builder/web add lodash
```

**For shared package:**
```bash
pnpm --filter @open-resume-builder/shared add some-utility
```

**For root (dev dependencies only):**
```bash
pnpm add -D typescript
```

## 🔄 Git Workflow

When committing changes that affect multiple packages:

```bash
# All related changes should be committed together
git add .
git commit -m "feat: add new resume section - web, mobile, and shared updates"
```

## 📖 Project Structure Details

### App Dependencies

- **Web & Mobile** both depend on `@open-resume-builder/shared`
- **Shared** has no internal dependencies (only TypeScript)
- Cross-package imports use the workspace protocol: `@open-resume-builder/shared`

### Path Aliases

Each app has configured path aliases for cleaner imports:

```typescript
// Web app
import { Component } from '@/components/Component';
import { types } from '@shared/types';

// Mobile app
import { Component } from '@/components/Component';
import { types } from '@shared/types';
```

## 🛠️ Troubleshooting

### Dependencies not installing

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall all dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Module resolution issues

```bash
# Rebuild all packages
pnpm -r build

# Clear any cached builds
pnpm -r exec rm -rf dist
```

### Port conflicts

- Web app default: `http://localhost:5173`
- Mobile Expo: `http://localhost:8081`

To change ports:
```bash
# Web
cd apps/web && pnpm dev -- --port 3000

# Mobile (in Expo CLI, press 'w' for web, then specify port)
```

## 📝 Environment Variables

Create `.env.local` files in each app directory:

```bash
# apps/web/.env.local
VITE_API_URL=http://localhost:3000

# apps/mobile/.env.local
EXPO_PUBLIC_API_URL=http://localhost:3000
```

## 🚢 Deployment

### Web App
- Build: `pnpm build:web`
- Deploy to Vercel, Netlify, or any static host
- Built files in: `apps/web/dist/`

### Mobile App
- iOS: `pnpm build:ios`
- Android: `pnpm build:android`
- Uses EAS Build for cloud builds

## 📄 License

MIT

## 🤝 Contributing

1. Create feature branch from main
2. Make changes across packages as needed
3. Test thoroughly (web + mobile)
4. Submit PR with clear description

---

For more information on individual apps, see their respective README files:
- [Web App README](apps/web/README.md)
- [Mobile App README](apps/mobile/README.md)
- [Shared Package README](packages/shared/README.md)
