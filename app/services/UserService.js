import userModel from "../model/UserModel.js";
import {tokenEncode} from "../Utility/TokenUtil.js";
import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

export const UserRegistrationService = async (req)=>{
   try{
        // const firstName = req.body.firstName;
        // const lastName = req.body.lastName;
        // const NID = req.body.NIDNumber;
        // const phone = req.body.phoneNumber;
        // const password = req.body.password;
        // const blood = req.body.bloodGroup
        // console.log(req.body)
        const reqBody = req.body;
        const data = await userModel.create(reqBody)

       return {"status" : "success", "data" : data}

    } catch (err){
       return {"status" : "fail", "data" : err}.toString()
   }



}

export const LoginService = async (req)=>{
    try {
        const phone = req.body.phoneNumber
        const password = req.body.password

        const total = await userModel.find({phoneNumber: phone, password: password}).countDocuments("total")

        if (total === 1) {
            const id = await userModel.find({phoneNumber: phone, password: password}).select("_id")
            const token = await tokenEncode(id[0]._id, phone);
            return {"status": "success", "token": token}
        } else {
            return {"status": "fail", "data": "invalid user or password"}
        }
    }
    catch (err) {
        return {"status": "fail", "data": err.toString()}
    }
}

export const ReadSingleProfileService = async (req)=>{
    try {
        const id = new ObjectID(req.params.id)
        const matchStage = {$match: {_id: id}}

        const data = await userModel.aggregate([matchStage])

        return {"status" : "success", "data" : data}
    } catch (err) {
        return {"status" : "fail", "data" : err.toString()}
    }
    
}

export const ReadAllProfileService = async (req)=>{
    try{
        const data = await userModel.find()
        return {data}
    } catch(e){
        return {"status" : "fail", "data" : e.toString()}
    }
}

export const UpdateSingleUserService = async (req)=>{
    try{
        const id = new ObjectID(req.params.id)
        const matchStage = {$match: {_id: id}}

        const data = await userModel.aggregate([matchStage])
        if(data){
            const newData = await userModel.updateOne(req.body)
            return {"status" : "success", "message" : "user updated successfully."};
        } else {
             return {"status": "fail", "message": "unsuccessfull"}
        }

    } catch (err) {
        return {"status" : "fail", "data" : err.toString()}
    }
    
}

export const DeleteSingleUserService = async (req)=>{
    const id = new ObjectID(req.params.id)

    const total = await userModel.find({_id: id}).countDocuments("total")

    if(total === 1){
        const data = await userModel.deleteOne({_id: id})
        return {status: "success", message: "user deleted successfully", data: data}
    } else {
        return {status: "fail", data: "invalid user id"}
    }

}
