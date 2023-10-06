import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './config/db.js'

const app = express();

// activar cookie parser
app.use(cookieParser());

import dotenv from 'dotenv';

dotenv.config({path: ".env"})

// cors
const corsOptions = {
    // http://localhost:8080
    origin: process.env.BACKEND_URL,
    optionsSuccessStatus: 200, 
    credentials: true,
}
app.use(cors(corsOptions));


// lee los datos del body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// conexion a base de datos
try {
   await db.authenticate()
   db.sync()
   console.log("Base de datos conectada") 
} catch (error) {
    console.log(error)
}

// rutas importadas
import users from './routes/userRoute.js'
import properties from './routes/propertyRoute.js'
import publicProperty from './routes/publicRoute.js'


// middleware
import protectRoute from './middleware/routeProtection.js';

// rutas middleware
app.use('/auth', users)
app.use('/admin',protectRoute, properties)
app.use('/public', publicProperty)


const port = process.env.PORT || 3030
app.listen(port, () => {
    console.log(`Puerto escuchando ${port}`)
})
