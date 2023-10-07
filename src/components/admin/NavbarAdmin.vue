<template>
    <!-- Navbar -->
    <v-app-bar class="px-5" elevation="1">
        <v-app-bar-title>
            <router-link to="/" style="height: 400px; "> ROOTSHARE
                <v-img class="logoNavAuth" src="@/assets/IMG/logo.png" style="height: 40px; display: inline-flex;"></v-img>
            </router-link>
        </v-app-bar-title>
            

        <div class="d-none d-md-flex" style="flex-direction: row; align-items: center;">
            <v-btn v-if="route.path === '/properties'" class="rounded-xl text-capitalize mr-3" width="180" color="secondary"
                variant="outlined" @click="actionNewProperty(true)">Nueva
                propiedad</v-btn>
            <v-toolbar-items style="align-items: center;">
                <ul class="navigationApp d-flex" style="flex-direction: row;">
                    <li>
                        <router-link :class="route.path === '/' ? 'active' : ''" class="text-decoration-none mx-3" :to="{name: 'dashboard'}"><a>Inicio</a></router-link>
                    </li>
                    <li>
                        <router-link :class="route.path === '/properties' ? 'active' : ''" class="text-decoration-none mx-3"
                            :to="{ name: 'properties' }"><a>Mis Propiedades</a></router-link>
                    </li>
                    <li>
                        <router-link :class="perfil ? 'active' : ''" class="text-decoration-none mx-3" :to="{}"
                            @click="user(0)"><a>Mi Perfil</a></router-link>
                    </li>
                </ul>

            </v-toolbar-items>
            <v-btn v-if="store.state.token" class="text-capitalize ml-5" color="secondary" variant="tonal"
                @click="signOff()">Cerrar Sesion</v-btn>
            <v-btn v-if="!store.state.token" class="text-capitalize ml-5" color="secondary" variant="tonal"
                @click=" router.push({ name: 'signin' })">Iniciar Sesion</v-btn>
            <v-btn v-if="!store.state.token" class="text-capitalize ml-5" color="secondary" variant="text"
                @click=" router.push({ name: 'signup' })">Crear Cuenta</v-btn>
        </div>
        <v-btn class="d-flex d-md-none" :icon="drawer ? 'mdi:mdi-close' : 'mdi:mdi-menu'" @click="drawer = !drawer"
            style="font-size: 25px;"></v-btn>
    </v-app-bar>

    <!-- Navbar para mobiles -->
    <v-navigation-drawer v-model="drawer" location="right" temporary style="width: 100%;">
        <div class="px-4" style="align-items:end; height: 95%">
            <v-toolbar-items>
                <ul class="navigationDrawer">
                    <li>
                        <router-link :class="route.path === '/' ? 'active' : ''" :to="{name: 'dashboard'}"><a>Inicio</a></router-link>
                    </li>
                    <li>
                        <router-link :class="route.path === '/properties' ? 'active' : ''" :to="{ name: 'properties' }"><a>Mis Propiedades</a></router-link>
                    </li>
                    <li>
                        <router-link :class="perfil ? 'active' : ''" :to="{}"  @click="user(1)"><a>Mi Perfil</a></router-link>
                    </li>
                </ul>

            </v-toolbar-items>
            <v-btn v-if="store.state.token" class="text-capitalize ml-5" color="secondary" variant="tonal"
                @click="signOff()">Cerrar Sesion</v-btn>
            <v-btn v-if="!store.state.token" class="text-capitalize ml-5" color="secondary" variant="tonal"
                @click=" router.push({ name: 'signin' })">Iniciar Sesion</v-btn>
            <v-btn v-if="!store.state.token" class="text-capitalize ml-5" color="secondary" variant="text"
                @click=" router.push({ name: 'signup' })">Crear Cuenta</v-btn>
        </div>
    </v-navigation-drawer>


    <!-- Drawer para mostrar el perfil -->
    <v-navigation-drawer v-model="perfil" location="right" temporary width="350">
        <div class="px-4 d-flex" style="justify-content: space-between;">
            <p class="text-subtitle-1 mt-3">Perfil</p>
            <v-btn class="d-flex d-md-none" icon="mdi:mdi-close" @click="perfil = !perfil" variant="text"></v-btn>
        </div>
        <v-card v-if="!store.state.token" class="px-2 py-5 text-center" elevation="0">
            <v-card-title class="text-h6 font-weight-medium">Aun no has iniciado sesion</v-card-title>
            <v-card-actions style="flex-direction:column">
                <v-btn class="text-capitalize mt-4" color="secondary" variant="tonal"
                    @click=" router.push({ name: 'signin' })" width="200">Iniciar Sesion</v-btn>
                <v-btn class="text-capitalize mt-2 mx-0" color="info" variant="text"
                    @click=" router.push({ name: 'signup' }) " width="200">Crear Cuenta</v-btn>
            </v-card-actions>

        </v-card>

        <v-card v-if="store.state.token" class="px-2 py-5" elevation="0">
            <v-card-title class="text-h5 text-center py-0 font-weight-medium">{{ infoUser.name }} {{ infoUser.lastName
            }}</v-card-title>
            <v-card-subtitle class="text-center py-0">{{ infoUser.email }}</v-card-subtitle>
            <v-toolbar-items class="d-flex mt-6 " style="height: 50px; justify-content: center; align-items: center;">

                <div class="mx-4 px-4 text-center">
                    <v-icon icon="mdi:mdi-home"></v-icon>
                    <p>{{ store.state.dataBase.length }}</p>
                    <v-tooltip activator="parent" location="bottom" text="Propiedades"></v-tooltip>
                </div>

                <v-divider class="border-opacity-20" :thickness="2" vertical></v-divider>

                <div class="mx-4 px-4 text-center">
                    <v-icon icon="mdi:mdi-close"></v-icon>
                    <p>{{ infoProperties.notPublished }}</p>
                    <v-tooltip activator="parent" location="bottom" text="No Publicado"></v-tooltip>
                </div>

                <v-divider class="border-opacity-20" :thickness="2" vertical></v-divider>

                <div class="mx-4 px-4 text-center">
                    <v-icon icon="mdi:mdi-check"></v-icon>
                    <p>{{ infoProperties.published }}</p>
                    <v-tooltip activator="parent" location="bottom" text="Publicado"></v-tooltip>
                </div>

            </v-toolbar-items>
        </v-card>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import store from '@/store';

const router = useRouter()
const route = useRoute()


const props = defineProps(['actionNewProperty'])
const drawer = ref(false)
const perfil = ref(false)
const infoUser = ref({})
const infoProperties = ref({
    notPublished: null,
    published: null
})

const signOff = () => {
    router.replace({ name: 'signin' })
    $cookies.remove('_token')
    store.commit('setToken', null)
}

const user = async (e) => {
    perfil.value = !perfil.value
    

    // aprobar la desactivacion del drawer solo en moviles
    if(e) drawer.value = !drawer.value

     // datos de propiedades
     const resDB = await fetch("https://api-rootshare.onrender.com/admin/properties", {
        headers: {
            'authToken': store.state.token,
        },
    })
    try {
        const res = await resDB.json()
        await store.commit('setDataBase', res)
    } catch (error) {
        console.log(error)
    }
    

    // mostrar cuantas propiedades son o no publicas
    let published = 0
    let notPublished = 0
    for (let index = 0; index < store.state.dataBase.length; index++) {
        const element = store.state.dataBase[index];
        if (element.published) { published = published + 1 } else { notPublished = notPublished + 1 }
    }
    infoProperties.value.notPublished = notPublished
    infoProperties.value.published = published

    // traer informacion del usuario
    const response = await fetch('https://api-rootshare.onrender.com/admin', {
        headers: {
            'Content-Type': 'application/json',
            'authToken': store.state.token
        }
    })
    try {
        const resDB = await response.json()
        infoUser.value = resDB
    } catch (error) {
        console.log(error)
    }

   
}




</script>

<style>
/* Navigation AppBar */
.navigationApp li {
    list-style: none;
}

.navigationApp li a {
    position: relative;
    text-decoration: none;
    font-size: 0.9em;
    font-weight: 500;
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    cursor: pointer;
}

.navigationApp li a::before {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: rgb(82, 209, 167);
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
    transform-origin: right;
}

.navigationApp li a:hover::before {
    transform: scaleX(1);
    transform-origin: left;
}

.navigationApp .active::before {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: rgb(82, 209, 167);
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
    transform-origin: right;
    transform: scaleX(1);
    transform-origin: left;
}

/* Navigation Drawer */
.navigationDrawer li {
    list-style: none;
    margin-top: 20px;

}

.navigationDrawer li a {
    position: relative;
    text-decoration: none;
    font-size: 1em;
    font-weight: 400;
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    cursor: pointer;
}

.navigationDrawer li a::before {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: rgb(82, 209, 167);
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
    transform-origin: right;
}

.navigationDrawer li a:hover::before {
    transform: scaleX(1);
    transform-origin: left;
}

.navigationDrawer .active::before {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: rgb(82, 209, 167);
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
    transform-origin: right;
    transform: scaleX(1);
    transform-origin: left;
}
</style>
