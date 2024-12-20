import {JWT_SECRET, JWT_EXPIRATION_TIME} from "../configuration/config.js"
import jwt from 'jsonwebtoken'

export const tokenEncode = (usr_id, phone)=>{

    const Payload = ({_id: usr_id, phoneNumber: phone})
    const Expire = {expiresIn: JWT_EXPIRATION_TIME}

    const token = jwt.sign(Payload, JWT_SECRET, Expire)
    return token
}

export const tokenDecoded = async (token)=>{
    try{
        return await jwt.verify(token, JWT_SECRET)
    }
    catch (err){
        return null
    }
}

