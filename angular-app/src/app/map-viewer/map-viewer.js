import * as THREE from 'three';
import Orientation from './orientation.js';
import ThumbRaiser from './thumb_raiser.js';
import 'lodash';

let thumbRaiser;

export default function start() {
  let floormap; // The map of the selected floor
  let floorsOfBuilding = []; // The list of floors of the selected building

  async function initializeAndAnimate() {
    try {
      await changeMap();
      initialize();
      animate();
    } catch (error) {
      console.error('An error occurred during initialization:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Fetch buildings and set up event listener after the DOM is loaded
    fetchBuildings();

    // Attach onchange event listener to buildingSelector
    const buildingSelector = document.getElementById('buildingSelector');
    buildingSelector.addEventListener('change', changeBuilding);

    // Attach onchange event listener to mapSelector
    const mapSelector = document.getElementById('mapSelector');
    mapSelector.addEventListener('change', changeMap);
    initializeAndAnimate();
  });

  function changeBuilding() {
    const buildingSelector = document.getElementById('buildingSelector');
    const selectedBuilding = buildingSelector.value;

    // Call the function to fetch floors for the selected building
    fetchFloorsOfBuilding(selectedBuilding);
  }

  async function changeMap() {
    const mapSelector = document.getElementById('mapSelector');
    const selectedMap = mapSelector.value;
    console.log(floorsOfBuilding);
    try {
      if (!floorsOfBuilding || floorsOfBuilding.length === 0) {
        //console.error('No floors available for the selected building.');
        return;
      }
      // Call the function to fetch the selected map
      const fetchedMap = await fetchAndSetMap(selectedMap);
      // Call initialize only if the map is successfully fetched
      if (fetchedMap) {
        //TODO: change maze map before initializing, check if changeMaze works
        thumbRaiser.changeMaze(fetchedMap);
        //TODO: check if initialize and animate are needed here and wether map change works -> not needed
        //initialize();
        //animate();
      } else {
        console.error('Error fetching map.');
      }
    } catch (error) {
      console.error('An error occurred while changing the map:', error);
    }
  }

  async function fetchAndSetMap(selectedMap) {
    try {
      floormap = await floorsOfBuilding.find(floor => floor.floorNr === parseInt(selectedMap)).floorMap;
      if (floormap) {
        console.log('Fetched map:', floormap);
      } else {
        console.error('Selected floor not found');
      }
      return floormap;
    } catch (error) {
      console.error('An error occurred while fetching and setting the map:', error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  function fetchBuildings() {
    // Replace the URL with the endpoint that provides the list of buildings
    fetch('http://localhost:4000/api/buildings')
      .then(response => response.json())
      .then(buildings => {
        const buildingSelector = document.getElementById('buildingSelector');

        // Clear existing options
        buildingSelector.innerHTML = '';

        // Dynamically create options for each building
        buildings.forEach(building => {
          const option = document.createElement('option');
          option.value = building.designation; // Assuming building is a string representing the building name
          option.textContent = building.designation; // Display the building name
          buildingSelector.appendChild(option);
        });
      })
      .then(() => {
        //TODO: this isn't loading the map on page load
        // Set the default building and fetch floors
        const buildingSelector = document.getElementById('buildingSelector');
        const defaultBuilding = buildingSelector.value;
        fetchFloorsOfBuilding(defaultBuilding);
      })
      .catch(error => console.error('Error fetching buildings:', error));
  }
  function fetchFloorsOfBuilding(buildingDesignation) {
    // Replace the URL with the endpoint that provides the list of floors for the selected building
    fetch(`http://localhost:4000/api/floors/building?building=${encodeURIComponent(buildingDesignation)}`)
      .then(response => response.json())
      .then(floors => {
        const floorMapSelector = document.getElementById('mapSelector');

        // Clear existing options
        floorMapSelector.innerHTML = '';

        // Dynamically create options for each floor
        floors.forEach(floor => {
          const option = document.createElement('option');
          option.value = floor.floorNr;
          option.textContent = floor.floorNr.toString(); // Display the floor number
          floorMapSelector.appendChild(option);
        });
        floorsOfBuilding = floors;
      })
      .catch(error => console.error('Error fetching floors:', error));
  }
  //-------------------------------------------------------
  //ONLY THE MAZE PARAMETERS CODE IS RELEVANT IN initialize()
  //-------------------------------------------------------
  function initialize() {
    // Create the game
    thumbRaiser = new ThumbRaiser(
      {}, // General Parameters
      {
        enabled: true,
        introductionClips: [
          {
            url: './assets/map-renderer/clips/el-gringo-12613.mp3',
            position: 'initial', // Global (non-positional) audio object: ""; positional audio object: "scene x y z" (scene specific position in cartesian coordinates), "maze line column" (maze specific position in cell coordinates), "exit" (maze exit location), "initial" (player initial position), "player" (player current position), "spotlight" (spotlight current position)
            referenceDistance: 1.0,
            loop: false,
            volume: 0.5,
          },
        ],
        idleClips: [
          {
            url: './assets/map-renderer/clips/Clearing-Throat-Moderate-Speed-www.fesliyanstudios.com.mp3',
            position: 'player',
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75,
          },
          {
            url: './assets/map-renderer/clips/Small-Double-Cough-1-www.fesliyanstudios.com.mp3',
            position: 'player',
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75,
          },
          {
            url: './assets/map-renderer/clips/Yawn-A2-www.fesliyanstudios.com.mp3',
            position: 'player',
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75,
          },
        ],
        deathClips: [
          {
            url: './assets/map-renderer/clips/176653326.mp3',
            position: 'player',
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75,
          },
          {
            url: './assets/map-renderer/clips/Horn+Squeeze+Clown.mp3',
            position: 'player',
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75,
          },
        ],
        endClips: [
          {
            url: './assets/map-renderer/clips/Ba-Bum-Tss-Joke-Drum-A1-www.fesliyanstudios.com.mp3',
            position: 'exit',
            referenceDistance: 1.0,
            loop: false,
            volume: 2.0,
          },
          {
            url: './assets/map-renderer/clips/yay-6326.mp3',
            position: 'exit',
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75,
          },
          {
            url: './assets/map-renderer/clips/crowd-cheer-ii-6263.mp3',
            position: 'exit',
            referenceDistance: 1.0,
            loop: false,
            volume: 0.75,
          },
        ],
        credits:
          "Sound clips downloaded from <a href='https://www.dreamstime.com/' target='_blank' rel='noopener'>Dreamstime</a>, <a href='https://www.fesliyanstudios.com/' target='_blank' rel='noopener'>Fesliyan Studios</a> and <a href='https://pixabay.com/' target='_blank' rel='noopener'>Pixabay</a>.",
      }, // Audio parameters
      {
        skyboxes: [
          {
            // Stormy days
            name: 'Stormy days',
            texturePath: './assets/map-renderer/cube_textures/envmap_stormydays/',
            texturePositiveXUrl: 'stormydays_ft.jpg',
            textureNegativeXUrl: 'stormydays_bk.jpg',
            texturePositiveYUrl: 'stormydays_up.jpg',
            textureNegativeYUrl: 'stormydays_dn.jpg',
            texturePositiveZUrl: 'stormydays_rt.jpg',
            textureNegativeZUrl: 'stormydays_lf.jpg',
            credits:
              "Skybox created by <a href='https://opengameart.org/content/stormy-days-skybox' target='_blank' rel='noopener'>Jockum Skoglund (hipshot)</a>.",
          },
          {
            // Miramar
            name: 'Miramar',
            texturePath: './assets/map-renderer/cube_textures/red-eclipse-skyboxes/skyboxes/',
            texturePositiveXUrl: 'miramar_ft.jpg',
            textureNegativeXUrl: 'miramar_bk.jpg',
            texturePositiveYUrl: 'miramar_up.jpg',
            textureNegativeYUrl: 'miramar_dn.jpg',
            texturePositiveZUrl: 'miramar_rt.jpg',
            textureNegativeZUrl: 'miramar_lf.jpg',
            credits:
              "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>.",
          },
          {
            // Flat sunset
            name: 'Flat sunset',
            texturePath: './assets/map-renderer/cube_textures/red-eclipse-skyboxes/skyboxes/',
            texturePositiveXUrl: 'sunsetflat_ft.jpg',
            textureNegativeXUrl: 'sunsetflat_bk.jpg',
            texturePositiveYUrl: 'sunsetflat_up.jpg',
            textureNegativeYUrl: 'sunsetflat_dn.jpg',
            texturePositiveZUrl: 'sunsetflat_rt.jpg',
            textureNegativeZUrl: 'sunsetflat_lf.jpg',
            credits:
              "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>.",
          },
          {
            // Calm sea
            name: 'Calm sea',
            texturePath: './assets/map-renderer/cube_textures/xonotic-skyboxes/skyboxes/calm_sea/',
            texturePositiveXUrl: 'calm_sea_ft.jpg',
            textureNegativeXUrl: 'calm_sea_bk.jpg',
            texturePositiveYUrl: 'calm_sea_up.jpg',
            textureNegativeYUrl: 'calm_sea_dn.jpg',
            texturePositiveZUrl: 'calm_sea_rt.jpg',
            textureNegativeZUrl: 'calm_sea_lf.jpg',
            credits:
              "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
          },
          {
            // Distant sunset
            name: 'Distant sunset',
            texturePath: './assets/map-renderer/cube_textures/xonotic-skyboxes/skyboxes/distant_sunset/',
            texturePositiveXUrl: 'distant_sunset_ft.jpg',
            textureNegativeXUrl: 'distant_sunset_bk.jpg',
            texturePositiveYUrl: 'distant_sunset_up.jpg',
            textureNegativeYUrl: 'distant_sunset_dn.jpg',
            texturePositiveZUrl: 'distant_sunset_rt.jpg',
            textureNegativeZUrl: 'distant_sunset_lf.jpg',
            credits:
              "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
          },
          {
            // Exosystem
            name: 'Exosystem',
            texturePath: './assets/map-renderer/cube_textures/xonotic-skyboxes/skyboxes/exosystem/',
            texturePositiveXUrl: 'exosystem_ft.jpg',
            textureNegativeXUrl: 'exosystem_bk.jpg',
            texturePositiveYUrl: 'exosystem_up.jpg',
            textureNegativeYUrl: 'exosystem_dn.jpg',
            texturePositiveZUrl: 'exosystem_rt.jpg',
            textureNegativeZUrl: 'exosystem_lf.jpg',
            credits:
              "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
          },
          {
            // Heaven
            name: 'Heaven',
            texturePath: './assets/map-renderer/cube_textures/xonotic-skyboxes/skyboxes/heaven/',
            texturePositiveXUrl: 'heaven_ft.jpg',
            textureNegativeXUrl: 'heaven_bk.jpg',
            texturePositiveYUrl: 'heaven_up.jpg',
            textureNegativeYUrl: 'heaven_dn.jpg',
            texturePositiveZUrl: 'heaven_rt.jpg',
            textureNegativeZUrl: 'heaven_lf.jpg',
            credits:
              "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
          },
        ],
        selected: 4,
      }, // Cube texture parameters
      {
        mazeDescription: floormap,
        helpersColor: new THREE.Color(0xff0077),
      }, // Maze parameters
      { helpersColor: new THREE.Color(0x0055ff) }, // Player parameters
      {
        intensity: 0.1,
      }, // Ambient light parameters
      {
        intensity: 0.5,
        distance: 20.0,
        orientation: new Orientation(-38.7, 53.1),
        castShadow: true,
        shadow: {
          mapSize: new THREE.Vector2(2048, 2048),
          camera: {
            left: -20.0,
            right: 20.0,
            top: 20.0,
            bottom: -20.0,
            near: 0.0,
            far: 40.0,
          },
        },
      }, // Directional light parameters
      {
        visible: false,
        intensity: 90.0,
        distance: 40.0,
        angle: 4.0,
        position: new THREE.Vector3(0.0, 10.0, 0.0),
        castShadow: true,
        shadow: {
          camera: {
            near: 5.0,
            far: 30.0,
          },
        },
      }, // Spotlight parameters
      {
        color: new THREE.Color(0xffffa0),
        visible: false,
        intensity: 2.0,
        distance: 5.0,
        angle: 20.0,
        orientation: new Orientation(0.0, -20.0),
        castShadow: true,
        shadow: {
          camera: {
            near: 0.01,
            far: 10.0,
          },
        },
      }, // Flashlight parameters
      { type: THREE.PCFSoftShadowMap }, // Shadows parameters
      {}, // Fog parameters
      {}, // Collision detection parameters
      { view: 'fixed', initialViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5), initialFogDensity: 0.1 }, // Fixed view camera parameters
      {
        view: 'first-person',
        initialViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5),
        initialOrientation: new Orientation(0.0, -10.0),
        orientationMax: new Orientation(180.0, 90.0),
        initialFogDensity: 0.7,
      }, // First-person view camera parameters
      {
        view: 'third-person',
        initialViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5),
        initialOrientation: new Orientation(0.0, -20.0),
        initialDistance: 2.0,
        distanceMin: 1.0,
        distanceMax: 4.0,
        initialFogDensity: 0.3,
      }, // Third-person view camera parameters
      {
        view: 'top',
        initialViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5),
        initialOrientation: new Orientation(0.0, -90.0),
        initialDistance: 4.0,
        distanceMin: 1.0,
        distanceMax: 16.0,
        initialFogDensity: 0.2,
      }, // Top view camera parameters
      {
        view: 'mini-map',
        initialViewport: new THREE.Vector4(0.5, 0.5, 0.3, 0.3),
        initialOrientation: new Orientation(180.0, -90.0),
        initialZoom: 0.64,
        zoomMin: 0.64,
        zoomMax: 5.12,
      }, // Mini-map view camera parameters
    );
  }
  //TODO : check if the function calls are in the right place
  function animate() {
    requestAnimationFrame(animate);
    // Update the game
    if (thumbRaiser) {
      thumbRaiser.update();
    }
  }
}
