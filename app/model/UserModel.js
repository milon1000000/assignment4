import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIDNumber: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bloodGroup: {type: String, required: true},
    otp: {type: String, default: "0", required: true},
}, {timestamps: true, versionKey: false});

const userModel = mongoose.model("users", DataSchema);

export default userModel;