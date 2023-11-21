import mongoose, { Document } from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence'; // Import the relevant interfaces

// Create a sub-schema for floorMap
const floorMapSchema = new mongoose.Schema(
  {
    maze: {
      size: {
        width: Number,
        depth: Number,
      },
      map: [[Number]],
      rooms: [
        {
          roomId: String,
          position: [Number],
          size: {
            width: Number,
            height: Number,
          },
        },
      ],
      exits: [
        {
          label: String,
          location: [Number],
        },
      ],
      elevators: [[Number]],
      exitLocation: [
        {
          floorId: String,
          location: [Number],
        },
      ],
    },
    ground: {
      size: {
        width: Number,
        height: Number,
        depth: Number,
      },
      segments: {
        width: Number,
        height: Number,
        depth: Number,
      },
      primaryColor: String,
      maps: {
        color: {
          url: String,
        },
        ao: {
          url: String,
          intensity: Number,
        },
        displacement: {
          url: String,
          scale: Number,
          bias: Number,
        },
        normal: {
          url: String,
          _type: Number,
          scale: {
            x: Number,
            y: Number,
          },
        },
        bump: {
          url: String,
          scale: Number,
        },
        roughness: {
          url: String,
          rough: Number,
        },
      },
      wrapS: Number,
      wrapT: Number,
      repeat: {
        u: Number,
        v: Number,
      },
      magFilter: Number,
      minFilter: Number,
      secondaryColor: String,
    },
    wall: {
      segments: {
        width: Number,
        height: Number,
      },
      primaryColor: String,
      maps: {
        color: {
          url: String,
        },
        ao: {
          url: String,
          intensity: Number,
        },
        displacement: {
          url: String,
          scale: Number,
          bias: Number,
        },
        normal: {
          url: String,
          _type: Number,
          scale: {
            x: Number,
            y: Number,
          },
        },
        bump: {
          url: String,
          scale: Number,
        },
        roughness: {
          url: String,
          rough: Number,
        },
      },
      wrapS: Number,
      wrapT: Number,
      repeat: {
        u: Number,
        v: Number,
      },
      magFilter: Number,
      minFilter: Number,
      secondaryColor: String,
    },
    player: {
      initialPosition: [Number],
      initialDirection: Number,
    },
  },
  { strict: true },
);

const Floor = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    building: { type: String },
    description: { type: String },
    floorNr: { type: Number },
    floorMap: floorMapSchema, // Embed the sub-schema for floorMap
  },
  {
    timestamps: true,
  },
);

Floor.index({ building: 1, floorNr: 1 }, { unique: true });

export default mongoose.model<IFloorPersistence & Document>('Floor', Floor);
