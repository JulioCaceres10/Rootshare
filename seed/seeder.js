import {exit} from 'node:process'
import categories from "./categories.js";
import prices from './prices.js';
import users from './users.js';
import {Category, Price, User} from "../models/index.js";
import db from "../config/db.js";

const importData = async () => {
    try {
        // autenticar
        await db.authenticate();

        // generar columnas
        await db.sync();

        // insertar datos
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users)
        ])
        console.log('Datos importados correctamente')
        exit()

    } catch (error) {
        console.log(error);
        exit(1)
    }
}

const deleteData = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        exit()
        
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i"){
    importData()
}
if(process.argv[2] === "-e"){
    deleteData()
}