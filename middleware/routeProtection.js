import jwt from 'jsonwebtoken'
import { User } from '../models/index.js '

const protectRoute = async (req, res, next) => {
    // token
    const token = req.header('authToken')
    

    // verificar token
    if(!token) return res.status(400).json({error: 'acceso denegado'})

    // validar token
    try {
        
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

        const user = await User.scope('deleteAttributes').findByPk(decoded.id)
        if(user) {
            req.user = user
        } else {
            return res.clearCookie('_token').json({error: true})
        }
        next()
        
          

    } catch (error) {
        return res.clearCookie('_token').json({error:true})
    }
}

export default protectRoute;