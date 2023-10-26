import mongoose, { Document } from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const Floor = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    building: { type: String },
    description: { type: String },
    floorNr: { type: Number },
  },
  {
    timestamps: true,
  },
);

Floor.index({building: 1, floorNr: 1}, {unique: true});

export default mongoose.model<IFloorPersistence & Document>('Floor', Floor);
