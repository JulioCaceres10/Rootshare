import jwt from 'jsonwebtoken' 
import User from '../models/User.js';

const authUser = async (req, res, next) => {
    // identificar si existe Token
    const token = await req.header('authToken')
    console.log(token)
    
    if(token === false) {
        req.user = null
        console.log("entro")
        return next()
    }
    
    // validar el token del usuario
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

        const user = await User.scope('deleteAttributes').findByPk(decoded.id)
        if(user) {
            req.user = user
        }
        return next()

    } catch (error) {
        console.log(error)
        return res.clearCookie('_token').send('Limpiar cookie')
    }
}

export default authUser;
