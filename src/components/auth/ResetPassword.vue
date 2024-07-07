<template>
    <v-container class="d-flex" style="justify-content: center; align-items: center" fluid>

        <v-snackbar v-model="snackbar.value" timeout="2000">

            
        </v-snackbar>

        <div class="rounded-lg newPassword" :class="information.boolean ? 'd-none' : '' " md="5">
            <h1>Restablecer contraseña</h1>
            <h3 class="text-grey-darken-4 font-weight-regular mt-3 mb-2">Introduce tu nueva contraseña</h3>
            <v-form @submit.prevent="newPassword">
                <v-text-field label="Nueva Contraseña" type="password" name="password" variant="solo"
                    v-model="password.value.value" :error-messages="password.errorMessage.value"></v-text-field>
                <v-text-field label="Repetir Nueva Contraseña" type="password" name="repeatPassword" variant="solo"
                    v-model="repeatPassword.value.value" :error-messages="repeatPassword.errorMessage.value"></v-text-field>
                <div class="btnsNewPassword d-flex mt-2" style="justify-content: space-around;">
                    <v-btn class="btn" width="180" height="40" type="submit" block>Confirmar</v-btn>
                </div>

            </v-form>

        </div>
        <div class="text-center mt-10" :class="information.boolean ? '' : 'd-none'" md="5">
                <h1>{{information.title}}</h1>
                <h3>{{ information.subtitle }}</h3>
                <v-btn color="blue" width="180" height="40" variant="plain" style="cursor: pointer;" :to="{path: information.url}">{{information.link}}</v-btn>
            </div>
    </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useField, useForm } from 'vee-validate';

const route = useRoute()
const confirmedRepeatPassword = ref(false)
const snackbar = ref(false)
const information = ref({
    title: '',
    subtitle: '',
    link: '',
    url: '',
    boolean: null
})

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
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
const password = useField('password')
const repeatPassword = useField('repeatPassword')

const newPassword = async () => {
    if (password.value.value !== repeatPassword.value.value) {
        confirmedRepeatPassword.value = true

    }
    await submit()
    confirmedRepeatPassword.value = false
}

const submit = handleSubmit(async values => {
    const token = route.params.token
    await fetch(`https://api-rootshare.up.railway.app/auth/initialize/recovery/${token}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
        .then(async response => {
            const resDB = await response.json()
            information.value = resDB
        })
        .catch(err => console.error(err))

})

onBeforeMount(async () =>{
    const token = route.params.token
    await fetch(`https://api-rootshare.up.railway.app/auth/initialize/recovery/${token}`, { 
        })
        .then( async res => {
            const resDB = await res.json()
            information.value = resDB
            
        })
        .catch(error => console.log(error))
})


</script>

<style>
.newPassword {
    padding: 40px 5%;
    width: 550px
}

div.btnsNewPassword .btn {
    color: white;
    background: linear-gradient(to right, #619dfd, #1560d8);
}
</style>
