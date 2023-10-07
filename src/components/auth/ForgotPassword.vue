<template>
    <v-container class="d-flex" style="justify-content: center; align-items: center" fluid >
       
            <div class="rounded-lg forgotPassword" :class=" sendEmail ? 'd-none' : '' " md="5">
                <h1>Bienvenido a <span class="font-weight-regular" style="color: #455517;">Rootshare</span></h1>
                <h2>Ayuda con la contraseña</h2>
                <p class="text-grey-darken-4 mt-5">Escribe la dirección de correo electrónico asociado a tu cuenta de Rootshare.</p>
                <v-form @submit.prevent="submit">
                    <v-text-field label="Email" type="email" name="email" v-model="email.value.value" :error-messages="email.errorMessage.value" variant="solo"></v-text-field>
                    <div class="btnsForgotPassword d-flex mt-2" style="justify-content: space-around;">
                        <v-btn class="btn" width="180" height="40" type="submit" block>Continuar</v-btn>
                    </div>
                    <div class="d-flex mt-2" style="justify-content: space-around;">
                        <v-btn color="blue" width="180" height="40" variant="plain" to="/auth/login">Iniciar Sesion</v-btn>
                    </div>

                </v-form>

            </div>
            <div class="text-center" :class=" sendEmail ? '' : 'd-none'" md="5">
                <h1>Restablecer contraseña</h1>
                <p>se ha enviado un email con las instruciones para restablecer tu contraseña</p>

            </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

const emailNotRegister = ref(false)
const sendEmail = ref(false)

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        email(value) {
            if(value?.length === undefined || value?.length <= 0) return 'Campo vacio'
            if(emailNotRegister.value) return 'Email no registrado'
            if (/^[a-z.0-9.-._]+@[a-z.0-9]+\.[a-z]+$/i.test(value)) return true    
            return 'Email invalido'
        },
    },
})

const email = useField('email')

const submit = handleSubmit( async values => {
    await fetch('https://api-rootshare.onrender.com/auth/reset/password', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then(async response => {
        const responseDB = await response.json()
        if(responseDB.noSend) {
            emailNotRegister.value = responseDB.noSend
            setTimeout(() => {
                emailNotRegister.value = false
            }, 2000);
            return submit()
        }
        sendEmail.value = responseDB.send
    })
    .catch(error => console.log(error))
    console.log (JSON.stringify(values, null, 2))
})




</script>

<style>
.forgotPassword{
    padding: 40px 5%;
    width: 550px
}

div.btnsForgotPassword .btn {
    color: white;
    background: linear-gradient(to right, #619dfd, #1560d8);
}

</style>
