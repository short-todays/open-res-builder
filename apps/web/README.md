# Web Application - Open Resume Builder

The web application for Open Resume Builder built with React, Vite, and TypeScript.

## Quick Start

```bash
# From the root directory
pnpm dev:web

# Or from this directory
cd apps/web
pnpm dev
```

## Scripts

- `pnpm dev` - Start development server (localhost:5173)
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Type check with TypeScript
- `pnpm preview` - Preview production build locally

## Features

- ✨ Multiple resume templates
- 🎨 Real-time preview
- 📄 PDF export functionality
- 🌓 Dark/Light theme toggle
- 🎯 Drag-and-drop section reordering
- 📱 Responsive design
- ⌨️ Form validation with React Hook Form

## Project Structure

```
src/
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
├── index.css                  # Global styles
├── components/
│   ├── Header.tsx            # Header component
│   ├── TemplateSelector.tsx  # Template selection
│   ├── ThemeToggle.tsx       # Dark mode toggle
│   ├── FormFields/           # Reusable form components
│   ├── Editor/               # Resume editor components
│   └── Preview/              # Preview components
├── store/
│   ├── resumeStore.ts        # Resume state management
│   ├── templateStore.ts      # Template state
│   └── themeStore.ts         # Theme state
├── templates/                # Resume templates
├── types/                    # TypeScript types
└── utils/
    └── pdfExport.ts         # PDF export utilities
```

## Dependencies

- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form** - Form handling
- **jsPDF** - PDF generation
- **@dnd-kit** - Drag and drop

## Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules
- `postcss.config.js` - PostCSS configuration

## Development Tips

### Adding a New Resume Section

1. Create the section component in `src/components/Editor/sections/`
2. Add the section definition to shared types
3. Update the resume store if needed
4. Add preview styling

### Styling

- Use Tailwind CSS classes for styling
- Global styles in `src/index.css`
- Component-specific styles can use Tailwind classes

### State Management

Resume data is managed with Zustand:

```typescript
import { useResumeStore } from '@/store/resumeStore';

const { resume, updateResume } = useResumeStore();
```

## Building for Production

```bash
pnpm build
```

Output files are in the `dist/` directory.

## Deployment

This app can be deployed to:
- Vercel (recommended for Vite apps)
- Netlify
- GitHub Pages
- Any static hosting service

## Troubleshooting

### Port already in use

Change the port in `vite.config.ts` or run:

```bash
pnpm dev -- --port 3000
```

### Build errors

Clear cache and reinstall:

```bash
pnpm clean
pnpm install
pnpm build
```
