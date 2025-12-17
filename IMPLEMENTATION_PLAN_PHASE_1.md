# Implementation Plan: 3D Virtual Science Lab (Phase 1)

**Document Version:** 1.0  
**Date:** December 8, 2025  
**Author:** Gemini CLI Agent  
**Status:** Proposed Plan

## Introduction

This document provides a detailed technical implementation plan for "Phase 1: Foundation" of the 3D Virtual Science Lab application, as specified in the Product Requirements Document (PRD). It outlines the concrete steps, commands, code structures, and architectural patterns that will be used to establish the project's infrastructure, core 3D rendering capabilities, and basic UI framework.

---

## 1.0 Technical Infrastructure Setup

This section details the initial setup of the project, including the repository, dependencies, directory structure, and development tooling.

### 1.1 Project Initialization

The project will be initialized as an Expo managed workflow application using the specified SDK and a TypeScript template.

**Command:**
```bash
npx create-expo-app@latest . --template "tabs@49"
```
*   **`npx create-expo-app@latest .`**: Initializes the project in the current directory.
*   **`--template "tabs@49"`**: Uses the official TypeScript-based tabs navigator template for Expo SDK 49, which provides a solid foundation for the app's navigation structure.

### 1.2 Dependency Installation

The following core dependencies will be installed using `npx expo install` to ensure version compatibility with the Expo SDK.

**Command:**
```bash
npx expo install three expo-three expo-gl react-native-gesture-handler react-native-reanimated expo-screen-orientation expo-file-system @react-navigation/stack
```

**Dependency Breakdown:**
*   `three`, `expo-three`, `expo-gl`: The core libraries for 3D rendering.
*   `react-native-gesture-handler`, `react-native-reanimated`: Essential for creating smooth, touch-based camera controls and UI animations.
*   `expo-screen-orientation`: To enforce the landscape-only mode required for the lab environment.
*   `expo-file-system`: For future data persistence needs (e.g., saving experiment states).
*   `@react-navigation/stack`: To supplement the tab navigator with stack-based navigation for hierarchical flows (e.g., navigating into a specific experiment).

### 1.3 Project Structure

A logical and scalable directory structure will be created within the `/src` folder to organize the codebase as per the PRD.

**Command:**
```bash
mkdir -p src/assets/models src/assets/textures src/components/ui src/components/3d src/experiments/chemistry src/experiments/physics src/hooks src/navigation src/screens src/services src/styles src/utils
```

**Directory Purpose:**
*   `/src/assets`: For static assets like 3D models (`.glb`) and textures.
*   `/src/components/ui`: For reusable 2D UI components (e.g., `Button`, `Card`).
*   `/src/components/3d`: For reusable 3D components or wrappers (e.g., `ThreeCanvas`).
*   `/src/experiments`: To house the logic, assets, and components specific to each experiment.
*   `/src/hooks`: For custom React hooks (e.g., `useCameraControls`, `useRaycaster`).
*   `/src/navigation`: For all React Navigation configuration and navigators.
*   `/src/screens`: For top-level screen components.
*   `/src/services`: For business logic and external services (e.g., data persistence).
*   `/src/styles`: For global styling, theming, and responsive layout utilities.
*   `/src/utils`: For shared helper functions.

### 1.4 Development Tooling

ESLint and Prettier will be configured to enforce code quality and a consistent style.

1.  **Install Dev Dependencies:**
    ```bash
    npm install --save-dev eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-prettier eslint-plugin-prettier
    ```
2.  **Create `.eslintrc.js`:** A configuration file will be created to define linting rules, extending from recommended presets for TypeScript and React.
3.  **Create `.prettierrc.js`:** A configuration file will define formatting rules (e.g., tab width, semi-colons, trailing commas) to ensure consistent code style across the project.

---

## 2.0 Core 3D Rendering Engine

This section describes the plan for building the foundational 3D rendering system.

### 2.1 Scene Initialization (`ThreeCanvas` Component)

A reusable component, `<ThreeCanvas>`, will be created in `/src/components/3d`. This component will encapsulate the `GLView` from `expo-gl` and handle the initialization of the core Three.js `Scene`, `Renderer`, and `Camera`.

**File:** `/src/components/3d/ThreeCanvas.tsx`
**Logic:**
*   Accepts `onContextCreate` as a prop.
*   On mount, it initializes an `ExpoWebGLRenderingContext`.
*   It creates a `THREE.WebGLRenderer` using this context.
*   It creates a default `THREE.PerspectiveCamera` and a `THREE.Scene`.
*   It starts a render loop using `requestAnimationFrame` to call `renderer.render(scene, camera)` on each frame.

### 2.2 Camera Controls (`useCameraControls` Hook)

A custom hook, `useCameraControls`, will be created to manage camera manipulation via touch gestures.

**File:** `/src/hooks/useCameraControls.ts`
**Logic:**
*   Utilizes `react-native-gesture-handler` for `PanGestureHandler` (panning) and `PinchGestureHandler` (zooming).
*   **Orbit:** A one-finger pan gesture will be translated into spherical coordinate changes to rotate the camera around a target point (the center of the lab bench).
*   **Pan:** A two-finger pan gesture will translate the camera's position and target along the X and Y axes.
*   **Zoom:** A pinch gesture will move the camera closer to or further from its target point, adjusting the field of view or camera position.
*   The hook will return the camera object and gesture handler props to be spread onto a view.

### 2.3 Lighting System

The initial lighting setup will be implemented directly within the main lab scene to provide realistic illumination.
*   **`THREE.AmbientLight`**: Added to provide a soft, base level of light across the entire scene, ensuring no objects are completely black.
*   **`THREE.DirectionalLight`**: Added to simulate a primary light source (like the sun or overhead lighting), creating highlights and shadows. Its position will be configured to create a clear sense of depth.

### 2.4 Object Interaction (`useRaycaster` Hook)

To detect user taps on 3D objects, a `useRaycaster` hook will be implemented.

**File:** `/src/hooks/useRaycaster.ts`
**Logic:**
*   Takes the `camera` and a list of interactive `objects` as input.
*   Uses `react-native-gesture-handler`'s `TapGestureHandler`.
*   On tap, it converts the 2D screen coordinates of the tap into a normalized 3D vector.
*   It uses `THREE.Raycaster` to cast a ray from the camera through that point into the scene.
*   It returns an array of objects intersected by the ray, which can then be used to trigger selection, highlighting, or other interactions.

### 2.5 Performance Monitoring

A simple, non-intrusive FPS counter component (`<FPSMonitor />`) will be created.
*   It will use `requestAnimationFrame` and `Date.now()` to calculate the frames per second over a short interval.
*   The component will display the current FPS in a corner of the screen, enabled only in development builds, to continuously monitor performance against the 30 FPS target.

### 2.6 Asset Management (`useAssetLoader` Hook)

A custom hook, `useAssetLoader`, will be created to handle the asynchronous loading of 3D models and textures.

**File:** `/src/hooks/useAssetLoader.ts`
**Logic:**
*   Utilizes `expo-asset` and `useAssets` to load asset files.
*   For 3D models (`.glb`), it will use `THREE.GLTFLoader`.
*   For textures, it will use `THREE.TextureLoader`.
*   It will manage a loading state (`isLoading`, `progress`) and return the loaded assets (e.g., `THREE.Group`, `THREE.Texture`). This allows UI to display a loading indicator while assets are being prepared.

---

## 3.0 Basic UI Framework

This section covers the implementation of the application's 2D interface and navigation.

### 3.1 Navigation System

The navigation will be set up in `/src/navigation` using `react-navigation`.

*   **`BottomTabNavigator`**: A bottom tab bar will be the primary navigation, providing access to the main sections: `Home`, `Lab`, `Resources`, `Progress`, and `Settings`.
*   **`StackNavigator`**: A stack navigator will be nested within the `Lab` tab to handle navigation from the experiment selection screen to the actual 3D lab environment.
*   **Initial Screens**: Placeholder screens will be created for each tab in `/src/screens`.

### 3.2 Theming and Styling

A centralized styling system will be established to ensure visual consistency.

**File:** `/src/styles/theme.ts`
**Content:**
*   **Colors:** An object exporting color palettes (e.g., `primary`, `secondary`, `accent`, `success`, `error`, `text`).
*   **Typography:** An object defining font sizes, weights, and families for different text styles (e.g., `h1`, `h2`, `body`, `caption`).
*   **Spacing:** A numeric scale for consistent margins, padding, and layout spacing (e.g., `spacing.small`, `spacing.medium`).

### 3.3 Reusable Component Library

Initial UI components will be created in `/src/components/ui`. These will be built using the `theme.ts` file to ensure they are consistently styled.

**Initial Components:**
*   **`<Button />`**: A customizable button component with `onPress` handling and different visual styles (e.g., `primary`, `outline`).
*   **`<Card />`**: A container component with a subtle shadow and border-radius for displaying experiment summaries on the `Home` screen.
*   **`<Modal />`**: A reusable modal component for displaying dialogs or extended information.

---

## Conclusion and Next Steps

This plan provides a comprehensive roadmap for completing Phase 1. Upon approval, I will begin execution with step 1.1, initializing the Expo project. Each subsequent step will be explained before execution. The successful completion of this phase will result in a functional application skeleton with a core 3D rendering loop, basic camera controls, and a navigable UI, ready for the development of the first chemistry experiment.
