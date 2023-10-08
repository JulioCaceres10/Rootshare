<template>
    <v-container>
        <v-snackbar v-model="snack.boolean" :color="snack.color">
            <p class="text-body-1">{{ snack.title }}</p>
        </v-snackbar>
        <v-row>
            <v-col class="d-block d-md-none py-0" cols="12">
                <!-- vista para dispositivos mobiles -->
                <v-container class="pb-0">
                    <v-card elevation="3">
                        <v-img :src="property.image" style="border-radius: 20px;"></v-img>

                        <v-toolbar-items class="d-flex my-6" style="height: 50px; justify-content: space-around;">
                            <div class="d-none d-sm-block">
                                <v-card-title class="py-0">{{ property.title }}</v-card-title>
                                <v-card-subtitle class="text-subtitle-2">{{ price.name }}</v-card-subtitle>
                                <v-card-subtitle class="text-subtitle-1">{{ property.description }}</v-card-subtitle>
                            </div>
                            <v-toolbar-items>
                                <div class="mx-4 px-4 text-center">
                                    <v-icon icon="mdi:mdi-bed"></v-icon>
                                    <p>{{ property.rooms }}</p>
                                    <v-tooltip activator="parent" location="bottom" text="Habitaciones"></v-tooltip>
                                </div>

                                <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                                <div class="mx-4 px-4 text-center">
                                    <v-icon icon="mdi:mdi-shower"></v-icon>
                                    <p>{{ property.wc }}</p>
                                    <v-tooltip activator="parent" location="bottom" text="Baños"></v-tooltip>
                                </div>

                                <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                                <div class="mx-4 px-4 text-center">
                                    <v-icon icon="mdi:mdi-car-brake-parking"></v-icon>
                                    <p>{{ property.parking }}</p>
                                    <v-tooltip activator="parent" location="bottom" text="Parqueadero"></v-tooltip>
                                </div>
                            </v-toolbar-items>

                        </v-toolbar-items>
                    </v-card>
                    <div class="mt-4">
                        <h1 class="d-block d-sm-none">{{ property.title }}</h1>
                        <p class="text-subtitle-2 d-block d-sm-none">{{ price.name }}</p>
                        <p class=" d-block d-sm-none text-body-1">{{ property.description }}</p>
                    </div>
                </v-container>
            </v-col>

            <v-col cols="12" md="8">
                <v-container>
                    <v-card elevation="0">
                        <v-img class="d-none d-md-flex mb-5" :src="property.image" alt="Imagen de la propiedad" height="530"
                            cover style="border-bottom-left-radius: 150px"></v-img>
                        <h3 class="text-h5 font-weight-bold">Ubicacion</h3>
                        <v-card-text class="text-body-1 font-weight-medium">{{ property.city }}</v-card-text>
                    </v-card>
                    <v-card id="map" height="350"></v-card>
                </v-container>
                <v-card-text v-if="store.state.token && !propertyOwner" class="text-center d-block d-md-none">
                    <v-form ref="form" @submit.prevent="sendMessage">
                        <v-textarea label="Enviar mensaje al vendedor" variant="solo" :rules="rulesMessage"
                            v-model="send.message"></v-textarea>
                        <v-btn block color="info" type="submit">ENVIAR</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text v-if="!store.state.token" class="text-center d-block d-md-none">
                    <v-card-title class="text-body-1 font-weight-bold">Enviar mensaje al propietario</v-card-title>
                    <v-btn class="text-capitalize" color="secondary" variant="tonal"
                        @click=" router.push({ name: 'signin' })">Iniciar Sesion</v-btn>
                    <v-btn class="text-capitalize" color="info" variant="text"
                        @click=" router.push({ name: 'signup' })">Crear Cuenta</v-btn>
                </v-card-text>

            </v-col>

            <v-col sm="5" md="4" class="my-5 d-none d-sm-none d-md-flex">
                <v-card class="pa-4" min-width="320" style="position: fixed;">
                    <v-card-subtitle class=" py-0 font-weight-bold">{{ category.name }}</v-card-subtitle>
                    <v-card-title class="text-h5 truncate py-0 font-weight-bold">{{ property.title }}</v-card-title>
                    <v-card-title class="text-subtitle-1 pt-0 font-weight-bold">{{ price.name }}</v-card-title>

                    <v-divider class="my-4 border-opacity-25 " :thickness="2"></v-divider>
                    <v-toolbar-items class="d-flex " style="height: 50px; justify-content: center; align-items: center;">

                        <div class="mx-4 px-4 text-center">
                            <v-icon class="text-h4" icon="mdi:mdi-bed"></v-icon>
                            <p>{{ property.rooms }}</p>
                            <v-tooltip activator="parent" location="bottom" text="Habitaciones"></v-tooltip>
                        </div>

                        <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                        <div class="mx-4 px-4 text-center">
                            <v-icon class="text-h4" icon="mdi:mdi-shower"></v-icon>
                            <p>{{ property.wc }}</p>
                            <v-tooltip activator="parent" location="bottom" text="Baños"></v-tooltip>
                        </div>

                        <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                        <div class="mx-4 px-4 text-center">
                            <v-icon class="text-h4" icon="mdi:mdi-car-brake-parking"></v-icon>
                            <p>{{ property.parking }}</p>
                            <v-tooltip activator="parent" location="bottom" text="Parqueadero"></v-tooltip>
                        </div>

                    </v-toolbar-items>
                    <v-divider class="mt-4 border-opacity-25 " :thickness="2"></v-divider>
                    <v-card-title class="text-h6 mt-4 pb-0 font-weight-bold">Descripcion</v-card-title>
                    <v-card-text class=" text-subtitle-1 pt-0 font-weight-medium">{{ property.description }}</v-card-text>
                    <v-card-text v-if="store.state.token && !propertyOwner">
                        <v-form v-if="!snack.send" ref="form" @submit.prevent="sendMessage">
                            <v-textarea label="Enviar mensaje al vendedor" placeholder="Texto, Correo, Telefono" variant="solo" :rules="rulesMessage"
                                v-model="send.message"></v-textarea>
                            <v-btn block color="info" type="submit">ENVIAR</v-btn>
                        </v-form>
                        <div v-if="snack.send" class="text-center">
                            <v-icon color="success" style="font-size: 100px"
                             icon="mdi:mdi-check-circle-outline"></v-icon>
                            <v-card-title>{{ snack.title }}</v-card-title>
                        </div>

                    </v-card-text>
                    <v-card-text v-if="!store.state.token" class="text-center">
                        <v-card-title class="text-body-1 font-weight-bold">Enviar mensaje al propietario</v-card-title>
                        <v-btn class="text-capitalize mb-2" color="secondary" variant="tonal"
                            @click=" router.push({ name: 'signin' })">Iniciar Sesion</v-btn>
                        <v-btn class="text-capitalize" color="info" variant="text"
                            @click=" router.push({ name: 'signup' })">Crear Cuenta</v-btn>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>



    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import leaflet from 'leaflet'
import store from '@/store';

const route = useRoute()
const router = useRouter()

const form = ref()
const send = ref({
    message: ''
})
const rulesMessage = [value => value?.length > 15 || 'Mensaje invalido']

const snack = ref({
    title: '',
    color: '',
    boolean: false,
    send: false
})

const propertyOwner = ref(null)
const property = ref({})
const category = ref({})
const price = ref({})

let map
let reverseGeocoder = new BDCReverseGeocode();

// funcion del mapa
const mapProperty = () => {
    let marker
    map = leaflet.map('map').setView([property.value.latitude, property.value.length], 15)

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = new leaflet.marker([property.value.latitude, property.value.length], {
    }).addTo(map)

    reverseGeocoder.getClientLocation({
        latitude: property.value.latitude,
        longitude: property.value.length,
    }, function (data) {
        marker.bindPopup(`<b>${data.city} - ${data.countryName}</b><br>${data.locality}.`).openPopup()
    });


}

// enviar del mensaje al propietario
const sendMessage = async () => {

    // validar formulario
    const valid = await form.value.validate()
    console.log(valid.valid)
    if (!valid.valid) return

    // enviar mensaje
    await fetch(`https://api-rootshare.onrender.com/public/property/${route.params.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'authToken': store.state.token
        },
        body: JSON.stringify(send.value)
    }).then(async response => {
        const resDB = await response.json()
        snack.value = resDB
    }).catch(error => console.log(error))
        .finally(() => send.value.message = null)


}



onMounted(async () => {
    const response = await fetch(`https://api-rootshare.onrender.com/public/property/${route.params.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            'authToken': $cookies.get("_token")
        },
    })
    try {
        const resDB = await response.json()
        if (resDB.error) {
            return router.replace('/property-not-found')
        }
        property.value = resDB.data
        category.value = resDB.data.category
        price.value = resDB.data.price
        propertyOwner.value = resDB.owner
    } catch (error) {
        console.log(error)
    }
    await mapProperty()


})
</script>

<style></style>
