# 3D Virtual Science Lab

An immersive mobile application for Grade 7 Integrated Science students, providing safe, interactive laboratory experiences for chemistry and physics.

## Overview

The 3D Virtual Science Lab addresses the need for accessible science education by providing a risk-free environment for experiments that might otherwise be impractical, dangerous, or expensive. Built with **React Native**, **Expo**, and **Three.js**, it offers a high-performance 3D experience on both iOS and Android tablets.

## Key Features

- **Interactive 3D Engine**: Custom-built rendering system with orbit/pan/zoom controls and raycasting for object selection.
- **Chemistry Lab**: Explore pH and acid-base reactions. Features dynamic liquid mixing, pH simulation, and a visual color scale for indicator matching.
- **Expanded Chemical Library**: Test common household items like Lemon Juice, Milk, and Baking Soda alongside laboratory reagents.
- **Physics Lab**: Build and test DC circuits using resistors, batteries, and bulbs to explore Ohm's Law.
- **Cross-Platform**: Full support for Android, iOS, and Web browsers.

## Technology Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Managed Workflow)
- **3D Rendering**: [Three.js](https://threejs.org/) via [expo-three](https://github.com/expo/expo-three) and [expo-gl](https://docs.expo.dev/versions/latest/sdk/gl-view/)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/react-native)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **State Management**: React Context API & Custom Hooks
- **Styling**: Vanilla CSS (StyleSheet)
- **Testing**: Jest with ts-jest

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/client) app on your mobile device (to preview)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd seku
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   - For Mobile (Expo Go): `npx expo start`
   - For Web: `npm run web`

4. Scan the QR code with your Expo Go app (Android) or Camera app (iOS).

## Development Roadmap

- **Phase 1**: Technical Foundation & 3D Core (Completed)
- **Phase 2**: Chemistry Experiment Implementation (In Progress)
- **Phase 3**: Physics Experiment Implementation (Upcoming)
- **Phase 4**: Integration, Teacher Dashboard, & Polish
- **Phase 5**: QA & Public Launch

## License

[MIT](LICENSE) - see the LICENSE file for details.
## Troubleshooting
- Resolved 'Cannot find module react-native-worklets/plugin' by installing react-native-worklets.
- Aligned Expo SDK with Phone Version (SDK 54).
