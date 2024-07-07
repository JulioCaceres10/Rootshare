<template>
    <v-container class="d-flex" style="height: 70%; justify-content: center; align-items: center;">
        <div class="text-center">
            <v-icon :icon="verifiedToken.iconInfor.icon" :color="verifiedToken.iconInfor.color" style="font-size:100px"></v-icon>
            <h1>{{ verifiedToken.title }}</h1>
            <h3> {{ verifiedToken.subtitle }} <router-link class="text-decoration-none" :to="verifiedToken.url">{{ verifiedToken.link }}</router-link> </h3>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

let verifiedToken = ref({
     title: '',
        subtitle: '',
        link: '',
        url: '',
        iconInfor: {
            color: '',
            icon: '',
        }
})
onBeforeMount(async () => {
    const route = useRoute()
    const token = route.params.token
    await fetch(`https://api-rootshare.up.railway.app/auth/confirmation/${token}`, { 
            method: 'PUT'
        })
        .then( async res => {
            const resDB = await res.json()
            verifiedToken.value = resDB
            
        })
        .catch(error => console.log(error))
})

</script>
