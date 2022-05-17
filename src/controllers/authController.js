import {db} from "../connection.js";
import bcrypt from "bcrypt"; 
import { v4 as uuid } from 'uuid';

async function login(req, res) {
    const {email, senha} = req.body;

    const user = await db.collection("usuarios").findOne({email});

    if (!user && !bcrypt.compareSync(senha, user.senha)) {
        return res.status(401).send("usuário ou senha incorretos");
    }

    const token = uuid();
    await db.collection('sessions').insertOne({token, userId: user._id});

    res.send(token);
}

async function cadastro(req, res) {
    const {nome, email, senha, confirmar_senha} = req.body;
    
    try {
        const hashSenha = bcrypt.hashSync(senha, 10);
        await db.collection("usuarios").insertOne({nome, email, hashSenha});
        return res.status(201).send("Usuário cadastrado");
    } catch (error) {
        res.status(400).send("deu ruim");
    }
}

export {
    login,
    cadastro
}
