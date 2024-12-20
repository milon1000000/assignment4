import {UserRegistrationService, LoginService, ReadSingleProfileService, ReadAllProfileService, UpdateSingleUserService, DeleteSingleUserService } from "../services/UserService.js"

export const UserRegistration = async (req, res) => {
    const data = await UserRegistrationService(req)
    res.json(data)
}


export const Login = async (req, res) => {
    const data = await LoginService(req)

    if(data["status"] === "success"){
        // cookies Options
       const options = {expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: false}
        // set cookie
        res.cookie("token", data["token"], options)
    }
    res.json(data)
}

export const ReadSingleProfile = async (req, res) => {
    const data= await ReadSingleProfileService(req)
    res.json(data)
}

export const ReadAllProfile = async (req, res) => {

    const data= await ReadAllProfileService(req)
    res.json(data)

}

export const UpdateSingleUser = async (req, res) => {
    const data = await UpdateSingleUserService(req)
    res.json(data)
}

export const DeleteSingleUser = async (req, res) => {
    const data = await DeleteSingleUserService(req)
    res.json(data)
}
