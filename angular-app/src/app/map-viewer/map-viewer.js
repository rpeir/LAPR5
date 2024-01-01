import * as THREE from 'three';
import Orientation from './orientation.js';
import ThumbRaiser from './thumb_raiser.js';
import 'lodash';
import { environment } from '../../environments/environment';

let thumbRaiser;

export default function start() {
  let floormap; // The map of the selected floor
  let floorsOfBuilding = []; // The list of floors of the selected building
  let floorsOfPath = [];
  let pathJSON;
  let floorsServed = [];
  let floorMapsServed = [];
  let floorsOfBuildingWithElevator = [];
  let selectedFloor;
  const token = localStorage.getItem('token');
  let pathFile = localStorage.getItem('pathFile');

  async function initializeAndAnimate() {
    try {
      await changeMap();
      initialize();
      animate();
      await waitTime(2500);
      if (pathFile) {
        pathJSON = JSON.parse(pathFile);
        await loadJsonData(pathJSON);
        pathFile = null;
        localStorage.removeItem('pathFile');
      }
    } catch (error) {
      console.error('An error occurred during initialization:', error);
    }
  }
  // Function to load the json with a path
  async function loadJsonData(jsonData) {
    try {
      const buildings = jsonData.buildings;
      for (let i = 0, len = buildings.length; i < len; i++) {
        try {
          const response = await fetch(
            `${environment.apiURL}/api/floors/building?building=${encodeURIComponent(buildings[i])}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const floors = await response.json();
          console.log(floors);
          for (const floor of floors) {
            if (
              !floorsOfPath.includes(floor) &&
              jsonData.paths.find(
                path =>
                  path.floorSource === floor.description ||
                  jsonData.paths.find(path => path.floorDestination === floor.description),
              )
            ) {
              floorsOfPath.push(floor);
            }
          }
        } catch (error) {
          console.error(`Error fetching floors for building ${buildings[i]}:`, error);
        }
      }
    } catch (error) {
      console.error('Error processing JSON data:', error);
    }
    // Start the automatic path
    await changeMapsForAutomaticPath(jsonData.paths);
    thumbRaiser.player.playerAuto = false;
    floorsOfPath = [];
  }
  document.getElementById('loadJsonButton').addEventListener('click', function() {
    const fileInput = document.getElementById('jsonFile');
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          pathJSON = JSON.parse(event.target.result);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          loadJsonData(pathJSON).then(r => console.log('Automatic path finished'));
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected.');
    }
  });
  // Function to change the maps for the automatic path. It waits for the player to finish the current floor before changing the map
  async function changeMapsForAutomaticPath() {
    let oldFloor = floorsOfPath[0];
    console.log(floorsOfPath);
    let i = 0;
    for (const floor of floorsOfPath) {
      selectedFloor = floor;
      await waitFor(() => pathJSON.pathInside[i] !== undefined);
      if (oldFloor.building !== floor.building) {
        await notifyFloorChangeAuto(floor);
      }
      await thumbRaiser.changeMazeForAutoPlay(floor.floorMap, pathJSON.pathInside[i]);
      await waitTime(300);
      await thumbRaiser.movePlayer(pathJSON.pathInside[i]);
      i++;
      oldFloor = floor;
    }
    await notifyFinishedTask();
  }

  async function notifyFinishedTask() {
    if (document.getElementById('task-popup')) {
      return;
    }
    // create a new div element
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'task-popup');
    const newContent = document.createTextNode('Task completed!');
    newDiv.appendChild(newContent);
    const currentDiv = document.getElementById('views-panel');
    currentDiv.after(newDiv);
    setTimeout(function() {
      newDiv.remove();
    }, 2500);
  }
  async function notifyFloorChangeAuto(floor) {
    if (document.getElementById('notice-popup2')) {
      return;
    }
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'notice-popup2');
    const newContent = document.createTextNode('Moving to floor ' + floor.description);
    newDiv.appendChild(newContent);
    const currentDiv = document.getElementById('views-panel');
    currentDiv.after(newDiv);
    setTimeout(function() {
      newDiv.remove();
    }, 2000);
  }

  function waitTime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Utility function to wait for a condition to be true
  function waitFor(conditionFunction) {
    return new Promise(resolve => {
      const checkCondition = () => {
        if (conditionFunction()) {
          resolve();
        } else {
          setTimeout(checkCondition, 100); // Check again in 100 milliseconds
        }
      };
      checkCondition();
    });
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
    try {
      if (!floorsOfBuilding || floorsOfBuilding.length === 0) {
        console.error('No floors available for the selected building.');
        return;
      }
      // Call the function to fetch the selected map
      const fetchedMap = await fetchAndSetMap(selectedMap);
      // Call initialize only if the map is successfully fetched
      if (fetchedMap) {
        thumbRaiser.changeMaze(fetchedMap);
      } else {
        console.error('Error fetching map.');
      }
    } catch (error) {
      console.error('An error occurred while changing the map:', error);
    }
  }

  async function notifyFloorChange(exit) {
    if (document.getElementById('notice-popup')) {
      return;
    }
    let buildingDesignation;
    const regex = /([^_]+)_\d/;
    const match = exit.floorId.match(regex);
    if (match) {
      buildingDesignation = match[1];
    }
    const response = await fetch(
      environment.apiURL + `/api/floors/building?building=${encodeURIComponent(buildingDesignation)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    let floors = await response.json();
    console.log(floors);
    const currentFloor = selectedFloor;
    const floor = await floors.find(floor => floor.description === exit.floorId);
    // create a new div element
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'notice-popup');
    const newContent = document.createTextNode('Moving to floor floor ' + exit.floorId);
    newDiv.appendChild(newContent);

    const currentDiv = document.getElementById('views-panel');
    currentDiv.after(newDiv);

    setTimeout(function() {
      newDiv.remove();
    }, 3000);
    try {
      await thumbRaiser.changeMazeForAutoPlay(floor.floorMap);
      selectedFloor = floor;
      let newExitLocation = floor.floorMap.maze.exitLocation.find(exit => exit.floorId === currentFloor.description);
      let newPosition = thumbRaiser.maze.cellToCartesian(newExitLocation.location);
      thumbRaiser.player.position.set(newPosition.x, newPosition.y, newPosition.z);
    } catch (error) {
      console.error('Error changing map:', error);
    }
  }
  async function continuouslyCheckElevator() {
    // Check the value of the variable
    if (thumbRaiser) {
      if (thumbRaiser.player.isInElevator) {
        await floorsServedByElevator();
        if (thumbRaiser.player.playerAuto) {
          await waitTime(1000);
        }
      } else {
        if (document.getElementById('elevator-popup')) {
          document.getElementById('elevator-popup').remove();
        }
      }
    }
    // Call the function recursively after 0.5 seconds
    setTimeout(function() {
      continuouslyCheckElevator();
    }, 20);
  }
  continuouslyCheckElevator().then(r => {});

  async function continuouslyCheckPathWay() {
    if (thumbRaiser) {
      if (thumbRaiser.player.isInPathway) {
        if (thumbRaiser.closestExit.floorId) {
          thumbRaiser.player.isInPathway = false;
          await notifyFloorChange(thumbRaiser.closestExit);
        }
      } else {
        if (document.getElementById('notice-popup')) {
          document.getElementById('notice-popup').remove();
        }
      }
    }
    // Call the function recursively after 0.5 seconds
    setTimeout(function() {
      continuouslyCheckPathWay();
    }, 50);
  }
  continuouslyCheckPathWay().then(r => {});
  // Function to fetch floors the elevator stepped on
  async function floorsServedByElevator() {
    let buildingDesignation;
    const response = await fetch(environment.apiURL + '/api/buildings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const buildings = await response.json();
    buildings.forEach(building => {
      if (building.designation === selectedFloor.building) {
        buildingDesignation = building.designation;
      }
    });
    const floors = [];
    try {
      const response = await fetch(environment.apiURL + `/api/elevators/?buildingDesignation=${buildingDesignation}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const elevators = await response.json();

      elevators.forEach(elevator => {
        elevator.floorsServed.forEach(floor => {
          if (!floors.includes(floor)) {
            floors.push(floor);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching elevators:', error);
    }
    floorsServed = floors;
    try {
      const responseFloors = await fetch(
        environment.apiURL + `/api/floors/building?building=${encodeURIComponent(buildingDesignation)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      floorsOfBuildingWithElevator = await responseFloors.json();
    } catch (error) {
      console.error('Error fetching floors:', error);
    }
    for (const floorNr of floorsServed) {
      const floor = floorsOfBuildingWithElevator.find(floor => floor.floorNr === floorNr);
      if (floor) {
        floorMapsServed.push(floor);
      }
    }
    popupElevatorUi(buildingDesignation, floorMapsServed);
  }

  function popupElevatorUi(buildingName, floors) {
    if (document.getElementById('elevator-popup')) {
      floorMapsServed = [];
      return;
    }
    // create a new div element
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'elevator-popup');
    const newContent = document.createTextNode('Elevator ' + buildingName);
    newDiv.appendChild(newContent);

    floors.forEach(floor => {
      const floorBtn = document.createElement('div');
      floorBtn.setAttribute('class', 'floor-btn');
      const floorText = document.createTextNode(floor.floorNr.toString());
      floorBtn.append(floorText);
      floorBtn.setAttribute('data-floor', floor.floorNr.toString());
      newDiv.appendChild(floorBtn);
    });

    const currentDiv = document.getElementById('views-panel');
    currentDiv.after(newDiv);
    let floorFromButton;
    const divs = document.querySelectorAll('.floor-btn');
    divs.forEach(el =>
      el.addEventListener('click', event => {
        event.target.style.backgroundColor = 'red';
        //clicked button floor data
        floorFromButton = event.target.getAttribute('data-floor');
        floors.forEach(floor => {
          if (floor.floorNr === parseInt(floorFromButton)) {
            selectedFloor = floor;
            thumbRaiser.changeMazeForAutoPlay(floor.floorMap);
            let position = thumbRaiser.maze.cellToCartesian(floor.floorMap.maze.elevators);
            thumbRaiser.player.position.set(position.x, position.y, position.z);
          }
        });
        setTimeout(function() {
          document.getElementById('elevator-popup').remove();
        }, 2000);
      }),
    );
    if (thumbRaiser.player.playerAuto) {
      document.querySelector(`[data-floor="${selectedFloor.floorNr}"]`).style.backgroundColor = 'red';
    }
    floorMapsServed = [];
  }

  async function fetchAndSetMap(selectedMap) {
    try {
      selectedFloor = await floorsOfBuilding.find(floor => floor.floorNr === parseInt(selectedMap));
      floormap = selectedFloor.floorMap;
      return floormap;
    } catch (error) {
      console.error('An error occurred while fetching and setting the map:', error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  function fetchBuildings() {
    // Replace the URL with the endpoint that provides the list of buildings
    fetch(environment.apiURL + '/api/buildings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
      .then(async () => {
        const buildingSelector = document.getElementById('buildingSelector');
        const defaultBuilding = buildingSelector.value;
        await fetchFloorsOfBuilding(defaultBuilding);
        selectedFloor = floorsOfBuilding[0];
        thumbRaiser.changeMaze(floorsOfBuilding[0].floorMap);
      })
      .catch(error => console.error('Error fetching buildings:', error));
  }
  async function fetchFloorsOfBuilding(buildingDesignation) {
    // Replace the URL with the endpoint that provides the list of floors for the selected building
    await fetch(environment.apiURL + `/api/floors/building?building=${encodeURIComponent(buildingDesignation)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
  function initialize() {
    // Create the game
    thumbRaiser = new ThumbRaiser(
      {}, // General Parameters
      {
        enabled: true,
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
  function animate() {
    requestAnimationFrame(animate);
    // Update the game
    if (thumbRaiser) {
      thumbRaiser.update();
    }
  }
}
