<template>
    <v-container fluid>
        <v-snackbar v-model="snack.boolean" :color="snack.color" timeout="3000" vertical>
            <p class="text-h6">{{ snack.title }}</p>
            <p class="text-subtitle-1">{{ snack.subtitle }} </p>
        </v-snackbar>

        <!-- ventana de dialogo para cargar imagen -->
        <v-dialog v-model="props.dialogImageBoolean" width="950">
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
                    style="width: 100%;justify-content: end; position: fixed; bottom: 0; box-shadow: 0px -.5px 2px;">
                    <v-btn @click="props.methodImg(false)" variant="text" color="error">Cancelar</v-btn>
                    <v-btn @click="upload(props.idProperty)" variant="text" color="secondary">Añadir Imagen y Publicar</v-btn>


                </v-card-actions>

            </v-card>
        </v-dialog>

        <!-- ventana de dialogo para publicar o no la propiedad -->
        <v-dialog v-model="props.published" persistent width="400">
            <v-card>
                <v-card-title v-if="!props.idProperty.item.published" class="text-center">Esta propiedad sera publicada</v-card-title>
                <v-card-title v-if="props.idProperty.item.published" class="text-center">Dejara de estar publica</v-card-title>
                <v-card-actions style="justify-content: space-evenly;">
                    <v-btn color="error" @click="props.postProperty(false, 0)">cancelar</v-btn>
                    <v-btn color="secondary" @click="published(props.idProperty.item)">aceptar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>

        <!-- ventana de dialogo para eliminar propiedad -->
        <v-dialog v-model="props.delete" persistent width="400">
            <v-card>
                <v-card-title class="text-center">Desea eliminar esta propiedad</v-card-title>
                <v-card-actions style="justify-content: space-evenly;">
                    <v-btn color="error" @click="props.methodDelete(false, null)">cancelar</v-btn>
                    <v-btn color="secondary" @click="deleteProperty(props.idProperty)">aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- ventena de dialogo para los mensajes -->
        <v-dialog v-model="props.showMessages" persistent width="950">
            <v-card height="500">
                <v-card-actions class="bg-white"
                    style="width: 100%; justify-content: space-between; position: relative; top: 0; box-shadow: 0px -.5px 2px;">
                   <v-card-title>MENSAJES</v-card-title>
                   <v-btn icon="mdi:mdi-close" @click="props.actionMessages(false, null)"></v-btn>
                </v-card-actions>
                <v-card-item>
                    <div v-if="props.messages" v-for="item in props.messages" class="mb-4" >
                        <p class="text-body-1 font-weight-bold px-2">Nombre: 
                            <span class="text-body-1 font-weight-medium">{{ item.user.name }} {{ item.user.lastName }}</span>
                        </p>
                        <p class="text-body-1 font-weight-bold px-2 mb-1">Mensaje: 
                            <span class="text-subtitle-1 font-weight-medium">{{ item.message }}</span>
                        </p>
                        <p class="text-body-1 font-weight-medium px-2">Email: 
                            <span class="text-subtitle-1">{{ item.user.email }}</span>
                        </p>
                        <p class="text-body-1 font-weight-medium px-2 mb-2">Enviado: 
                            <span class="text-subtitle-1">{{ formatDate(item.createdAt) }}</span>
                        </p>
                        <v-divider></v-divider>
                    </div>

                    <v-card-text v-if="!props.messages" class="text-center text-body-1">Esta propiedad aun no tiene mensajes</v-card-text>
                </v-card-item>
            </v-card>
        </v-dialog>


  

    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import store from '@/store';

const props = defineProps(
    [
        'dialogImageBoolean', 'methodImg', 'idProperty','published','postProperty', 
        'delete', 'methodDelete', 'showMessages', 'messages', 'actionMessages'
    ])

// variables imagen
const form = ref()
const ruleImage = [value => !value > 0 || value?.length > 0 || 'Subir una imagen']
const valueImage = ref(undefined)


// muestra el resultado del servidor
const snack = ref({
    title: '',
    subtitle: '',
    color: '',
    boolean: false
})

// funcion fetch para añadir imagen
const upload = async (e) => {
    const formData = new FormData();
    const fileField = document.querySelector("#image");
    formData.append("image", fileField.files[0]);

    const valid = await form.value.validate()
    if (!valid.valid) {
        return snack.value = {
            title: 'Error al cargar la imagen',
            color: 'error',
            boolean: true
        }
    }
    props.methodImg(false)
    await fetch(`https://api-rootshare.up.railway.app/admin/property/image/${e}`, {
        method: 'POST',
        headers: {
            'authToken': store.state.token
        },
        body: formData
    })
        .then(async response => {
            const res = await response.json()
            if (res.boolean) {
                return snack.value = res
            }
        })
        .catch(err => console.log(err))
    await database()
    valueImage.value = undefined
    
}

// funcion fetch para publicar o no una propiedad
const published = async (item) => {
    if(item.image === null) {
        props.postProperty(false, 0)
        return snack.value = {
            title: 'Añadir imagen',
            subtitle: 'La propiedad no tiene imagen',
            color: 'error',
            boolean: true
        }
    }
    await fetch(`https://api-rootshare.up.railway.app/admin/property/published/${item.id}`, {
        method: 'PUT',
        headers: {
            'authToken': store.state.token
        },
    })
    .then(async response => {
        const res = await response.json();
        snack.value = res
        props.postProperty(false, 0)
    })
    .catch(err => console.log(err))
    await database()

}

// funcion fetch para eliminar propiedad
const deleteProperty = async (id) => {
    await fetch(`https://api-rootshare.up.railway.app/admin/property/delete/${id}`,{
        method: 'DELETE',
        headers: { 
            'authToken': store.state.token
        }
    })
    .then(async (response) => {
        const resDB = await response.json()
        snack.value = resDB
    })
    .catch(err => console.log(err))
    .finally(async () => {
        props.methodDelete(false, null)
        await database()
    })
}

const formatDate = (date) => {
    const format = date.split('T')
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    
    return new Date(format[0]).toLocaleDateString('es-ES', options)
} 

// actualizar datos
const database = async () => {
    const resDB = await fetch("https://api-rootshare.up.railway.app/admin/properties", {
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
}
</script>