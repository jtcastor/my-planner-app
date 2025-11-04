# Offline-First Hello World App with Expo and Clean Architecture
This is a simple offline-first "Hello World" mobile app built with React Native and Expo. It demonstrates a basic feature: displaying, editing, and saving a message that persists locally using AsyncStorage. The app follows clean architecture principles to separate concerns, uses React Context for state management (instead of Redux), and Expo Router for navigation. It includes a placeholder for backend sync (offline-only, logs to console). This setup was prepared for a pair programming interview session, emphasizing offline functionality without a live backend.
The app loads a default "Hello World" message on first run, allows editing with validation (no empty messages), saves changes offline, and simulates a sync action.

## Key Highlights
- Offline-First Design: All data operations use local storage (AsyncStorage) for persistence. No network calls are made, aligning with interview requirements.
- Clean Architecture: Layers separate business logic (core), data handling (data), and UI (presentation) for testability and scalability.
   - Core: Independent entities and use cases.
   - Data: Repositories abstract local/remote sources (remote is a no-op placeholder).
   - Presentation: UI components, screens, and state via Context.
- State Management: React Context for simple, app-wide state (message data and actions).
- Navigation: Expo Router with stack layout (file-based routing).
- Persistence: AsyncStorage for cross-platform local storage.
- Error Handling & Debugging: Built-in try/catch, console logs, and fallbacks to handle load/save failures.
- Custom Entry Point: Wraps providers globally to avoid Expo Router conflicts.
- Single-Line JSX Renders: Prevents common React Native text rendering errors.
- Dependencies: Minimal—Expo SDK 51+, AsyncStorage, built-in React features.
- Tested Environments: Works in Expo Go (iOS/Android) and iOS/Android simulators/emulators. Debugged for issues like stuck loading states.

## Prerequisites

- Node.js v18 or later.
- Expo CLI: Install globally with npm install -g expo-cli.
- Expo Go app on your mobile device for quick testing.
- For simulators: Xcode (iOS) or Android Studio (Android).
- Git for cloning the repo.

## Setup Instructions

1. Clone the repository:
```bash
git clone <repo-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Install AsyncStorage (Expo-compatible version):
```bash
npx expo install @react-native-async-storage/async-storage
```

4. (Optional) Reset project to clean state if modifying:
```bash
npm run reset-project
```

Directory Structure
```bash
my-app/
├── app/                  # Expo Router routes
│   ├── _layout.tsx       # Stack navigation config
│   └── index.tsx         # Main route entry (renders HomeScreen)
├── src/                  # Application logic (clean architecture)
│   ├── core/             # Framework-independent business rules
│   │   ├── entities/
│   │   │   └── Message.ts  # Data model
│   │   └── useCases/
│   │       └── GetMessageUseCase.ts  # Retrieve logic
│   │       └── SaveMessageUseCase.ts # Save logic with validation
│   ├── data/             # Data sources and repositories
│   │   ├── repositories/
│   │   │   └── MessageRepository.ts  # Interface and impl for data ops
│   │   └── datasources/
│   │       ├── LocalDataSource.ts    # AsyncStorage handling with error logs
│   │       └── RemoteDataSource.ts   # Placeholder sync (console log)
│   ├── presentation/     # UI and state
│   │   ├── components/
│   │   │   └── MessageDisplay.tsx    # Display/edit UI with input sync
│   │   ├── contexts/
│   │   │   └── AppContext.tsx        # React Context for state/actions
│   │   └── screens/
│   │       └── HomeScreen.tsx        # Main screen composition
│   └── AppProviders.tsx  # Wrapper for contexts
├── entry.tsx             # Custom app entry (wraps providers around Expo Router)
├── package.json          # Dependencies and "main": "./entry.tsx"
├── app.json              # Expo config (no custom entryPoint needed)
├── tsconfig.json         # TypeScript config
└── README.md             # This file
```

# How to Run the App

1. Start the development server:
```bash
npx expo start --clear
```

- Press i for iOS simulator.
- Press a for Android emulator.
- Scan QR code with Expo Go on device.


2. Test Features:
- On load: Shows "Hello World" (or saved message).
- Edit in input field and press "Save": Updates display, persists locally, logs sync placeholder.
- Reload app: Loads persisted message.
- Try empty input: Throws error (console log).

3. For development builds (if native issues arise):
```bash
npx expo run:ios   # Or :android
```

## Architecture Breakdown

- Core Layer: Defines entities (e.g., Message interface) and use cases (e.g., GetMessageUseCase fetches with defaults; SaveMessageUseCase validates and saves). No external dependencies.
- Data Layer: MessageRepository interface abstracts ops; impl composes LocalDataSource (AsyncStorage with try/catch/logs) and RemoteDataSource (placeholder console log for sync).
- Presentation Layer: AppContext manages state (loads on mount, updates via use cases); MessageDisplay component for UI (syncs input with state); HomeScreen composes the view.
- Dependency Injection: Use cases inject repositories for inversion of control.
- Navigation & Entry: Expo Router handles routes; custom entry.tsx wraps AppProviders around ExpoRoot to provide context globally without layout warnings.
- Error Resilience: Try/catch in datasources and context; fallbacks to defaults; debug logs (e.g., 'Loaded message...').

## Dependencies

- Expo (~51.0.0 or latest stable)
- React Native
- @react-native-async-storage/async-storage
- Built-in: React Context, Expo Router

Update with npm update for latest versions.

## Troubleshooting

- Stuck on "Loading...": Check console logs for errors (shake device for dev menu). Reset simulator (Device > Erase All Content and Settings) or clear cache (npx expo start -c).
- Text Rendering Errors: Ensured with single-line JSX returns—avoid multi-line to prevent whitespace nodes.
- Layout Warnings: Handled by custom entry point; ensure package.json "main" points to entry.tsx.
- AsyncStorage Issues: Reinstall with npx expo install; use dev build (npx expo run:ios) if persists in simulator.
- General: Delete node_modules and reinstall; ensure Node/Xcode/Android Studio are updated.

## License
MIT License. Feel free to use/modify for educational purposes.
For questions, open an issue in the repo. Updated as of November 04, 2025.