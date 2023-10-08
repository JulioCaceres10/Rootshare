import jwt from 'jsonwebtoken' 
import User from '../models/User.js';

const authUser = async (req, res, next) => {
    // identificar si existe Token
    const _token = req.header('authToken')
    
    if(!_token) {
        req.user = null
        return next()
    }
    
    // validar el token del usuario
    try {
        const decoded = jwt.verify(_token, process.env.SECRET_TOKEN)

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
