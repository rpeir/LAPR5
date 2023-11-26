// [ELEVATOR MODEL ATTRIBUTION] Elevator by Poly by Google [CC-BY] via Poly Pizza

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Elevator extends THREE.Group {
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
        const elevatorModel = gltf.scene;
        elevatorModel.position.copy(this.position);
        elevatorModel.rotation.copy(this.rotation);
        elevatorModel.scale.copy(this.scale);
        this.add(elevatorModel);
      },
      undefined,
      error => {
        console.error(`Error loading elevator model: ${error}`);
      },
    );
  }
}
