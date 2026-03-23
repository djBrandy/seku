import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { CameraController } from '../utils/CameraController';

interface SceneContainerProps {
  onSceneInit?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: Renderer) => void;
  onUpdate?: (delta: number) => void;
  onSelect?: (object: THREE.Object3D | null) => void;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({ onSceneInit, onUpdate, onSelect }) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<Renderer>();
  const cameraControllerRef = useRef<CameraController>();
  const raycaster = useRef(new THREE.Raycaster());

  const onContextCreate = async (gl: any) => {
    // monkey patch dis thing cuz it keeps crashing lol
    gl.renderbufferStorageMultisample = () => {};
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 10);
    cameraRef.current = camera;

    // Camera Controller setup
    cameraControllerRef.current = new CameraController(camera);

    // Renderer setup - using base WebGLRenderer to be super sure about props
    const renderer = new THREE.WebGLRenderer({
      canvas: {
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight,
        style: {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      } as any,
      context: gl,
      antialias: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(gl.pixelRatio || 1);
    rendererRef.current = renderer as any;

    // Initial scene setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    if (onSceneInit) {
      onSceneInit(scene, camera, renderer);
    }

    // Animation loop
    const render = (time: number) => {
      requestRef.current = requestAnimationFrame(render);
      
      if (previousTimeRef.current !== undefined) {
        const delta = (time - previousTimeRef.current) / 1000;
        if (onUpdate) onUpdate(delta);
      }
      previousTimeRef.current = time;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    requestRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (cameraControllerRef.current) {
        if (event.numberOfPointers === 1) {
          cameraControllerRef.current.orbit(event.changeX, event.changeY);
        } else if (event.numberOfPointers === 2) {
          cameraControllerRef.current.pan(event.changeX, event.changeY);
        }
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      if (cameraControllerRef.current) {
        cameraControllerRef.current.zoom(event.scaleChange);
      }
    });

  const tapGesture = Gesture.Tap()
    .onEnd((event) => {
      if (cameraRef.current && sceneRef.current && onSelect) {
        const { x, y } = event;
        const { width, height } = Dimensions.get('window');
        
        // Normalize touch coordinates to (-1 to +1) range for Three.js raycasting
        const mouse = new THREE.Vector2(
          (x / width) * 2 - 1,
          -(y / height) * 2 + 1
        );

        raycaster.current.setFromCamera(mouse, cameraRef.current);
        const intersects = raycaster.current.intersectObjects(sceneRef.current.children, true);

        if (intersects.length > 0) {
          onSelect(intersects[0].object);
        } else {
          onSelect(null);
        }
      }
    });

  const gestures = Gesture.Simultaneous(panGesture, pinchGesture, tapGesture);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gestures}>
        <GLView 
          style={styles.glView} 
          onContextCreate={onContextCreate} 
          msaaSamples={0}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
});
