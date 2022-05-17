import { db } from "../connection.js";

async function validateToken(req,res,next) {
    const {authorization} = req.headers;
    const token = authorization.replace('Bearer ', '');

    if (token) {
        const session = await db.collection('sessions').findOne({token});
        
        if (!session) {
            return res.sendStatus(401);
        }
    }

    next();
}

export default validateToken;