import * as THREE from 'three';
import Ground from './ground_template.js';
import Wall from './wall_template.js';

export default class Maze {
  constructor(parameters) {
    this.onLoad = function(description) {
      this.map = description.maze.map;
      this.size = description.maze.size;
      this.initialPosition = this.cellToCartesian(description.player.initialPosition);
      this.initialDirection = description.player.initialDirection;
      this.exitLocation = this.cellToCartesian(description.maze.exitLocation);

      this.object = new THREE.Group();

      // Create the ground
      this.ground = new Ground({
        textureUrl: description.ground.maps.color.url,
        aoUrl: description.ground.maps.ao.url,
        displacementUrl: description.ground.maps.displacement.url,
        normalUrl: description.ground.maps.normal.url,
        bumpUrl: description.ground.maps.bump.url,
        roughnessUrl: description.ground.maps.roughness.url,
        size: this.size,
        wrapS: description.ground.wrapS,
        wrapT: description.ground.wrapT,
        repeat: description.ground.repeat,
        magFilter: description.ground.magFilter,
        minFilter: description.ground.minFilter,
        primaryColor: description.ground.primaryColor,
        secondaryColor: description.ground.secondaryColor,
      });
      this.object.add(this.ground.object);

      // Create a wall
      this.wall = new Wall({
        textureUrl: description.wall.maps.color.url,
        aoUrl: description.wall.maps.ao.url,
        displacementUrl: description.wall.maps.displacement.url,
        normalUrl: description.wall.maps.normal.url,
        bumpUrl: description.wall.maps.bump.url,
        roughnessUrl: description.wall.maps.roughness.url,
        wrapS: description.wall.wrapS,
        wrapT: description.wall.wrapT,
        repeat: description.wall.repeat,
        magFilter: description.wall.magFilter,
        minFilter: description.wall.minFilter,
        primaryColor: description.wall.primaryColor,
        secondaryColor: description.wall.secondaryColor,
      });

      // Build the maze
      let wallObject;
      for (let i = 0; i < this.size.width; i++) {
        for (let j = 0; j < this.size.depth; j++) {
          if (this.map[j][i] === 2 || this.map[j][i] === 3) {
            // Create the north walls
            wallObject = this.wall.object.clone();
            wallObject.position.set(i - this.size.width / 2 + 0.5, 0.5, j - this.size.depth / 2);
            this.object.add(wallObject);
          }
          if (this.map[j][i] === 1 || this.map[j][i] === 3) {
            // Create the west walls
            wallObject = this.wall.object.clone();
            wallObject.rotation.y = Math.PI / 2.0;
            wallObject.position.set(i - this.size.width / 2, 0.5, j - this.size.depth / 2 + 0.5);
            this.object.add(wallObject);
          }
        }
      }

      this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
      this.loaded = true;
    };

    this.onProgress = function(url, xhr) {
      console.log("Resource '" + url + "' " + ((100.0 * xhr.loaded) / xhr.total).toFixed(0) + '% loaded.');
    };

    this.onError = function(url, error) {
      console.error('Error loading resource ' + url + ' (' + error + ').');
    };

    for (const [key, value] of Object.entries(parameters)) {
      this[key] = value;
    }
    this.loaded = false;

    THREE.Cache.enabled = true;

    const loader = new THREE.FileLoader();
    loader.setResponseType('json');

    loader.load(
      this.url,
      description => this.onLoad(description),
      xhr => this.onProgress(this.url, xhr),
      error => this.onError(this.url, error),
    );
  }
// Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
  cellToCartesian(position) {
    return new THREE.Vector3(
      (position[1] - this.size.height / 2.0 + 0.5) * this.scale.x,
      0.0,
      (position[0] - this.size.width / 2.0 + 0.5) * this.scale.z,
    );
  }

  // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
  cartesianToCell(position) {
    return [
      Math.floor(position.z / this.scale.z + this.size.width / 2.0),
      Math.floor(position.x / this.scale.x + this.size.height / 2.0),
    ];
  }

  /* To-do #23 - Measure the player’s distance to the walls
        - player position: position*/
  distanceToWestWall(position) {
    const indices = this.cartesianToCell(position);
    if (this.map[indices[0]][indices[1]] === 1 || this.map[indices[0]][indices[1]] === 3) {
      return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
    }
    return Infinity;
  }
  distanceToNorthWall(position) {
    const indices = this.cartesianToCell(position);
    if (this.map[indices[0]][indices[1]] === 2 || this.map[indices[0]][indices[1]] === 3) {
      return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
    }
    return Infinity;
  }

  distanceToEastWall(position) {
    const indices = this.cartesianToCell(position);
    indices[1]++; // Move to the next column (east)

    if (
      indices[1] < this.map[indices[0]].length &&
      (this.map[indices[0]][indices[1]] === 1 || this.map[indices[0]][indices[1]] === 3)
    ) {
      return this.cellToCartesian(indices).x - position.x - this.scale.x / 2.0;
    }

    return Infinity;
  }

  distanceToSouthWall(position) {
    const indices = this.cartesianToCell(position);
    indices[0]++; // Move to the next row (south)

    if (
      indices[0] < this.map.length &&
      (this.map[indices[0]][indices[1]] === 2 || this.map[indices[0]][indices[1]] === 3)
    ) {
      return this.cellToCartesian(indices).z - position.z - this.scale.z / 2.0;
    }

    return Infinity;
  }

  foundExit(position) {
    /* To-do #42 - Check if the player found the exit
            - assume that the exit is found if the distance between the player position and the exit location is less than (0.5 * maze scale) in both the X- and Z-dimensions
            - player position: position
            - exit location: this.exitLocation
            - maze scale: this.scale
            - remove the previous instruction and replace it with the following one (after completing it)*/
    return (
      Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x &&
      Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    );
  }
}
