<template>
    <v-container fluid>
        <NavbarAdmin :actionNewProperty="actionProperty" />

        <h1 class="text-h4 my-5">Mis Propiedades</h1>
        <v-btn class="mt-5 rounded-xl text-capitalize d-flex d-md-none" width="200" color="secondary" variant="outlined"
            @click="actionProperty(true)">Nueva propiedad</v-btn>


        <v-dialog v-model="props.newPropertyBoolean" persistent width="950">
            <v-card>
                <v-card-title>
                    Informacion General
                </v-card-title>
                <v-card-subtitle class="text-subtitle-1">
                    Añadir informacion de la propiedad
                </v-card-subtitle>
                <v-form class="mt-5 mb-10 pa-6" @submit.prevent="">
                    <v-text-field name="title" v-model="title.value.value" :error-messages="title.errorMessage.value"
                        label="Titulo de prodiedad" placeholder="ej. Casa en la playa" variant="solo"></v-text-field>
                    <v-textarea label="Descripcion" name="descripcion" v-model="description.value.value"
                        :error-messages="description.errorMessage.value" variant="solo"></v-textarea>
                    <v-row>
                        <v-col class="pb-0 pt-md-3" cols="12" md="6">
                            <v-select chips label="Categoria" name="category" :items="categories" item-title="name"
                                item-value="id" v-model="category.value.value" :error-messages="category.errorMessage.value"
                                variant="solo"></v-select>
                        </v-col>
                        <v-col class="py-0 pt-md-3" cols="12" md="6">
                            <v-select chips label="Precio" name="price" :items="prices" item-title="name" item-value="id"
                                v-model="price.value.value" :error-messages="price.errorMessage.value"
                                variant="solo"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0 py-md-3" cols="12" md="4">
                            <v-select name="rooms" v-model="rooms.value.value" :error-messages="rooms.errorMessage.value"
                                chips label="Habitaciones" :items="[0, 1, 2, 3, 4, 5, 6]" variant="solo"></v-select>
                        </v-col>
                        <v-col class="py-0 py-md-3" cols="12" md="4">
                            <v-select name="parking" v-model="parking.value.value"
                                :error-messages="parking.errorMessage.value" chips label="Estacionamiento"
                                :items="[0, 1, 2, 3, 4, 5]" variant="solo"></v-select>
                        </v-col>
                        <v-col class="py-0 py-md-3" cols="12" md="4">
                            <v-select name="wc" v-model="wc.value.value" :error-messages="wc.errorMessage.value" chips
                                label="WC" :items="[0, 1, 2, 3, 4]" variant="solo"></v-select>
                        </v-col>
                    </v-row>
                    <v-card-title class="pb-0">Seleciona tu ubicacion en el mapa</v-card-title>
                    <v-card-title class="pt-0 text-subtitle-1 text-black"> {{ infoMap.barrio }}</v-card-title>
                    <v-text-field class="mb-4" name="city" v-model="city.value.value"
                        :error-messages="city.errorMessage.value" type="hidden" variant="solo"></v-text-field>
                    <v-row class="pt-0 pb-5" style="justify-content: center;">
                        <v-card id="map" width="890" height="350"></v-card>

                        <v-text-field name="latitude" v-model="latitude.value.value"
                            :error-messages="latitude.errorMessage.value" type="hidden" variant="solo"></v-text-field>
                        <v-text-field name="length" v-model="length.value.value" :error-messages="length.errorMessage.value"
                            type="hidden" variant="solo"></v-text-field>
                    </v-row>

                </v-form>
                <v-card-actions class="bg-white"
                    style="width: 100%;justify-content: space-between; position: fixed; bottom: 0; box-shadow: 0px -.5px 2px;">
                    <div class="d-flex">
                        <v-divider :thickness="4" class="border-opacity-100 rounded mr-2" color="secondary"
                            style="width: 50px"></v-divider>
                        <v-divider :thickness="4" class="border-opacity-100 rounded" color="grey"
                            style="width: 50px"></v-divider>
                    </div>
                    <div>
                        <v-btn variant="text" color="error" @click="actionProperty(false)">Cancelar</v-btn>
                        <v-btn @click="submit" variant="text" color="secondary">Siguiente</v-btn>
                    </div>



                </v-card-actions>


            </v-card>
        </v-dialog>

        <v-dialog v-model="uploadImage" persistent width="950">
            <v-card>
                <v-card-title>
                    Cargar imagen de la propiedad
                </v-card-title>
                <v-form class="mt-5 mb-10 pa-6" ref="form" style="height: 200px;">
                    <v-row>
                        <v-col>
                            <v-file-input id="image" chips :rules="ruleImage" v-model="valueImage"
                                accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi:mdi-camera" variant="solo"
                                label="Añadir imagen" name="image"></v-file-input>
                        </v-col>
                    </v-row>

                </v-form>
                <v-card-actions class="bg-white"
                    style="width: 100%;justify-content: space-between; position: fixed; bottom: 0; box-shadow: 0px -.5px 2px;">
                    <div class="d-flex">
                        <v-divider :thickness="4" class="border-opacity-100 rounded mr-2" color="secondary"
                            style="width: 50px"></v-divider>
                        <v-divider :thickness="4" class="border-opacity-100 rounded" color="secondary"
                            style="width: 50px"></v-divider>
                    </div>
                    <v-btn @click="upload" variant="text" color="secondary">Añadir Imagen y Publicar</v-btn>


                </v-card-actions>


            </v-card>
        </v-dialog>
        
        <v-snackbar v-model="snack.boolean" :color="snack.color" timeout="3000" vertical>
            <p class="text-h6">{{ snack.title }}</p>
            <p class="text-h6 text-subtitle-1">{{ snack.subtitle }} </p>
        </v-snackbar>
    </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import leaflet from 'leaflet'
import { useField, useForm } from 'vee-validate'
import store from '@/store';



// components
import NavbarAdmin from './NavbarAdmin.vue';


// props
const props = defineProps(['actionNewProperty', 'newPropertyBoolean', 'actionsData'])


// variables de formulario de imagen
const valueImage = ref(undefined)
const form = ref()
const uploadImage = ref(false)
let idImage
const ruleImage = [value => !value > 0 || value?.length > 0 || 'Subir una imagen']

// variables de formulario de informacion
const categories = ref(null)
const prices = ref(null)
let reverseGeocoder = new BDCReverseGeocode();
let map
let snack = ref({
    title: '',
    subtitle: '',
    color: '',
    boolean: false
})
const infoMap = ref({
    city: '',
    barrio: '',
})

// validacion de formulario
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(value) {
            if (value?.length === undefined || value?.length <= 0) return 'Campo vacio'
            if (value?.length <= 4) return 'Titulo invalido'
            return true
        },
        description(value) {
            if (value?.length === undefined || value?.length <= 0) return 'Campo vacio'
            if (value?.length >= 300) return 'La descripcion es muy larga'
            return true
        },
        category(value) {
            if (value > 0) return true
            return 'Campo vacio'
        },
        price(value) {
            if (value > 0) return true
            return 'Campo vacio'
        },
        rooms(value) {
            if (value >= 0) return true
            return 'Campo vacio'
        },
        parking(value) {
            if (value >= 0) return true
            return 'Campo vacio'
        },
        wc(value) {
            if (value >= 0) return true
            return 'Campo vacio'
        },
        city(value) {
            if (value?.length === undefined || value?.length <= 0) return 'Selecione la ubicacion'
            return true
        },
        latitude(value) {
            return true
        },
        length(value) {
            return true
        },

    },
})
const title = useField('title')
const description = useField('description')
const category = useField('category')
const price = useField('price')
const rooms = useField('rooms')
const parking = useField('parking')
const wc = useField('wc')
const latitude = useField('latitude')
const length = useField('length')
const city = useField('city')

// crea la propiedad
const submit = handleSubmit(async values => {
    await fetch('https://api-rootshare.up.railway.app/admin/property/creation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authToken': store.state.token
        },
        body: JSON.stringify(values)
    })
    .then(async res => {
        const resDB = await res.json()
        uploadImage.value = resDB.boolean
        idImage = resDB.id
        actionProperty(false)
    })
    .catch(err => console.log(err))

})

// cargar imagen
const upload = async () => {
    const formData = new FormData();
    const fileField = document.querySelector("#image");
    formData.append("image", fileField.files[0]);

    const valid = await form.value.validate()
    if (!valid.valid) {
        return snack.value = {
            title: '',
            subtitle: 'Error al cargar la imagen',
            color: 'error',
            boolean: true
        }
    }
    uploadImage.value = false
    await fetch(`https://api-rootshare.up.railway.app/admin/property/image/${idImage}`, {
        method: 'POST',
        headers: {
            'authToken': store.state.token
        },
        body: formData
    })
        .then(async (response) => {
            const res = await response.json();
            snack.value = res
        })
        .catch(err => console.log(err))
    valueImage.value = undefined
    await props.actionsData()

    

}

// accion del boton para la nueva propiedad
const actionProperty = async (e) => {
    await props.actionNewProperty(e)
    if (props.newPropertyBoolean) return await Promise.all([
        mapProperty(),
        dbModels()
    ])
    handleReset()
}


// Funcion de los modelos categoria y precio de la base de datos
const dbModels = async () => {
    await fetch('https://api-rootshare.up.railway.app/admin/property/models', {
        headers: {
            "content-Type": "application/json",
            "authToken": store.state.token
        }
    })
        .then(async res => {
            const resDB = await res.json()
            categories.value = resDB.categories
            prices.value = resDB.prices
        })
        .catch(error => console.log(error))
}


// Funcion del mapa
const mapProperty = () => {
    let marker
    map = leaflet.map('map').setView([6.2475875, -75.5676969], 15)

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // crear el pin
    marker = new leaflet.marker([6.2475875, -75.5676969], {
        draggable: true,
        autoPan: true
    }).addTo(map)

    // Detectar movimiento del pin
    marker.on('moveend', function (e) {
        marker = e.target
        const position = marker.getLatLng()
        map.panTo(new leaflet.LatLng(position.lat, position.lng))

        // obtener informacion del pin
        reverseGeocoder.getClientLocation({
            latitude: position.lat,
            longitude: position.lng,
        }, function (data) {
            infoMap.value.city = data.city
            infoMap.value.barrio = data.locality
            latitude.value.value = position.lat
            length.value.value = position.lng
            city.value.value = data.city

            marker.bindPopup(`<b>${data.city} - ${data.countryName}</b><br>${data.locality}.`).openPopup()

        });
    })
}

onBeforeMount(async () => {
    await props.actionsData()
})









</script>

<style></style>