export interface IFloorDTO {
  domainId: string;
  building: string;
  description: string;
  floorNr: number;
  floorMap?: {
    maze: {
      size: {
        width: number;
        depth: number;
      };
      map: number[][];
      rooms: {
        roomId: string;
        position: number[];
        size: {
          width: number;
          height: number;
        };
      }[];
      exits: {
        label: string;
        location: number[];
      }[];
      elevators: [number, number][];
      exitLocation: {
        floorId: string;
        location: number[];
      }[];
    };
    ground: {
      size: {
        width: number;
        height: number;
        depth: number;
      };
      segments: {
        width: number;
        height: number;
        depth: number;
      };
      primaryColor: string;
      maps: {
        color: {
          url: string;
        };
        ao: {
          url: string;
          intensity: number;
        };
        displacement: {
          url: string;
          scale: number;
          bias: number;
        };
        normal: {
          url: string;
          _type: number;
          scale: {
            x: number;
            y: number;
          };
        };
        bump: {
          url: string;
          scale: number;
        };
        roughness: {
          url: string;
          rough: number;
        };
      };
      wrapS: number;
      wrapT: number;
      repeat: {
        u: number;
        v: number;
      };
      magFilter: number;
      minFilter: number;
      secondaryColor: string;
    };
    wall: {
      segments: {
        width: number;
        height: number;
      };
      primaryColor: string;
      maps: {
        color: {
          url: string;
        };
        ao: {
          url: string;
          intensity: number;
        };
        displacement: {
          url: string;
          scale: number;
          bias: number;
        };
        normal: {
          url: string;
          _type: number;
          scale: {
            x: number;
            y: number;
          };
        };
        bump: {
          url: string;
          scale: number;
        };
        roughness: {
          url: string;
          rough: number;
        };
      };
      wrapS: number;
      wrapT: number;
      repeat: {
        u: number;
        v: number;
      };
      magFilter: number;
      minFilter: number;
      secondaryColor: string;
    };
    player: {
      initialPosition: [number, number];
      initialDirection: number;
    };
  };
}
