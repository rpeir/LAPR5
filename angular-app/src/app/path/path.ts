interface PathBetweenFloors {
  element: string;
  floorSource: string;
  floorDestination: string;
}


export class Path {
  buildings!: string[];
  paths!: PathBetweenFloors[];
}

