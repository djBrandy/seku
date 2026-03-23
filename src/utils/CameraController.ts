import * as THREE from 'three';

export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private target: THREE.Vector3;
  private radius: number;
  private phi: number; // Vertical angle (azimuth)
  private theta: number; // Horizontal angle (elevation)

  constructor(camera: THREE.PerspectiveCamera, target = new THREE.Vector3(0, 0, 0)) {
    this.camera = camera;
    this.target = target;
    
    // Initial polar coordinates from camera position
    const offset = new THREE.Vector3().subVectors(camera.position, target);
    this.radius = offset.length();
    this.theta = Math.atan2(offset.x, offset.z);
    this.phi = Math.acos(Math.min(Math.max(offset.y / this.radius, -1), 1));
    
    this.updateCameraPosition();
  }

  public orbit(deltaX: number, deltaY: number) {
    const sensitivity = 0.005;
    this.theta -= deltaX * sensitivity;
    this.phi -= deltaY * sensitivity;
    
    // Constrain phi to avoid flipping
    this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi));
    
    this.updateCameraPosition();
  }

  public zoom(scale: number) {
    this.radius /= scale;
    this.radius = Math.max(1, Math.min(50, this.radius));
    this.updateCameraPosition();
  }

  public pan(deltaX: number, deltaY: number) {
    const sensitivity = 0.01;
    
    // Create local coordinate system for panning
    const forward = new THREE.Vector3().subVectors(this.target, this.camera.position).normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(right, forward).normalize();
    
    const panOffset = new THREE.Vector3()
      .addScaledVector(right, -deltaX * sensitivity)
      .addScaledVector(up, deltaY * sensitivity);
      
    this.camera.position.add(panOffset);
    this.target.add(panOffset);
  }

  private updateCameraPosition() {
    this.camera.position.x = this.target.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    this.camera.position.y = this.target.y + this.radius * Math.cos(this.phi);
    this.camera.position.z = this.target.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.lookAt(this.target);
  }
}
