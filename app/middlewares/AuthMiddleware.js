import {tokenDecoded} from "../Utility/TokenUtil.js";

const authMiddleware = async (req, res, next) => {
    let token = req.headers.token
    if (!token) {
        token = req.cookies.token
    }

    const data =  await tokenDecoded(token);

    if(data === null) {
        res.json({"status": "fail", "message": "invalid token"});
    } else {
        req.headers.id = data._id;
        req.headers.phone = data.phoneNumber;

        next()
    }
}

export default authMiddleware;