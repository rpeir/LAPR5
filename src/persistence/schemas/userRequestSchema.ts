import mongoose from "mongoose";
import {IUserRequestPersistence} from "../../dataschema/IUserRequestPersistence";

const UserRequest = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        firstName: {
            type: String,
            required: [true, 'Please enter first name'],
            index: true,
        },

        lastName: {
            type: String,
            required: [true, 'Please enter last name'],
            index: true,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },

        password: String,
        phoneNumber:String,
        nif:String,
        state:String,

        salt: String,
    },
    { timestamps: true },
);

export default mongoose.model<IUserRequestPersistence & mongoose.Document>('UserRequest', UserRequest);
