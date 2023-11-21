import * as THREE from 'three';

/*
 * parameters = {
 *  size: { width: number, height: number, depth: number },
 *  segments: { width: number, height: number, depth: number },
 *  primaryColor: string,
 *  maps: {
 *    color: { url: string },
 *    ao: { url: string, intensity: number },
 *    displacement: { url: string, scale: number, bias: number },
 *    normal: { url: string, type: number, scale: { x: number, y: number } },
 *    bump: { url: string, scale: number },
 *    roughness: { url: string, rough: number }
 *  },
 *  wrapS: number,
 *  wrapT: number,
 *  repeat: { u: number, v: number },
 *  magFilter: number,
 *  minFilter: number,
 *  secondaryColor: string
 * }
 */

export default class Ground {
  constructor(parameters) {
    for (const [key, value] of Object.entries(parameters)) {
      this[key] = value;
    }

    // Create a texture
    const texture = new THREE.TextureLoader().load(this.maps.color.url);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = this.wrapS;
    texture.wrapT = this.wrapT;
    texture.repeat.set(this.repeat.u, this.repeat.v);
    texture.magFilter = this.magFilter;
    texture.minFilter = this.minFilter;

    // Create an AO map if provided
    let aoMap = null;
    if (this.maps.ao.url) {
      aoMap = new THREE.TextureLoader().load(this.maps.ao.url);
      aoMap.wrapS = this.wrapS;
      aoMap.wrapT = this.wrapT;
      aoMap.repeat.set(this.repeat.u, this.repeat.v);
    }

    // Create a displacement map if provided
    let displacementMap = null;
    if (this.maps.displacement.url) {
      displacementMap = new THREE.TextureLoader().load(this.maps.displacement.url);
      displacementMap.wrapS = this.wrapS;
      displacementMap.wrapT = this.wrapT;
      displacementMap.repeat.set(this.repeat.u, this.repeat.v);
    }

    // Create a normal map if provided
    let normalMap = null;
    if (this.maps.normal.url) {
      normalMap = new THREE.TextureLoader().load(this.maps.normal.url);
      normalMap.wrapS = this.wrapS;
      normalMap.wrapT = this.wrapT;
      normalMap.repeat.set(this.repeat.u, this.repeat.v);
    }

    // Create a roughness map if provided
    let roughnessMap = null;
    if (this.maps.roughness.url) {
      roughnessMap = new THREE.TextureLoader().load(this.maps.roughness.url);
      roughnessMap.wrapS = this.wrapS;
      roughnessMap.wrapT = this.wrapT;
      roughnessMap.repeat.set(this.repeat.u, this.repeat.v);
    }

    // Create a ground box that receives shadows but does not cast them
    const geometry = new THREE.PlaneGeometry(this.size.width, this.size.height);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(this.primaryColor),
      map: texture,
      aoMap: aoMap,
      displacementMap: displacementMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
    });

    this.object = new THREE.Mesh(geometry, material);
    this.object.rotation.x = -Math.PI / 2.0;
    this.object.castShadow = false;
    this.object.receiveShadow = true;
  }
}
