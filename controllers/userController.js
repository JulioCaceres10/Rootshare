import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken, generateId } from '../helpers/token.js';
import {emailRegister, emailForPassword} from '../helpers/email.js'


const user = (req, res) => {
    res.send('Ruta Usuario')
}

const registerUser = async (req, res) => {
    const {name, lastName, email, password} = req.body;
    const registration = await registrationValidation(req)
    
    const accessToken = await generateId()


    const existsEmail = await User.findOne({ where: { email: req.body.email}}) 
    if(existsEmail) {
        const confirmEmailExists = {email: true}
        return res.json(confirmEmailExists)
    }

    if(registration) {
        const userData = await User.create({
            name,
            lastName, 
            email,
            password,
            token: accessToken
        })

        emailRegister({
            name: userData.name,
            email: userData.email,
            token: userData.token
        })

        const confirmEmailExists = {
            email: false,
            accountCreated: true
        }
        return res.json(confirmEmailExists)
    }
    
}

const loginUser = async (req, res) => {
    // validando
    await check('email').isEmail().withMessage('Email Invalido').run(req)
    await check('password').isLength({ min: 6}).withMessage('Contraseña Invalida').run(req)
    const result = validationResult(req)

    if(result){
        console.log('Autenticando...')
    }

    // verificando usuario
    const {email, password} = req.body

    const user = await User.findOne({where: {email}})
    
    if(!user){
        const userNotFound = {
            text: 'Usuario no registrado',
            icon: 'mdi:mdi-close-circle',
            color: 'red',
            boolean: true
        }
        return res.json(userNotFound)
    }
    if(!user.confirmed) {
        const userNotConfirmed = {
            text: 'No haz confirmado tu cuenta',
            icon: 'mdi:mdi-account-alert',
            color: 'red',
            boolean: true
        }
        return res.json(userNotConfirmed)
    }
    if (!user.verifyPassword(password)) {
        const incorrectCredentials = {
            text: 'Credenciales incorrectas',
            icon: 'mdi:mdi-close-circle',
            color: 'red',
            boolean: true
        }
        return res.json(incorrectCredentials)
    }

    const jwt = await generateToken({id: user.id, name: user.name})
    
    res.cookie('_token' ,jwt, { 
        // secure: true,
        sameSite: 'none'
    }) ;


    const login = {
        text: 'Inicio de sesion exitoso',
        icon: 'mdi:mdi-check-circle',
        color: 'blue',
        boolean: true
    }
    return res.json(login)
}

const registrationValidation = async (req) => {
    await check('name').notEmpty().withMessage('Nombre Invalido').run(req)
    await check('lastName').notEmpty().withMessage('Apellido Invalido').run(req)
    await check('email').isEmail().withMessage('Email Invalido').run(req)
    await check('password').isLength({ min: 6}).withMessage('Contraseña Invalida').run(req)
    await check('repeatPassword').equals(req.body.password).withMessage('La contraseña no coinciden').run(req)
    
    const result = validationResult(req)
    return result.isEmpty()

} 

const confirmation = async (req, res) => {
    
    const {token} = req.params
    

    // verificar el token
    const user = await User.findOne({where: {token}})

    // confirmar cuenta
    if(user) {
        user.confirmed = true
        user.token = null
        await user.save()
        const verifiedToken = {
            title: 'Usuario verificado',
            subtitle: 'Tu cuenta ha sido confirmada, ya puedes ',
            link: 'iniciar sesion',
            url: '/auth/login',
            iconInfor: {
                color: '#455517',
                icon: 'mdi:mdi-account-check',
            }
        }
        return res.json(verifiedToken)
    }

    const verifiedToken = {
        title: 'Direccion no valida',
        subtitle: 'Esta direccion ya no es valida, si aun no te haz registrado. ',
        link: 'Registrate aqui',
        url: '/auth/registration',
        iconInfor: {
            color: '#930700',
            icon: 'mdi:mdi-account-cancel',
        }
    }

    return res.json(verifiedToken)
    
    
}

const resetPassword = async (req, res) => {

    const {email} = req.body

    const user = await User.findOne({where: {email}})

    if(!user) {
        const validateEmail = {noSend: true}
        return res.json(validateEmail)
    }
    
    user.token = await generateId()
    await user.save()

    emailForPassword({
        name: user.name,
        email: user.email,
        token: user.token
    })
    const sendEmail = {send: true}
    return res.json(sendEmail)

}

const newPassword = async (req, res) => {
    
    // validando la nueva contraseña
    await check('password').isLength({ min: 6}).withMessage('Contraseña Invalida').run(req)
    await check('repeatPassword').equals(req.body.password).withMessage('La contraseña no coinciden').run(req)
    const result = validationResult(req)

    const {token} = req.params
    const {password} = req.body
    // identificando al usuario
    const user = await User.findOne({where: {token}})

    if(result) {
        // encriptando la nueva contraseña
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        user.token = null
        await user.save()

        const success = {
            title: 'Restablecer contraseña',
            subtitle: 'Tu contraseña se ha cambiado con exito',
            link: 'Iniciar Sesion',
            url: '/auth/login',
            boolean: true
        }
        return res.json(success)
    }   

}
const validateToken = async (req, res) => {
    const {token} = req.params
    // identificando al usuario
    const user = await User.findOne({where: {token}})
    if(!user) {
        const error = {
            title: 'Direccion no valida',
            subtitle: 'Esta direcion no esta disponible',
            link: 'Regresar',
            url: '/auth/login',
            boolean: true
        }
        return res.json(error)
    }
}


export {
    user,
    registerUser,
    loginUser,
    confirmation,
    resetPassword,
    newPassword,
    validateToken
}
