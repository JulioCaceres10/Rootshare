import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({path: ".env"})

const generateId = () => Math.random().toString(32).substring(2) + Date.now().toString(32)
const generateToken = (userToken) => jwt.sign({id: userToken.id, name: userToken.name}, process.env.SECRET_TOKEN, {expiresIn: '1d'})


export {
    generateToken,
    generateId
}