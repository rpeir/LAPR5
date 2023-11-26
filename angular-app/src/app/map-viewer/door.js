import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Door extends THREE.Group {
  constructor(parameters) {
    super();
    this.position.copy(parameters.position || new THREE.Vector3());
    this.rotation.copy(parameters.rotation || new THREE.Euler());
    this.scale.copy(parameters.scale || new THREE.Vector3(1, 1, 1));

    this.loadModel(parameters.modelUrl);
  }

  loadModel(modelUrl) {
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      gltf => {
        const doorModel = gltf.scene;
        doorModel.position.copy(this.position);
        doorModel.rotation.copy(this.rotation);
        doorModel.scale.copy(this.scale);

        this.add(doorModel);
      },
      undefined,
      error => {
        console.error(`Error loading door model: ${error}`);
      },
    );
  }
}
