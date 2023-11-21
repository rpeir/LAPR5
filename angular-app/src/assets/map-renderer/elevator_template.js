import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Elevator {
  constructor(parameters) {
    this.onLoad = function(description) {
      this.object = description.scene;
      this.animations = description.animations;

      // Turn on shadows for this object
      this.setShadow(this.object);

      // Get the object's axis-aligned bounding box (AABB) in 3D space
      const box = new THREE.Box3();
      box.setFromObject(this.object); // This function may result in a larger box than strictly necessary: https://threejs.org/docs/#api/en/math/Box3.setFromObject

      // Compute the object size
      const size = new THREE.Vector3();
      box.getSize(size);

      // Adjust the object's oversized dimensions (hard-coded; see previous comments)
      size.x = 3.0;
      size.y = 4.4;
      size.z = 2.6;

      this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
      this.loaded = true;
    };
  }
  setShadow(object) {
    /* To-do #37 - Set the object and descendants to cast shadows but not receive them*/
    object.traverseVisible(function(child) {
      // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
      if (child instanceof THREE.Object3D) {
        child.castShadow = true;
        child.receiveShadow = false;
      }
    });
  }
}
