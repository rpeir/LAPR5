import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OBB } from 'three/addons/math/OBB.js';
import { merge } from './merge.js';
import Ground from './ground.js';
import Wall from './wall.js';

/*
 * parameters = {
 *  mazeDescription: Object
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 */

const normalMapTypes = [THREE.TangentSpaceNormalMap, THREE.ObjectSpaceNormalMap];
const wrappingModes = [THREE.ClampToEdgeWrapping, THREE.RepeatWrapping, THREE.MirroredRepeatWrapping];
const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
const minificationFilters = [
  THREE.NearestFilter,
  THREE.NearestMipmapNearestFilter,
  THREE.NearestMipmapLinearFilter,
  THREE.LinearFilter,
  THREE.LinearMipmapNearestFilter,
  THREE.LinearMipmapLinearFilter,
];

export default class Maze extends THREE.Group {
  constructor(parameters) {
    super();
    merge(this, parameters);
    this.loaded = false;
    this.exitLocation = [];
    this.doors = [];

    this.onLoad = function(description) {
      this.loadMap(description);
    };
    const onProgress = function(url, xhr) {
      console.log("Resource '" + url + "' " + ((100.0 * xhr.loaded) / xhr.total).toFixed(0) + '% loaded.');
    };

    const onError = function(url, error) {
      console.error("Error loading resource '" + url + "' (" + error + ').');
    };

    // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
    THREE.Cache.enabled = true;

    const loader = new THREE.FileLoader();

    // Set the response type: the resource file will be parsed with JSON.parse()
    loader.setResponseType('json');

    // Load a maze description resource file
    loader.load(
      //Resource URL
      this.url,

      // onLoad callback
      description => this.onLoad(description),

      // onProgress callback
      xhr => onProgress(this.url, xhr),

      // onError callback
      error => onError(this.url, error),
    );
  }
  // Functions to set mazes parameters to be called by constructor

  // Store the maze's size, map and exit location
  setSizeMapExit(floorMap) {
    this.size = floorMap.maze.size;
    this.halfSize = { width: this.size.width / 2.0, depth: this.size.depth / 2.0 };
    this.map = floorMap.maze.map;
    floorMap.maze.exitLocation.forEach(element => {
      this.exitLocation.push(element);
    });
  }
  // Create the ground
  setGround(floorMap) {
    const ground = new Ground({
      size: new THREE.Vector3(floorMap.ground.size.width, floorMap.ground.size.height, floorMap.ground.size.depth),
      segments: new THREE.Vector3(
        floorMap.ground.segments.width,
        floorMap.ground.segments.height,
        floorMap.ground.segments.depth,
      ),
      materialParameters: {
        color: new THREE.Color(parseInt(floorMap.ground.primaryColor, 16)),
        mapUrl: floorMap.ground.maps.color.url,
        aoMapUrl: floorMap.ground.maps.ao.url,
        aoMapIntensity: floorMap.ground.maps.ao.intensity,
        displacementMapUrl: floorMap.ground.maps.displacement.url,
        displacementScale: floorMap.ground.maps.displacement.scale,
        displacementBias: floorMap.ground.maps.displacement.bias,
        normalMapUrl: floorMap.ground.maps.normal.url,
        normalMapType: normalMapTypes[floorMap.ground.maps.normal._type],
        normalScale: new THREE.Vector2(floorMap.ground.maps.normal.scale.x, floorMap.ground.maps.normal.scale.y),
        bumpMapUrl: floorMap.ground.maps.bump.url,
        bumpScale: floorMap.ground.maps.bump.scale,
        roughnessMapUrl: floorMap.ground.maps.roughness.url,
        roughness: floorMap.ground.maps.roughness.rough,
        wrapS: wrappingModes[floorMap.ground.wrapS],
        wrapT: wrappingModes[floorMap.ground.wrapT],
        repeat: new THREE.Vector2(floorMap.ground.repeat.u, floorMap.ground.repeat.v),
        magFilter: magnificationFilters[floorMap.ground.magFilter],
        minFilter: minificationFilters[floorMap.ground.minFilter],
      },
      secondaryColor: new THREE.Color(parseInt(floorMap.ground.secondaryColor, 16)),
    });
    ground.name = 'ground';
    this.add(ground);
  }
  setDoors() {
    const textureLoader = new THREE.TextureLoader();
    const baseColorTexture = textureLoader.load('./assets/map-renderer/textures/door/Wood_023_basecolor.jpg');
    const roughnessTexture = textureLoader.load('./assets/map-renderer/textures/door/Wood_023_roughness.jpg');
    const normalTexture = textureLoader.load('./assets/map-renderer/textures/door/Wood_023_normal.jpg');
    const aoTexture = textureLoader.load('./assets/map-renderer/textures/door/Wood_023_ambientOcclusion.jpg');

    baseColorTexture.repeat.set(2, 2); // Adjust as needed
    baseColorTexture.wrapS = THREE.RepeatWrapping;
    baseColorTexture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshStandardMaterial({
      map: baseColorTexture,
      roughnessMap: roughnessTexture,
      roughness: 1,
      normalMap: normalTexture,
      metalness: 0.25,
      aoMap: aoTexture,
    });

    //material.side = THREE.DoubleSide;
    const geometry = new THREE.BoxGeometry(1, 0.5, 0.05);
    const cube = new THREE.Mesh(geometry, material);
    this.door = cube;
  }

  // Create a wall
  setWall(floorMap) {
    this.wall = new Wall({
      groundHeight: floorMap.ground.size.height,
      segments: new THREE.Vector2(floorMap.wall.segments.width, floorMap.wall.segments.height),
      materialParameters: {
        color: new THREE.Color(parseInt(floorMap.wall.primaryColor, 16)),
        mapUrl: floorMap.wall.maps.color.url,
        aoMapUrl: floorMap.wall.maps.ao.url,
        aoMapIntensity: floorMap.wall.maps.ao.intensity,
        displacementMapUrl: floorMap.wall.maps.displacement.url,
        displacementScale: floorMap.wall.maps.displacement.scale,
        displacementBias: floorMap.wall.maps.displacement.bias,
        normalMapUrl: floorMap.wall.maps.normal.url,
        normalMapType: normalMapTypes[floorMap.wall.maps.normal._type],
        normalScale: new THREE.Vector2(floorMap.wall.maps.normal.scale.x, floorMap.wall.maps.normal.scale.y),
        bumpMapUrl: floorMap.wall.maps.bump.url,
        bumpScale: floorMap.wall.maps.bump.scale,
        roughnessMapUrl: floorMap.wall.maps.roughness.url,
        roughness: floorMap.wall.maps.roughness.rough,
        wrapS: wrappingModes[floorMap.wall.wrapS],
        wrapT: wrappingModes[floorMap.wall.wrapT],
        repeat: new THREE.Vector2(floorMap.wall.repeat.u, floorMap.wall.repeat.v),
        magFilter: magnificationFilters[floorMap.wall.magFilter],
        minFilter: minificationFilters[floorMap.wall.minFilter],
      },
      secondaryColor: new THREE.Color(parseInt(floorMap.wall.secondaryColor, 16)),
    });
    this.wall.name = 'wall';
  }

  setElevators(floorMap) {
    if (!floorMap.maze.elevators) {
      return;
    }
    const textureLoader = new THREE.TextureLoader();
    const baseColorTexture = textureLoader.load('./assets/map-renderer/textures/metal/Metal_006_basecolor.jpg');
    const roughnessTexture = textureLoader.load('./assets/map-renderer/textures/metal/Metal_006_roughness.jpg');
    const normalTexture = textureLoader.load('./assets/map-renderer/textures/metal/Metal_006_normal.jpg');
    const aoTexture = textureLoader.load('./assets/map-renderer/textures/metal/Metal_006_ambientOcclusion.jpg');

    baseColorTexture.repeat.set(2, 2); // Adjust as needed
    baseColorTexture.wrapS = THREE.RepeatWrapping;
    baseColorTexture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshStandardMaterial({
      map: baseColorTexture,
      roughnessMap: roughnessTexture,
      roughness: 1,
      normalMap: normalTexture,
      metalness: 0.25,
      aoMap: aoTexture,
    });

    //material.side = THREE.DoubleSide;
    const geometry = new THREE.BoxGeometry(1.9, 0.5, 1.9);
    const cube = new THREE.Mesh(geometry, material);
    this.elevatorLocation = floorMap.maze.elevators;
    let elevatorCartesian = this.cellToCartesian(this.elevatorLocation);
    cube.position.set(elevatorCartesian.x + 0.5, 0.25, elevatorCartesian.z + 0.5);
    cube.castShadow = true;
    cube.receiveShadow = true;
    this.add(cube);
  }

  // Store the player's initial position and direction
  setInitialPlayerPosition(floorMap) {
    this.initialPosition = this.cellToCartesian(floorMap.player.initialPosition);
    this.initialDirection = floorMap.player.initialDirection;
  }

  // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
  cellToCartesian(position) {
    return new THREE.Vector3(
      (position[1] - this.halfSize.width + 0.5) * this.scale.x,
      0.0,
      (position[0] - this.halfSize.depth + 0.5) * this.scale.z,
    );
  }

  // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
  cartesianToCell(position) {
    return [
      Math.floor(position.z / this.scale.z + this.halfSize.depth),
      Math.floor(position.x / this.scale.x + this.halfSize.width),
    ];
  }

  // Detect collision with corners (method: BC/AABB)
  cornerCollision(indices, offsets, orientation, position, delta, radius, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (!this.map[row] || !this.map[row][column]) {
      return false;
    }
    if (this.map[row][column] === 2 - orientation || this.map[row][column] === 3) {
      const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
      const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
      if (x * x + z * z < radius * radius) {
        console.log('Collision with ' + name + '.');
        return true;
      }
    }
    return false;
  }

  // Detect collision with walls (method: BC/AABB)
  wallCollision(indices, offsets, orientation, position, delta, radius, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (!this.map[row] || !this.map[row][column]) {
      return false;
    }
    if (this.map[row][column] === 2 - orientation || this.map[row][column] === 3) {
      if (orientation !== 0) {
        if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
          console.log('Collision with ' + name + '.');
          return true;
        }
      } else {
        if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
          console.log('Collision with ' + name + '.');
          return true;
        }
      }
    }
    return false;
  }

  // Detect collision with walls and corners (method: OBB/AABB)
  wallAndCornerCollision(indices, offsets, orientation, obb, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (!this.map[row] || !this.map[row][column]) {
      return false;
    }
    if (this.map[row][column] === 2 - orientation || this.map[row][column] === 3) {
      if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
        console.log('Collision with ' + name + '.');
        return true;
      }
    }
    return false;
  }

  // Detect collisions
  collisionWithWall(method, position, halfSize, direction) {
    const indices = this.cartesianToCell(position);
    if (method !== 'obb-aabb') {
      if (
        this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, 'north wall') || // Collision with north wall
        this.wallCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, 'west wall') || // Collision with west wall
        this.wallCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, 'south wall') || // Collision with south wall
        this.wallCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, 'east wall') || // Collision with east wall
        this.cornerCollision(
          indices,
          [1, 0],
          1,
          position,
          { x: -0.475, z: -0.5 },
          halfSize,
          'southwest corner (NS-oriented wall)',
        ) || // Collision with southwest corner (NS-oriented wall)
        this.cornerCollision(
          indices,
          [1, 1],
          0,
          position,
          { x: -0.5, z: -0.525 },
          halfSize,
          'southeast corner (WE-oriented wall)',
        ) || // Collision with southeast corner (WE-oriented wall)
        this.cornerCollision(
          indices,
          [1, 1],
          1,
          position,
          { x: -0.525, z: -0.5 },
          halfSize,
          'southeast corner (NS-oriented wall)',
        ) || // Collision with southeast corner (NS-oriented wall)
        this.cornerCollision(
          indices,
          [0, 1],
          0,
          position,
          { x: -0.5, z: -0.475 },
          halfSize,
          'northeast corner (WE-oriented wall)',
        ) || // Collision with northeast corner (WE-oriented wall)
        (indices[0] > 0 &&
          (this.cornerCollision(
            indices,
            [-1, 1],
            1,
            position,
            { x: -0.525, z: 0.5 },
            halfSize,
            'northeast corner (NS-oriented wall)',
          ) || // Collision with northeast corner (NS-oriented wall)
            this.cornerCollision(
              indices,
              [-1, 0],
              1,
              position,
              { x: -0.475, z: 0.5 },
              halfSize,
              'northwest corner (NS-oriented wall)',
            ))) || // Collision with northwest corner (NS-oriented wall)
        (indices[1] > 0 &&
          (this.cornerCollision(
            indices,
            [0, -1],
            0,
            position,
            { x: 0.5, z: -0.475 },
            halfSize,
            'northwest corner (WE-oriented wall)',
          ) || // Collision with northwest corner (WE-oriented wall)
            this.cornerCollision(
              indices,
              [1, -1],
              0,
              position,
              { x: 0.5, z: -0.525 },
              halfSize,
              'southwest corner (WE-oriented wall)',
            ))) // Collision with southwest corner (WE-oriented wall)
      ) {
        return true;
      }
      // No collision
      return false;
    } else {
      // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
      const obb = new OBB(position, halfSize);
      obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
      if (
        this.wallAndCornerCollision(indices, [0, 0], 0, obb, 'north wall') || // Collision with north wall
        this.wallAndCornerCollision(indices, [0, 0], 1, obb, 'west wall') || // Collision with west wall
        this.wallAndCornerCollision(indices, [1, 0], 0, obb, 'south wall') || // Collision with south wall
        this.wallAndCornerCollision(indices, [0, 1], 1, obb, 'east wall') || // Collision with east wall
        this.wallAndCornerCollision(indices, [1, 0], 1, obb, 'southwest corner (NS-oriented wall)') || // Collision with southwest corner (NS-oriented wall)
        this.wallAndCornerCollision(indices, [1, 1], 0, obb, 'southeast corner (WE-oriented wall)') || // Collision with southeast corner (WE-oriented wall)
        this.wallAndCornerCollision(indices, [1, 1], 1, obb, 'southeast corner (NS-oriented wall)') || // Collision with southeast corner (NS-oriented wall)
        this.wallAndCornerCollision(indices, [0, 1], 0, obb, 'northeast corner (WE-oriented wall)') || // Collision with northeast corner (WE-oriented wall)
        (indices[0] > 0 &&
          (this.wallAndCornerCollision(indices, [-1, 1], 1, obb, 'northeast corner (NS-oriented wall)') || // Collision with northeast corner (NS-oriented wall)
            this.wallAndCornerCollision(indices, [-1, 0], 1, obb, 'northwest corner (NS-oriented wall)'))) || // Collision with northwest corner (NS-oriented wall)
        (indices[1] > 0 &&
          (this.wallAndCornerCollision(indices, [0, -1], 0, obb, 'northwest corner (WE-oriented wall)') || // Collision with northwest corner (WE-oriented wall)
            this.wallAndCornerCollision(indices, [1, -1], 0, obb, 'southwest corner (WE-oriented wall)'))) // Collision with southwest corner (WE-oriented wall)
      ) {
        return true;
      }
      // No collision
      return false;
    }
  }

  // DONE - Detect collision with corners doors (method: BC/AABB)
  doorCornerCollision(indices, offsets, orientation, position, delta, radius, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (!this.map[row] || !this.map[row][column]) {
      return false;
    }
    if (this.map[row][column] === 5 - orientation || this.map[row][column] === 6) {
      const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
      const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
      if (x * x + z * z < radius * radius) {
        return true;
      }
    }
    return false;
  }

  // DONE - Detect collision with doors (method: BC/AABB)
  doorCollision(indices, offsets, orientation, position, delta, radius, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (!this.map[row] || !this.map[row][column]) {
      return false;
    }
    if (this.map[row][column] === 5 - orientation || this.map[row][column] === 6) {
      if (orientation !== 0) {
        if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
          return true;
        }
      } else {
        if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
          return true;
        }
      }
    }
    return false;
  }

  // DONE - Detect collision with doors (method: OBB/AABB)
  doorAndCornerCollision(indices, offsets, orientation, obb, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (!this.map[row] || !this.map[row][column]) {
      return false;
    }
    if (this.map[row][column] === 5 - orientation || this.map[row][column] === 6) {
      if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
        return true;
      }
    }
    return false;
  }

  // DONE - Detect collisions with doors
  collisionWithDoor(method, position, halfSize, direction) {
    const indices = this.cartesianToCell(position);
    if (method !== 'obb-aabb') {
      if (
        this.doorCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, 'north door') || // Collision with north wall
        this.doorCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, 'west door') || // Collision with west wall
        this.doorCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, 'south door') || // Collision with south wall
        this.doorCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, 'east door') || // Collision with east wall
        this.doorCornerCollision(
          indices,
          [1, 0],
          1,
          position,
          { x: -0.475, z: -0.5 },
          halfSize,
          'southwest corner (NS-oriented door)',
        ) || // Collision with southwest corner (NS-oriented door)
        this.doorCornerCollision(
          indices,
          [1, 1],
          0,
          position,
          { x: -0.5, z: -0.525 },
          halfSize,
          'southeast corner (WE-oriented door)',
        ) || // Collision with southeast corner (WE-oriented door)
        this.doorCornerCollision(
          indices,
          [1, 1],
          1,
          position,
          { x: -0.525, z: -0.5 },
          halfSize,
          'southeast corner (NS-oriented door)',
        ) || // Collision with southeast corner (NS-oriented door)
        this.doorCornerCollision(
          indices,
          [0, 1],
          0,
          position,
          { x: -0.5, z: -0.475 },
          halfSize,
          'northeast corner (WE-oriented door)',
        ) || // Collision with northeast corner (WE-oriented door)
        (indices[0] > 0 &&
          (this.doorCornerCollision(
            indices,
            [-1, 1],
            1,
            position,
            { x: -0.525, z: 0.5 },
            halfSize,
            'northeast corner (NS-oriented door)',
          ) || // Collision with northeast corner (NS-oriented door)
            this.doorCornerCollision(
              indices,
              [-1, 0],
              1,
              position,
              { x: -0.475, z: 0.5 },
              halfSize,
              'northwest corner (NS-oriented door)',
            ))) || // Collision with northwest corner (NS-oriented door)
        (indices[1] > 0 &&
          (this.doorCornerCollision(
            indices,
            [0, -1],
            0,
            position,
            { x: 0.5, z: -0.475 },
            halfSize,
            'northwest corner (WE-oriented door)',
          ) || // Collision with northwest corner (WE-oriented door)
            this.doorCornerCollision(
              indices,
              [1, -1],
              0,
              position,
              { x: 0.5, z: -0.525 },
              halfSize,
              'southwest corner (WE-oriented door)',
            ))) // Collision with southwest corner (WE-oriented door)
      ) {
        return true;
      }
      // No collision
      return false;
    } else {
      // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
      const obb = new OBB(position, halfSize);
      obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
      if (
        this.doorAndCornerCollision(indices, [0, 0], 0, obb, 'north door') || // Collision with north door
        this.doorAndCornerCollision(indices, [0, 0], 1, obb, 'west door') || // Collision with west door
        this.doorAndCornerCollision(indices, [1, 0], 0, obb, 'south door') || // Collision with south door
        this.doorAndCornerCollision(indices, [0, 1], 1, obb, 'east door') || // Collision with east door
        this.doorAndCornerCollision(indices, [1, 0], 1, obb, 'southwest corner (NS-oriented door)') || // Collision with southwest corner (NS-oriented door)
        this.doorAndCornerCollision(indices, [1, 1], 0, obb, 'southeast corner (WE-oriented door)') || // Collision with southeast corner (WE-oriented door)
        this.doorAndCornerCollision(indices, [1, 1], 1, obb, 'southeast corner (NS-oriented door)') || // Collision with southeast corner (NS-oriented door)
        this.doorAndCornerCollision(indices, [0, 1], 0, obb, 'northeast corner (WE-oriented door)') || // Collision with northeast corner (WE-oriented door)
        (indices[0] > 0 &&
          (this.doorAndCornerCollision(indices, [-1, 1], 1, obb, 'northeast corner (NS-oriented door)') || // Collision with northeast corner (NS-oriented door)
            this.doorAndCornerCollision(indices, [-1, 0], 1, obb, 'northwest corner (NS-oriented door)'))) || // Collision with northwest corner (NS-oriented door)
        (indices[1] > 0 &&
          (this.doorAndCornerCollision(indices, [0, -1], 0, obb, 'northwest corner (WE-oriented door)') || // Collision with northwest corner (WE-oriented door)
            this.doorAndCornerCollision(indices, [1, -1], 0, obb, 'southwest corner (WE-oriented door)'))) // Collision with southwest corner (WE-oriented door)
      ) {
        return true;
      }
      // No collision
      return false;
    }
  }

  loadMap(description) {
    this.doors = [];
    // Store the maze's size, map and exit location
    this.setSizeMapExit(description);

    // Create the helpers
    this.helper = new THREE.Group();

    // Create the ground
    this.setGround(description);

    // Create a wall
    this.setWall(description);

    // Create door
    this.setDoors();

    // Create elevators
    this.setElevators(description);

    // Build the maze
    let geometry;
    let geometries = [];
    geometries[0] = [];
    geometries[1] = [];
    this.aabb = [];
    for (let i = 0; i <= this.size.depth; i++) {
      // In order to represent the southmost walls, the map depth is one row greater than the actual maze depth
      this.aabb[i] = [];
      for (let j = 0; j <= this.size.width; j++) {
        // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
        this.aabb[i][j] = [];
        /*
         *  this.map[][] | North wall | West wall
         * --------------+------------+-----------
         *       0       |     No     |     No
         *       1       |     No     |    Yes
         *       2       |    Yes     |     No
         *       3       |    Yes     |    Yes
         */
        if (this.map[i][j] === 2 || this.map[i][j] === 3) {
          this.aabb[i][j][0] = new THREE.Box3();
          for (let k = 0; k < 2; k++) {
            geometry = this.wall.geometries[k].clone();
            geometry.applyMatrix4(
              new THREE.Matrix4().makeTranslation(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth),
            );
            geometry.computeBoundingBox();
            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
            geometries[k].push(geometry);
            this.aabb[i][j][0].union(geometry.boundingBox);
          }
          this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
        }
        if (this.map[i][j] === 1 || this.map[i][j] === 3) {
          this.aabb[i][j][1] = new THREE.Box3();
          for (let k = 0; k < 2; k++) {
            geometry = this.wall.geometries[k].clone();
            geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
            geometry.applyMatrix4(
              new THREE.Matrix4().makeTranslation(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5),
            );
            geometry.computeBoundingBox();
            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
            geometries[k].push(geometry);
            this.aabb[i][j][1].union(geometry.boundingBox);
          }
          this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
        }
        // doors west
        if (this.map[i][j] === 4) {
          this.aabb[i][j][1] = new THREE.Box3();
          // Clone the door geometry and material
          const newDoorGeometry = this.door.geometry.clone();
          const newDoorMaterial = this.door.material.clone();

          // Create a new door mesh using the cloned geometry and material
          const newDoorMesh = new THREE.Mesh(newDoorGeometry, newDoorMaterial);
          newDoorMesh.castShadow = true;
          newDoorMesh.receiveShadow = true;

          // Rotate the door first
          newDoorMesh.rotation.set(0, Math.PI / 2.0, 0);
          // Place the door in position
          newDoorMesh.position.set(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5);

          // Compute and update the bounding box
          const boundingBox = new THREE.Box3().setFromObject(newDoorMesh);

          // Update the AABB for the door
          this.aabb[i][j][1].union(boundingBox);

          // Add a Box3Helper for visualization (optional)
          this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));

          // Store the door mesh in the 'doors' array and add it to the scene
          this.doors.push(newDoorMesh);
          this.add(newDoorMesh);
        }
        // doors north
        if (this.map[i][j] === 5) {
          this.aabb[i][j][0] = new THREE.Box3();

          // Clone the door geometry and material
          const newDoorGeometry = this.door.geometry.clone();
          const newDoorMaterial = this.door.material.clone();

          // Create a new door mesh using the cloned geometry and material
          const newDoorMesh = new THREE.Mesh(newDoorGeometry, newDoorMaterial);
          newDoorMesh.castShadow = true;
          newDoorMesh.receiveShadow = true;

          // Place the door in position
          newDoorMesh.position.set(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth);

          // Compute and update the bounding box
          const boundingBox = new THREE.Box3().setFromObject(newDoorMesh);

          // Update the AABB for the door
          this.aabb[i][j][0].union(boundingBox);

          // Add a Box3Helper for visualization (optional)
          this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));

          // Store the door mesh in the 'doors' array and add it to the scene
          this.doors.push(newDoorMesh);
          this.add(newDoorMesh);
        }
      }
    }
    let mergedGeometry, mesh;
    for (let i = 0; i < 2; i++) {
      mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries[i], false);
      mesh = new THREE.Mesh(mergedGeometry, this.wall.materials[i]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = 'wallmesh';
      this.add(mesh);
    }

    // Store the player's initial position and direction
    this.setInitialPlayerPosition(description);

    this.loaded = true;
  }
  closestExitLocation(position) {
    let closest = 0;
    let closestDistance = 100000000;
    let distance;
    for (let i = 0; i < this.exitLocation.length; i++) {
      distance = this.cellToCartesian(this.exitLocation[i].location).distanceTo(position);
      if (distance < closestDistance) {
        closest = i;
        closestDistance = distance;
      }
    }
    return this.exitLocation[closest];
  }

  openClosestDoor(position) {
    let closest = 0;
    let closestDistance = 100000000;
    let distance;
    for (let i = 0; i < this.doors.length; i++) {
      distance = this.doors[i].position.distanceTo(position);
      if (distance < closestDistance) {
        closest = i;
        closestDistance = distance;
      }
    }
    let rotationPoint = this.doors[closest].position;
    rotationPoint.x -= 0.5;
    rotationPoint.z -= 0.5;
    //rotate door
    this.waitTime(3).then(() => {
      this.rotateAboutPoint(this.doors[closest], rotationPoint, new THREE.Vector3(0, 1, 0), Math.PI / 2);
      this.waitTime(1500).then(() => {
        rotationPoint.x += 0.5;
        rotationPoint.z += 0.5;
        this.rotateAboutPoint(this.doors[closest], rotationPoint, new THREE.Vector3(0, 1, 0), -Math.PI / 2);
      });
    });
    return false;
  }
  rotateAboutPoint(obj, pivot, axis, theta) {
    // Define the translation vector
    let translationVector = new THREE.Vector3().subVectors(obj.position, pivot);

    // Rotate the object
    obj.rotateOnAxis(axis, theta);

    // Apply the translation back to the object
    obj.position.addVectors(pivot, translationVector.applyAxisAngle(axis, theta));
  }

  waitTime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
