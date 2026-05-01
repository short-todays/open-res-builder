# Shared Package - Open Resume Builder

Shared types, utilities, and constants used across both web and mobile applications.

## Overview

This package contains all shared code that can be used by both the web and mobile applications of Open Resume Builder.

## Package Contents

### Types & Interfaces

Located in `src/types.ts`:

- **`PersonalInfo`** - User's personal information
  ```typescript
  interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    location: string;
  }
  ```

- **`SectionItem`** - Generic item in a resume section
  ```typescript
  interface SectionItem {
    id: string;
    [key: string]: string | number | boolean;
  }
  ```

- **`ResumeSection`** - Grouped items with visibility control
  ```typescript
  interface ResumeSection {
    id: string;
    title: string;
    visible: boolean;
    items: SectionItem[];
  }
  ```

- **`Resume`** - Complete resume structure
  ```typescript
  interface Resume {
    personal: PersonalInfo;
    summary: string;
    sections: ResumeSection[];
  }
  ```

- **`SECTION_DEFINITIONS`** - Configuration for available sections
  ```typescript
  const SECTION_DEFINITIONS = {
    experience: { /* ... */ },
    projects: { /* ... */ },
    skills: { /* ... */ },
    // ... more sections
  }
  ```

### Templates

Located in `src/templates.ts`:

- **`ResumeTemplate`** - Template interface for formatting resume data
  ```typescript
  interface ResumeTemplate {
    id: string;
    name: string;
    description: string;
    formatSectionItem: (section, item) => string[];
    sectionOrder?: string[];
    styling?: { /* ... */ };
  }
  ```

## Usage

### In Web App

```typescript
import { 
  Resume, 
  PersonalInfo, 
  SECTION_DEFINITIONS,
  ResumeTemplate 
} from '@open-resume-builder/shared';
```

### In Mobile App

```typescript
import { 
  Resume, 
  PersonalInfo, 
  SECTION_DEFINITIONS,
  ResumeTemplate 
} from '@open-resume-builder/shared';
```

## Adding New Shared Code

1. **Create a new file in `src/`:**
   ```typescript
   // src/newFeature.ts
   export interface NewFeature {
     // ...
   }
   ```

2. **Export from `index.ts`:**
   ```typescript
   // src/index.ts
   export * from './types';
   export * from './templates';
   export * from './newFeature';  // Add this line
   ```

3. **Use in apps:**
   ```typescript
   import { NewFeature } from '@open-resume-builder/shared';
   ```

## Development

```bash
# Type check
pnpm type-check

# Build
pnpm build

# Output is in dist/
```

## Structure

```
src/
├── types.ts          # Core types and interfaces
├── templates.ts      # Template interfaces
└── index.ts          # Re-exports all exports
```

## Publishing

This package is only used internally via workspace protocol (`workspace:*`).

If you ever need to publish to npm:

```bash
npm publish
```

## Guidelines for Shared Code

### ✅ Good Candidates for Shared Package

- Type definitions and interfaces
- Constants (section definitions, etc.)
- Utility functions needed in both apps
- Enums and configuration objects
- Data validation schemas

### ❌ Not for Shared Package

- UI Components (web and mobile have different paradigms)
- Platform-specific code (iOS, Android, browser)
- State management (each app has its own store)
- Build configuration

### Best Practices

1. **Keep it minimal** - Only truly shared code
2. **No dependencies** - Avoid external dependencies in shared
3. **Type-first** - Focus on providing good types
4. **Documented** - Add JSDoc comments
5. **Tested** - Ensure shared code works in both apps

## Troubleshooting

### Module resolution errors

If you get "Cannot find module '@open-resume-builder/shared'":

1. Run `pnpm install` from root
2. Rebuild shared: `pnpm --filter @open-resume-builder/shared build`
3. Restart dev server in the consuming app

### Type errors

Clear TypeScript cache:

```bash
pnpm --filter @open-resume-builder/shared exec rm -rf dist
pnpm --filter @open-resume-builder/shared build
```

---

For more information about the monorepo setup, see [MONOREPO.md](../../MONOREPO.md)
