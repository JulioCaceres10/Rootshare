import nodemailer from 'nodemailer';

const emailRegister = async (datas) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // enviar email para confirmacion de cuenta
      const {name, email, token} = datas
      await transport.sendMail({
        from: 'Rootshare',
        to: email,
        subject: 'Confirma tu cuenta en Rootshare',
        text: 'Confirma tu cuenta en Rootshare',
        html: `
        <p> Hola ${name}, comprueba tu cuenta en Rootshare</p>
        <p> Tu cuenta ya esta lista solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 8080}/auth/confirmation/${token}">Confirmar cuenta</a> </p>
        <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
      })
}

const emailForPassword = async (datas) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // enviar email para confirmacion de cuenta
    const {name, email, token} = datas
    await transport.sendMail({
      from: 'Rootshare',
      to: email,
      subject: 'Restablecer contraseña en Rootshare',
      text: 'Restablecer contraseña en Rootshare',
      html: `
      <p> Hola ${name}, has solicitado el restablecimiento de tu contraseña</p>
      <p> sigue las instrucciones, presiona el siguiente enlace:
      <a href="${process.env.BACKEND_URL}/initialize/recovery/${token}">Restablecer contraseña</a> </p>
      <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      `
    })
}

export {
    emailRegister,
    emailForPassword
}