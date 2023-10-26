import mongoose, { Document } from "mongoose";
import { IPathwayPersistence } from "../../dataschema/IPathwayPersistence";

const Pathway = new mongoose.Schema(
  {
    domainId: { type: String, unique: true  },
    buildingSource: { type: String },
    buildingDestination: { type: String },
    floorSource: { type: String },
    floorDestination: { type: String },
    description: { type: String }
  }
)

export default mongoose.model<IPathwayPersistence & Document>("Pathway", Pathway);
