# 🚀 Getting Started with the Monorepo

This guide will help you set up and start developing on the Open Resume Builder monorepo.

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** 18 or higher (check with `node --version`)
- **pnpm** 8 or higher (install with `npm install -g pnpm`)
- **Git** (for version control)

## 🛠️ Initial Setup

### 1. Install Dependencies

```bash
# From the project root directory
pnpm install
```

This will install all dependencies for:
- Root workspace
- `apps/web` - Web application
- `apps/mobile` - Mobile application
- `packages/shared` - Shared package

### 2. Verify Installation

Check that everything is set up correctly:

```bash
# Should show monorepo information
pnpm info

# Should list all workspace packages
pnpm list -r
```

## 🎯 Development Workflow

### Starting Development

#### Option 1: Run Both Apps (Recommended for Development)
```bash
pnpm dev
```
This runs both web and mobile apps in parallel.

#### Option 2: Run Only Web App
```bash
pnpm dev:web
# or
cd apps/web
pnpm dev
```
- Starts on `http://localhost:5173`
- Hot reload enabled
- Open the URL in your browser

#### Option 3: Run Only Mobile App
```bash
pnpm dev:mobile
# or
cd apps/mobile
pnpm dev
```
- Starts Expo development server
- Press options:
  - `i` - Run in iOS simulator
  - `a` - Run in Android emulator
  - `w` - Run in web browser
  - `s` - Send link via SMS
  - `j` - Jump to RN debugger

### Understanding the Output

When running `pnpm dev`, you'll see:

```
web dev: ✓ Ready in 234ms
web dev: 
web dev: ➜ Local:   http://localhost:5173/
web dev: ➜ press h to show help

mobile dev: Tunnel ready
mobile dev: 
mobile dev: › Metro waiting on exp://...
mobile dev: 
mobile dev: › Press s to switch to development server mode
mobile dev: › Press q to quit
```

## 📁 Working with the Project

### Web App Development

Navigate to the web app:
```bash
cd apps/web
```

**Key files:**
- `src/App.tsx` - Main component
- `src/components/` - UI components
- `src/store/` - State management
- `src/templates/` - Resume templates
- `vite.config.ts` - Build configuration

### Mobile App Development

Navigate to the mobile app:
```bash
cd apps/mobile
```

**Key files:**
- `src/app/_layout.tsx` - Navigation setup
- `src/app/index.tsx` - Home screen
- `src/app/editor.tsx` - Editor screen
- `src/app/preview.tsx` - Preview screen
- `app.json` - Expo configuration

### Shared Package

The shared package contains types and constants used by both apps:

```bash
cd packages/shared
```

**Key files:**
- `src/types.ts` - Type definitions
- `src/templates.ts` - Template interfaces
- `src/index.ts` - Exports

To use shared code in your app:
```typescript
import { Resume, PersonalInfo } from '@open-resume-builder/shared';
```

## 🔧 Common Tasks

### Adding a New Dependency

**Add to web app:**
```bash
pnpm --filter @open-resume-builder/web add package-name
```

**Add to mobile app:**
```bash
pnpm --filter @open-resume-builder/mobile add package-name
```

**Add to shared package:**
```bash
pnpm --filter @open-resume-builder/shared add package-name
```

**Add dev dependency to root:**
```bash
pnpm add -D package-name
```

### Updating All Dependencies

```bash
# Check for updates
pnpm update -r --latest

# Or interactively
pnpm -r update --interactive
```

### Building for Production

**Build everything:**
```bash
pnpm build
```

**Build only web app:**
```bash
pnpm build:web
```

**Build only mobile app:**
```bash
pnpm build:mobile
```

**iOS app for App Store:**
```bash
pnpm build:ios
```

**Android app for Play Store:**
```bash
pnpm build:android
```

### Type Checking

```bash
# Check types in all packages
pnpm type-check

# Or specific app
cd apps/web && pnpm type-check
```

### Linting

```bash
# Lint all packages
pnpm lint

# Or specific app
cd apps/web && pnpm lint
```

## 🐛 Troubleshooting

### Problem: "Cannot find module '@open-resume-builder/shared'"

**Solution:**
```bash
# From root, reinstall dependencies
pnpm install

# Rebuild shared package
pnpm --filter @open-resume-builder/shared build

# Restart dev server in your app
cd apps/web  # or apps/mobile
pnpm dev
```

### Problem: Port already in use

**For web app:**
```bash
cd apps/web
pnpm dev -- --port 3000
```

**For mobile (Expo will ask for alternative port):**
Press `c` to clear cache or choose different port when prompted.

### Problem: Node version mismatch

Check your Node version:
```bash
node --version
```

Should be 18 or higher. To upgrade:
```bash
# Using Homebrew (macOS)
brew install node@20

# Using nvm (recommended)
nvm install 20
nvm use 20
```

### Problem: pnpm not found

Install pnpm globally:
```bash
npm install -g pnpm

# Verify installation
pnpm --version
```

Should be 8 or higher.

### Problem: Clear all caches

Sometimes a full reset is needed:
```bash
# Remove node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Remove lock file
rm pnpm-lock.yaml

# Clear pnpm store
pnpm store prune

# Reinstall
pnpm install
```

## 📚 Useful Commands Reference

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm dev:web` | Start web app only |
| `pnpm dev:mobile` | Start mobile app only |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all code |
| `pnpm type-check` | Type check all packages |
| `pnpm -r --parallel` | Run commands in parallel across workspaces |
| `pnpm --filter @open-resume-builder/web add pkg` | Add dependency to web app |
| `pnpm list -r` | List all dependencies across workspaces |

## 🌐 Browser Dev Tools

### Web App (Chrome DevTools)
- Open app at `http://localhost:5173`
- Press `F12` to open DevTools
- Use React DevTools extension for component inspection

### Mobile App (Expo Dev Tools)
When running `pnpm dev:mobile`:
- Press `w` to open web version
- Press `j` to open debugger
- Use React Native Debugger for advanced debugging

## 📖 Next Steps

1. **Read the main documentation:**
   - [MONOREPO.md](MONOREPO.md) - Detailed monorepo structure and overview
   - [Web App README](apps/web/README.md) - Web development guide
   - [Mobile App README](apps/mobile/README.md) - Mobile development guide
   - [Shared Package README](packages/shared/README.md) - Shared code guide

2. **Explore the codebase:**
   - Start with `apps/web/src/App.tsx` for web structure
   - Start with `apps/mobile/src/app/_layout.tsx` for mobile structure

3. **Make your first feature:**
   - Create a component in one of the apps
   - Add shared types if needed
   - Test in both apps

4. **Set up your IDE:**
   - VS Code recommended
   - Install Prettier for formatting
   - Install ESLint for linting
   - Install React DevTools

## 🤝 Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review app-specific READMEs
3. Check pnpm documentation: https://pnpm.io
4. Check Expo documentation: https://docs.expo.dev

## 🎉 You're Ready!

You now have a fully functional monorepo with:
- ✅ Web application running on Vite
- ✅ Mobile application with React Native Expo
- ✅ Shared types and utilities
- ✅ Workspace dependency management with pnpm

Happy coding! 🚀
