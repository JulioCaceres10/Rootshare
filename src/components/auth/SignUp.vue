<template>
    <v-container fluid>
        <div class="bg-blue-lighten-5 rounded-lg px-4 d-none d-sm-flex d-md-none"
            style=" height: 130px; width: 100%;justify-content: space-around; ">
            <div class="d-flex" style="align-items: center;">
                <v-img style="height: 120px; width: 120px; border-radius: 100%;" src="@/assets/IMG/casaModerna-3.jpg" cover />

            </div>
            <div class="d-flex ml-4" style="height: 100%; align-items: center;">
                <v-card class="cardLocation rounded-pill ml-4" width="200" height="70">
                    <v-card-item>
                        <v-card-subtitle>Direccion (Colombia)</v-card-subtitle>
                        <v-divider></v-divider>
                        <div class="d-flex">
                            <v-icon class="mt-1" icon="mdi:mdi-map-marker-outline" />
                            <v-card-title class="mx-2">Medellin</v-card-title>
                        </div>
                    </v-card-item>
                </v-card>
                <v-card class="cardTransaction rounded-pill ml-4" width="200" height="70">
                    <v-card-item>
                        <v-card-subtitle>Transaccion (Tipo)</v-card-subtitle>
                        <v-divider></v-divider>
                        <div class="d-flex">
                            <v-icon class="mt-1" icon="mdi:mdi-sync" />
                            <v-card-title class="mx-2">En venta</v-card-title>
                        </div>
                    </v-card-item>
                </v-card>

            </div>


        </div>

        <v-row class="px-5 mt-1 contentRegister">
            <v-col class="bg-blue-lighten-5 rounded-lg mx-3 d-none d-md-flex" md="6.5"
                style="height: 100%; width: 100%; justify-content: center; align-items: center">

                <div class="imgContentRegister d-flex"
                    style="width: 450px; height: 450px; justify-content: center; align-items: center ">
                    <v-img class="imgRegister" src="@/assets/IMG/casaModerna-1.jpg" cover />
                </div>


                <div class="cardRegister">
                    <v-card class="cardPrice" width="250">
                        <v-card-item>
                            <v-card-subtitle>Precio total (COP)</v-card-subtitle>
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-icon class="mt-1" icon="mdi:mdi-currency-usd" />
                                <v-card-title class="">1.389 M</v-card-title>
                            </div>
                        </v-card-item>

                    </v-card>
                    <v-card class="cardLocation rounded-pill " width="250" height="65">
                        <v-card-item>
                            <v-card-subtitle>Direccion (Colombia)</v-card-subtitle>
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-icon class="mt-1" icon="mdi:mdi-map-marker-outline" />
                                <v-card-title class="mx-2">Palmas - Medellin</v-card-title>
                            </div>
                        </v-card-item>
                    </v-card>
                    <v-card class="cardTransaction rounded-pill " width="250" height="65">
                        <v-card-item>
                            <v-card-subtitle>Transaccion (Tipo)</v-card-subtitle>
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-icon class="mt-1" icon="mdi:mdi-sync" />
                                <v-card-title class="mx-2">En venta</v-card-title>
                            </div>
                        </v-card-item>
                    </v-card>
                </div>

            </v-col>
            <v-col class="rounded-lg signup" md="5">
                <div :class=" !accountCreated ? '' : 'd-none'">
                    <h1>Bienvenido a <span class="font-weight-regular" style="color: #455517;">Rootshare</span></h1>
                    <h2>Crear tu cuenta</h2>
                    <v-form class="mt-5" @submit.prevent="singUp">
                        <v-row>
                            <v-col class="py-0" cols="12" sm="6" md="6">
                                <v-text-field label="Nombre" name="name" v-model="name.value.value"
                                    :error-messages="name.errorMessage.value" variant="solo"></v-text-field>
                            </v-col>
                            <v-col class="pt-0" cols="12" sm="6" md="6">
                                <v-text-field label="Apellido" name="lastName" v-model="lastName.value.value"
                                    :error-messages="lastName.errorMessage.value" variant="solo"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field class="password" label="Email" name="email" v-model="email.value.value"
                            :error-messages="email.errorMessage.value" variant="solo"></v-text-field>
                        <v-text-field class="repeatPassword" label="Contraseña" name="password"
                            v-model="password.value.value" :error-messages="password.errorMessage.value"
                            :type="seePassword ? 'text' : 'password'"
                            :append-inner-icon="seePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                            @click:append-inner="toggleSeePassword" variant="solo"></v-text-field>
                        <v-text-field label="Repetir Contraseña" name="repeatPassword" v-model="repeatPassword.value.value"
                            :error-messages="repeatPassword.errorMessage.value" type="password"
                            variant="solo"></v-text-field>
                        <div class="btnsRegister d-flex" style="justify-content: space-around;">
                            <v-btn class="btnCreat" height="40" type="submit">Crear Cuenta</v-btn>
                            <V-btn class="btnLogin mb-5" height="40" to="/auth/login">Iniciar sesion</V-btn>
                        </div>
                    </v-form>
                </div>

                <div :class=" accountCreated ? 'd-flex' : 'd-none'" style=" flex-direction: column;">
                    <h1 class="font-weight-regular text-center" style="color: #455517;">Rootshare</h1>
                    <h1 class="text-h2 text-center mb-4" ><v-icon icon="far fa-circle-check" color="#455517"></v-icon></h1>
                    <h1 class="text-center text-h5">Cuenta creada correctamente</h1>
                    <p class="text-center text-subtitle-1">Hemos enviado un email de confirmacion, presiona en el enlace</p>
                    
                </div>


            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm, } from 'vee-validate'

const emailExists = ref(false)
const accountCreated = ref(false)
const confirmedRepeatPassword = ref(false)
const seePassword = ref(false)

// form validation
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 3) return true
            if (value?.length === undefined || value?.length <= 0) return 'Campo vacio'
            return 'Nombre invalido'
        },
        lastName(value) {
            if (value?.length >= 3) return true
            if (value?.length === undefined || value?.length <= 0) return 'Campo vacio'
            return 'Apellido invalido'
        },
        email(value) {
            if (value?.length === undefined || value?.length <= 0) return 'Campo vacio'
            if (emailExists.value) return 'Email ya existe'
            if (/^[a-z.0-9.-._]+@[a-z.0-9]+\.[a-z]+$/i.test(value)) return true
            return 'Email invalido'
        },
        password(value) {
            if (value?.length >= 7) return true
            if (value?.length === undefined || value?.length <= 0) return 'Campo vacio'
            return 'Contraseña invalida'
        },
        repeatPassword(value) {
            if (value?.length === undefined || value?.length <= 0) return 'campo vacio'
            if (confirmedRepeatPassword.value) return 'La contraseña no coincide'
            return true
        }
    },
})

const name = useField('name')
const lastName = useField('lastName')
const email = useField('email')
const password = useField('password')
const repeatPassword = useField('repeatPassword')

// Valida el repetir contraseña
const singUp = async () => {
    if (password.value.value !== repeatPassword.value.value) {
        confirmedRepeatPassword.value = true

    }
    await submit()
    confirmedRepeatPassword.value = false
    emailExists.value = false


}



const submit = handleSubmit(async (values) => {
    try {
        const res = await fetch('https://api-rootshare.onrender.com/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })  
        const resDB = await res.json()

        // si el email esta repetido se reinicia la funcion para que aparezca el error en pantalla
        if (resDB.email) {
            emailExists.value = resDB.email
            return singUp()

        }

        // dato boleano, confirma la creacion de la cuenta para que cambie la ventana
        // la ventana es de confirmar el email
        accountCreated.value = resDB.accountCreated


    } catch (error) {
        console.log(error)
    }
    handleReset()

})

// Mostrar contraseña
const toggleSeePassword = () => {
    seePassword.value = !seePassword.value
}









</script>

<style>
.contentRegister {
    height: 85vh;
}

.imgRegister {
    height: 100%;
    width: 100%;
    border-radius: 100%;
}

div.cardRegister .cardPrice {
    position: absolute;
    top: 70%;
    left: 9%;
}

div.cardRegister .cardLocation {
    position: absolute;
    top: 20%;
    left: 25%;
}

div.cardRegister .cardTransaction {
    position: absolute;
    left: 40%;
}

div.btnsRegister .btnCreat {
    width: 45%;
    color: white;
    background: linear-gradient(to right, #619dfd, #1560d8);
}

div.btnsRegister .btnLogin {
    width: 45%;
    background: white;
    color: #1560d8;
}

.signup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5%;

}


@media (max-width: 960px) {
    .signup {
        padding: 0 15%;
        margin-bottom: 50px;
    }

    .contentRegister {
        height: 70vh;
    }
}

@media (max-width: 600px) {
    .signup {
        padding: 0 10%;
    }
     div.btnsRegister {
        flex-direction: column;
        width: 100%;
     }
     div.btnsRegister .btnCreat {
        width: 100%;
        margin-bottom: 10px;
     }
     div.btnsRegister .btnLogin {
        width: 100%;
        
     }
}

</style>
