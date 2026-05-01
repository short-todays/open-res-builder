# Mobile Application - Open Resume Builder

The native mobile application for Open Resume Builder built with React Native and Expo.

## Quick Start

```bash
# From the root directory
pnpm dev:mobile

# Or from this directory
cd apps/mobile
pnpm dev
```

## Scripts

- `pnpm dev` or `pnpm start` - Start Expo development server
- `pnpm android` - Run on Android emulator
- `pnpm ios` - Run on iOS simulator
- `pnpm web` - Run in web browser (for testing)
- `pnpm build` - Create standalone app build
- `pnpm build:ios` - Build for App Store
- `pnpm build:android` - Build for Play Store
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Type check with TypeScript

## Features

- 📱 Native iOS and Android apps
- ✨ Multiple resume templates
- 👁️ Real-time preview
- 💾 Local storage for resume data
- 🎨 Responsive mobile UI
- ⚡ Fast performance with React Native

## Project Structure

```
src/
├── app/
│   ├── _layout.tsx           # Root layout with navigation stack
│   ├── index.tsx             # Home screen
│   ├── editor.tsx            # Resume editor screen
│   └── preview.tsx           # Resume preview screen
├── components/               # Reusable components
├── store/
│   └── resumeStore.ts        # Resume state management
└── utils/                    # Utility functions
```

## Dependencies

- **React Native** - Mobile framework
- **Expo** - Development and deployment platform
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **Zustand** - State management

## Getting Started with Expo

### Development

1. **Install Expo CLI (if not already):**
   ```bash
   npm install -g expo-cli
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

3. **Run on device/emulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on physical device

### Building Standalone Apps

#### Prerequisites

- Create an Expo account at https://expo.dev
- Set up EAS CLI:
  ```bash
  npm install -g eas-cli
  eas login
  ```

#### iOS Build

```bash
eas build --platform ios
```

This creates an app ready for TestFlight and App Store deployment.

#### Android Build

```bash
eas build --platform android
```

This creates an APK for testing or App Store release.

## Screen Structure

### Home Screen (`index.tsx`)
- Displays welcome message
- Options to create new resume or view preview

### Editor Screen (`editor.tsx`)
- Form for entering resume information
- Personal information section
- Navigation to other sections

### Preview Screen (`preview.tsx`)
- Display formatted resume
- Mock resume data display
- Print/share options

## State Management

Resume data is managed with Zustand:

```typescript
import { useResumeStore } from '@/store/resumeStore';

const { resume, setResume, updatePersonalInfo } = useResumeStore();
```

## Navigation

Using Expo Router for file-based routing:

```typescript
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/editor');
```

## Configuration

### `app.json`

Contains Expo configuration:
- App name and slug
- iOS/Android packages
- Icons and splash screen
- Build profiles

### `tsconfig.json`

TypeScript configuration for React Native.

## Shared Code

Import from the shared package:

```typescript
import { Resume, PersonalInfo } from '@open-resume-builder/shared';
```

## Development Tips

### Hot Reloading

Changes are hot-reloaded automatically. For full refresh, press `r` in the Expo CLI.

### Debugging

- **React DevTools:** Connected through Expo CLI
- **Network Inspector:** Available in Expo CLI menu
- **Console Logs:** Visible in terminal

### Common Issues

**Module not found:**
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `pnpm install`

**Port already in use:**
- Expo uses port 19000 by default
- Change with: `expo start --port 3000`

## Deployment

### Testflight (iOS Beta)
```bash
eas build --platform ios
eas submit --platform ios
```

### Google Play (Android)
```bash
eas build --platform android
eas submit --platform android
```

## Performance Optimization

- Use React.memo for components
- Implement list virtualization for long lists
- Optimize images with expo-image
- Use react-native-reanimated for smooth animations

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Documentation](https://docs.expo.dev/routing/introduction/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)

## Troubleshooting

### App won't build

1. Check Node version (18+ required)
2. Clear cache: `pnpm install` and `expo start -c`
3. Check app.json for valid configuration

### Can't connect to development server

- Ensure phone/emulator and development computer are on same network
- Check firewall settings
- Use Expo Go app for testing

### Native module errors

- Rebuild the app: `expo prebuild --clean`
- Clear watchman: `watchman watch-del-all` (macOS)

---

For more information about the monorepo setup, see [MONOREPO.md](../../MONOREPO.md)
