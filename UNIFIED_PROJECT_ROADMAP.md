# Unified Project Roadmap: 3D Virtual Lab & Integrated IoT Kit

**Document Version:** 1.0  
**Date:** December 8, 2025  
**Author:** Gemini Guide  
**Status:** Master Plan

## 1.0 Introduction & Unified Vision

This document outlines the comprehensive, phased roadmap for the development of a single, integrated web application. This application will serve as the **3D Virtual Science Lab** and will include the **software platform for the IoT Science Lab Hardware Kit** as a core, integrated feature.

This plan synthesizes the requirements from the "3D Virtual Science Lab" and "IoT Science Lab Hardware Kit" documents into a single, actionable strategy. Our goal is to create a seamless, web-based experience that allows students to move between virtual simulations and physical computing, culminating in a pilot-ready prototype.

**Guiding Principle:** *"Integration between physical hardware and the 3D virtual environment creates a unique hybrid learning experience where students can prototype in the virtual lab, test with real hardware, and visualize data in both domains simultaneously."* (from IoT Kit PRD)

## 2.0 Proposed Technology Stack

To achieve our goal of a unified web application, the following modern technology stack is proposed:

*   **Core Framework:** **Next.js 14 (with App Router)** using **React & TypeScript**. This provides a robust foundation for a server-rendered web application, ideal for both content and interactivity.
*   **3D Rendering:** **Three.js** and **@react-three/fiber**. `@react-three/fiber` is a React renderer for Three.js that will allow us to build our 3D lab declaratively with reusable components.
*   **IoT Visual Programming:** **Blockly**. A Google library for building visual, block-based programming editors. It's highly customizable and can generate the C++/MicroPython code needed for the ESP32 hardware.
*   **Hardware Communication:** **Web Serial API** and **Web Bluetooth API**. These browser APIs will allow our web application to communicate directly with the ESP32-based Core Module connected via USB or Bluetooth.
*   **UI Components:** **Tailwind CSS** for styling and **Shadcn/ui** for a base library of accessible and composable components.
*   **Deployment:** **Vercel**. Provides seamless deployment, preview environments, and scalability for our Next.js application.

## 3.0 Phased Development Roadmap

### Phase 1: Core Platform & 3D Lab Foundation (Months 1-2)

**Goal:** Establish the web application's architecture and build the foundational 3D environment for the virtual lab.

*   **Platform Setup:**
    *   Initialize the Next.js & TypeScript project.
    *   Configure ESLint, Prettier, and Tailwind CSS.
    *   Set up the project structure (folders for `components`, `app`, `lib`, `styles`, etc.).
    *   Establish the CI/CD pipeline with Vercel.
*   **Basic UI & Navigation:**
    *   Implement the main application shell, including a header, sidebar navigation, and main content area.
    *   Create placeholder pages for the primary sections: `Dashboard`, `3D Lab`, `IoT Projects`, `Resources`, `Settings`.
*   **Core 3D Rendering Engine:**
    *   Integrate `@react-three/fiber` to create a basic 3D scene viewer component.
    *   Implement foundational 3D elements: basic lighting (`ambientLight`, `directionalLight`), a floor/surface for the lab, and placeholder assets.
    *   Develop basic camera controls (orbit, pan, zoom) using the mouse, which will serve as the foundation for touch controls later.
*   **Initial Asset Loading:**
    *   Build an asset loading pipeline to import the first 3D model: the basic laboratory environment with a workbench, as described in the "3D Asset Creation" section of the original lab PRD.

### Phase 2: Chemistry Experiment Simulation (Months 2-4)

**Goal:** Bring the 3D lab to life with the first interactive experiment, proving the viability of the simulation engine.

*   **Interactive 3D Assets:**
    *   Model and import the interactive equipment for the chemistry lab: beakers, pH meter, pipettes, litmus paper strips.
    *   Create materials and textures for chemical solutions to show different colors and transparency.
*   **Chemistry Simulation Logic:**
    *   Implement the core simulation logic for pH calculation as a set of TypeScript functions.
    *   Develop a state management system (e.g., using Zustand or React Context) to track the state of the experiment (e.g., chemical concentrations, volumes, pH).
*   **UI for Chemistry:**
    *   Build the UI panels specific to the experiment: a solution selection interface, an equipment palette, and a data display for pH values.
    *   Implement the interaction logic: clicking on a beaker to select it, dragging a pipette to transfer liquid, etc.
*   **Instructional Overlays:**
    *   Create a system for displaying step-by-step instructions and safety reminders within the 3D view.

### Phase 3: IoT Kit Integration MVP (Months 4-6)

**Goal:** Integrate the software for the IoT kit, enabling users to program the hardware from within our web application and complete the first demonstration project.

*   **Visual Programming Interface:**
    *   Integrate the **Blockly** library into a new section of the web app.
    *   Customize Blockly to create the initial set of hardware-specific blocks as described in the IoT PRD (e.g., "get temperature", "set LED color").
*   **Hardware Communication Layer:**
    *   Implement a service that uses the **Web Serial API** to detect, connect to, and communicate with the ESP32 Core Module.
    *   Develop the logic to "flash" or send the generated code (MicroPython script) from Blockly to the device.
*   **"Smart Greenhouse" Project:**
    *   Build the UI for the first demonstration project: the "Smart Greenhouse Monitoring System".
    *   Create the specific Blockly blocks required for this project (temperature, soil moisture, light sensor, water pump actuator).
    *   Develop the "digital twin" visualization within the 3D lab, where a virtual greenhouse model displays data streamed in real-time from the physical hardware.
*   **Documentation & Content:**
    *   Write the first set of user-facing documentation for connecting the hardware and running the greenhouse project.

### Phase 4: Advanced Experiments & Deeper Integration (Months 6-8)

**Goal:** Expand the content and deepen the integration between the virtual and physical worlds.

*   **Physics Circuit Experiment:**
    *   Implement the "Electric Circuits and Ohm's Law" experiment from the original 3D Lab PRD.
    *   Model and import the circuit components (resistors, LEDs, wires, breadboard).
    *   Develop the circuit simulation engine to calculate voltage and current.
*   **Advanced IoT Projects:**
    *   Implement the software side of the "Home Energy Monitor" and "Air Quality Monitoring Network" projects.
    *   Add the corresponding blocks to the Blockly editor and create the virtual dashboard visualizations for this data.
*   **Bidirectional Data Flow:**
    *   Enhance the digital twin integration. Example: A virtual button in the 3D lab can send a command via the web app to the physical IoT kit to turn on an LED.
*   **Data Persistence & User Accounts:**
    *   Implement a basic user account system.
    *   Save user-created IoT programs and experiment results to our database via Prisma.

### Phase 5: Pilot Testing & Commercial Readiness (Months 8-10)

**Goal:** Refine the product based on user feedback, ensure stability, and prepare for the pilot test and subsequent commercial launch.

*   **Pilot Partner Feedback:**
    *   Work with a partner school to gather feedback on all aspects of the application.
    *   Iterate on UI/UX, experiment flows, and IoT project instructions based on real-world usage.
*   **Assessment & Analytics:**
    *   Build the teacher dashboard for viewing student progress and assessment results.
    *   Implement the formative and summative assessment features described in the PRDs.
*   **Performance & Optimization:**
    *   Optimize 3D asset sizes and rendering performance to ensure the application runs smoothly on a wide range of devices.
    *   Refine the hardware communication protocol for reliability and speed.
*   **Final Polish:**
    *   Conduct a full design review, polish all animations and interactions, and ensure all content is professionally written and error-free.
    *   Prepare marketing materials, support documentation, and the teacher resources needed for a commercial launch.
