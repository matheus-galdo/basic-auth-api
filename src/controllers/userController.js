import {db} from "../connection.js";

async function showUsers(req, res) {
   const users = await db.collection("usuarios").find({}).toArray();
   return res.send(users);
}

export {
    showUsers
}