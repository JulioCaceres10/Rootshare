<template>
    <v-container fluid>
        <v-snackbar v-model="snackbar.boolean" :color="snackbar.color"  elevation="24" timeout="5000">
            <div class="d-flex" style="justify-content: space-between;">
                {{snackbar.text}}
                <v-icon :icon="snackbar.icon"></v-icon>
            </div>
            
        </v-snackbar>

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

        <v-row class="px-10 mt-1 contentLogin">
            <v-col class="bg-blue-lighten-5 d-none d-md-flex rounded-lg mx-3" md="6.5"
                style="height: 100%; width: 100%; justify-content: center; align-items: center">

                <div class="imgContentLogin d-flex"
                    style="width: 450px; height: 450px; justify-content: center; align-items: center ">
                    <v-img class="imgLogin" src="@/assets/IMG/casaModerna-2.jpg" cover />
                </div>


                <div class="cardLogin">
                    <v-card class="cardPrice" width="250">
                        <v-card-item>
                            <v-card-subtitle>Precio total (COP)</v-card-subtitle>
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-icon class="mt-1" icon="mdi:mdi-currency-usd" />
                                <v-card-title class="">8.5 M</v-card-title>
                            </div>
                        </v-card-item>

                    </v-card>
                    <v-card class="cardLocation rounded-pill " width="250" height="65">
                        <v-card-item>
                            <v-card-subtitle>Direccion (Colombia)</v-card-subtitle>
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-icon class="mt-1" icon="mdi:mdi-map-marker-outline" />
                                <v-card-title class="mx-2">Pance - Cali</v-card-title>
                            </div>
                        </v-card-item>
                    </v-card>
                    <v-card class="cardTransaction rounded-pill " width="250" height="65">
                        <v-card-item>
                            <v-card-subtitle>Transaccion (Tipo)</v-card-subtitle>
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-icon class="mt-1" icon="mdi:mdi-sync" />
                                <v-card-title class="mx-2">En arriendo</v-card-title>
                            </div>
                        </v-card-item>
                    </v-card>
                </div>

            </v-col>
            <v-col class="rounded-lg signin" md="5">
                <h1>Bienvenido a <span class="font-weight-regular" style="color: #455517;">Rootshare</span></h1>
                <p class="text-grey-lighten-1">Invertir en bienes raices no habia sido tan facil como ahora</p>
                <h2 class="mt-5">Iniciar sesion</h2>
                <v-form class="mt-5" @submit.prevent="submit">
                    <v-text-field label="Email" type="email" name="email" v-model="email.value.value"
                        :error-messages="email.errorMessage.value" variant="solo"></v-text-field>
                    <v-text-field label="Contraseña" type="password" name="password" v-model="password.value.value"
                        :error-messages="password.errorMessage.value" variant="solo"></v-text-field>
                    <div class="btnsLogin d-flex mt-2" style="justify-content: space-around;">
                        <v-btn class="btnCreat" height="40" type="submit">Iniciar sesion</v-btn>
                        <V-btn class="btnLogin" height="40" to="/auth/registration">Crear Cuenta</V-btn>
                    </div>
                    <div class="mt-2 text-center" style="width: 100%;">
                        <v-btn class="text-capitalize" variant="plain" color="blue" to="/auth/forgotpassword">¿Has olvidado
                            tu contraseña?</v-btn>
                    </div>


                </v-form>

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter()

const snackbar = ref({
    text: '',
    icon: '',
    color: '',
    boolean: false
})

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-z.0-9.-._]+@[a-z.0-9]+\.[a-z]+$/i.test(value)) return true

            return 'Email invalido'
        },
        password(value) {
            if (value?.length >= 7) return true

            return 'Contraseña invalida'
        },
    },
})

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async values => {
    await fetch('https://api-rootshare.onrender.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
        .then(async response => {
            // respuesta del backend
            const resDB = await response.json()
            snackbar.value = resDB
            await store.commit('setToken', $cookies.get('_token') || null)
            if(store.state.token !== null) return router.push({ name: 'dashboard' })
        })
        .catch(err => console.log(err))
        

})

onBeforeMount(() => {
    if(store.state.token !== null ) return router.replace({ name: 'dashboard' })
})


</script>

<style>
.contentLogin {
    height: 85vh;
}

.imgLogin {
    height: 100%;
    width: 100%;
    border-radius: 100%;
}

div.cardLogin .cardPrice {
    position: absolute;
    top: 70%;
    left: 9%;
}

div.cardLogin .cardLocation {
    position: absolute;
    top: 20%;
    left: 25%;
}

div.cardLogin .cardTransaction {
    position: absolute;
    left: 40%;
}

div.btnsLogin .btnCreat {
    width: 45%;
    color: white;
    background: linear-gradient(to right, #619dfd, #1560d8);
}

div.btnsLogin .btnLogin {
    width: 45%;
    background: white;
    color: #1560d8;
}

.signin {
    padding: 0 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5%;
}

@media (max-width: 960px) {
    .signin {
        padding: 0 20%;
    }

    .contentLogin {
        height: 70vh;
    }
}

@media (max-width: 600px) {
    .signin {
        padding: 0 8%;
    }

    div.btnsLogin {
        flex-direction: column;
        width: 100%;
    }

    div.btnsLogin .btnCreat {
        width: 100%;
        margin-bottom: 10px;
    }

    div.btnsLogin .btnLogin {
        width: 100%;

    }

}
</style>
