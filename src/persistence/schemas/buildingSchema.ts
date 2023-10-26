import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const BuildingSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    code: { type: String, unique: true },
    designation: { type: String, unique: true },
    description: { type: String, unique: false },
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  { timestamps: true },
);
export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
