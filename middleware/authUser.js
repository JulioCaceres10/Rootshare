import jwt from 'jsonwebtoken' 
import User from '../models/User.js';

const authUser = async (req, res, next) => {
    // identificar si existe Token
    const token = req.header('authToken')
    
    // validar el token del usuario
    if(token === 'null') {
            req.user = null
            console.log("entro")
            return next()
        }
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
