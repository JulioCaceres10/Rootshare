<template>
  <v-container fluid>
    <v-snackbar v-model="snack.boolean" :color="snack.color" timeout="3000" vertical>
      <p class="text-h6">{{ snack.title }}</p>
      <p class="text-subtitle-1">{{ snack.subtitle }} </p>
    </v-snackbar>

    <div>
      <v-table class="d-none d-md-block" fixed-header :height="store.state.dataBase.length === 0 ? '70' : '500'">
        <thead>
          <tr>
            <th class="text-left">
              Propiedad
            </th>
            <th class="text-left">
              Titulo
            </th>
            <th class="text-center">
              Categoria
            </th>
            <th class="text-center">
              Ciudad
            </th>
            <th class="text-center">
              Publicado
            </th>
            <th class="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.state.dataBase" :key="item.id">

            <td>
              <v-img v-if="item.image !== null" class="rounded-lg my-2 text-center" :src="item.image" width="180">

              </v-img>
              <v-btn v-if="item.image === null" @click="dialogPropertyImage(true, item.id)" prepend-icon="mdi:mdi-camera"
                variant="text" stacked>añadir
                imagen</v-btn>
            </td>
            <td>
              <p class="text-h5 mt-4">{{ item.title }}</p>
              <p class="text-subtitle-1 mb-2">{{ item.price.name }}</p>
              <v-badge color="red" :content="item.messages.length">
                <v-btn variant="tonal" class="mb-2" color="info"
                  @click="dialogMessagesProperty(true, item.id)">Mensajes</v-btn>
              </v-badge>

            </td>
            <td class="text-center font-weight-medium">
              <p>{{ item.category.name }}</p>
            </td>
            <td class="text-center font-weight-medium">
              <p>{{ item.city }}</p>
            </td>
            <td class="text-center font-weight-medium">
              <v-btn class="text-h6" :color="item.published ? 'success' : 'error'"
                :icon="item.published ? 'mdi:mdi-check' : 'mdi:mdi-close'" variant="text"
                @click="postProperty(true, item)">
                <v-icon></v-icon>
                <v-tooltip activator="parent" location="top"
                  :text="item.published ? 'Publicado' : 'No Publicado'"></v-tooltip>
              </v-btn>
            </td>
            <td class="text-center">
              <div>
                <v-btn icon="mdi:mdi-pencil" variant="text" color="info" @click="editProperty(true, item.id)">
                  <v-icon></v-icon>
                  <v-tooltip activator="parent" location="top">Editar</v-tooltip>
                </v-btn>
                <v-btn v-if="item.image" :to="{ name: 'property', params: { id: item.id } }" icon="mdi:mdi-open-in-new"
                  variant="text" color="secondary">
                  <v-icon></v-icon>
                  <v-tooltip activator="parent" location="top">Mostrar</v-tooltip>
                </v-btn>
                <v-btn icon="mdi:mdi-delete" variant="text" color="error" @click="dialogDeleteProperty(true, item.id)">
                  <v-icon></v-icon>
                  <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>

      <!-- vista para dispositivos moviles -->
      <div class="d-flex d-md-none" style="justify-content: center; flex-wrap: wrap;">
        <v-card v-for="item in store.state.dataBase" class="ma-4" width="320">
          <div class="d-flex text-subtitle-2 mt-2" style="justify-content: space-between; width: 100%">
            <v-card-subtitle class="d-flex">{{ item.category.name }}</v-card-subtitle>
            <v-card-subtitle class="d-flex">{{ item.city }}</v-card-subtitle>
          </div>
          <v-card-item class="mt-2">
            <v-img :src="item.image" height="190" style="border-radius: 20px;"></v-img>
          </v-card-item>
          <v-card-title class="py-0">{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.price.name }}</v-card-subtitle>
          <v-card-text class="py-2 text-body-1">{{ item.description }}</v-card-text>
          <v-badge color="red" :content="item.messages.length">
            <v-btn variant="tonal" class="mb-2 ml-2" color="info"
              @click="dialogMessagesProperty(true, item.id)">Mensajes</v-btn>
          </v-badge>
          <v-toolbar-items class="ma-4 text-center" style="justify-content: space-between;">
            <v-toolbar-items class="d-flex" style="justify-content: space-between;">
              <v-btn icon="mdi:mdi-pencil" variant="text" color="info" @click="editProperty(true, item.id)">
                <v-icon></v-icon>
                <v-tooltip activator="parent" location="top">Editar</v-tooltip>
              </v-btn>

              <v-divider vertical></v-divider>
              <v-btn v-if="item.image" :to="{ name: 'property', params: { id: item.id } }" icon="mdi:mdi-open-in-new"
                variant="text" color="secondary">
                <v-icon></v-icon>
                <v-tooltip activator="parent" location="top">Mostrar</v-tooltip>
              </v-btn>

              <v-divider vertical></v-divider>
              <v-btn icon="mdi:mdi-delete" variant="text" color="error" @click="dialogDeleteProperty(true, item.id)">
                <v-icon></v-icon>
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
              </v-btn>

            </v-toolbar-items>

            <v-btn class="text-h6" :color="item.published ? 'success' : 'error'"
              :icon="item.published ? 'mdi:mdi-check' : 'mdi:mdi-close'" variant="text" @click="postProperty(true, item)">
              <v-icon></v-icon>
              <v-tooltip activator="parent" location="top"
                :text="item.published ? 'Publicado' : 'No Publicado'"></v-tooltip>
            </v-btn>



          </v-toolbar-items>
        </v-card>
      </div>

      <p v-if="store.state.dataBase.length === 0" class="text-center text-h6">No hay ninguna propiedad creada</p>
    </div>

    <DialogProperty :dialogImageBoolean="dialogImage" :methodImg="dialogPropertyImage" :idProperty="idProperty"
      :published="publishedProperty" :postProperty="postProperty" :delete="deleteProperty"
      :methodDelete="dialogDeleteProperty" :showMessages="showMessages" :actionMessages="dialogMessagesProperty" 
      :messages="messages" />

    <!-- ventana de dialogo para editar -->
    <v-dialog v-model="propertyEdit" persistent width="950">
      <v-card>
        <v-card-title>
          Informacion General
        </v-card-title>
        <v-card-subtitle class="text-subtitle-1">
          Editar informacion sobre la propiedad
        </v-card-subtitle>
        <v-form class="mt-5 mb-10 pa-6" ref="form" @submit.prevent="">
          <v-text-field v-model="infoProperty.title" :rules="formText" name="title" label="Titulo de prodiedad"
            placeholder="ej. Casa en la playa" variant="solo"></v-text-field>
          <v-textarea v-model="infoProperty.description" :rules="formText" label="Descripcion" name="descripcion"
            variant="solo"></v-textarea>
          <v-row>
            <v-col class="pb-0 pt-md-3" cols="12" md="6">
              <v-select v-model="infoProperty.category" chips label="Categoria" name="category" :items="categories"
                item-title="name" item-value="id" variant="solo"></v-select>
            </v-col>
            <v-col class="py-0 pt-md-3" cols="12" md="6">
              <v-select v-model="infoProperty.price" chips label="Precio" name="price" :items="prices" item-title="name"
                item-value="id" variant="solo"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 py-md-3" cols="12" md="4">
              <v-select v-model="infoProperty.rooms" name="rooms" chips label="Habitaciones"
                :items="[0, 1, 2, 3, 4, 5, 6]" variant="solo"></v-select>
            </v-col>
            <v-col class="py-0 py-md-3" cols="12" md="4">
              <v-select v-model="infoProperty.parking" name="parking" chips label="Estacionamiento"
                :items="[0, 1, 2, 3, 4, 5]" variant="solo"></v-select>
            </v-col>
            <v-col class="py-0 py-md-3" cols="12" md="4">
              <v-select v-model="infoProperty.wc" name="wc" chips label="WC" :items="[0, 1, 2, 3, 4]"
                variant="solo"></v-select>
            </v-col>
          </v-row>

        </v-form>
        <v-card-actions class="bg-white"
          style="width: 100%;justify-content: space-between; position: fixed; bottom: 0; box-shadow: 0px -.5px 2px;">
          <v-btn variant="text" color="error" @click="editProperty(false)">Cancelar</v-btn>
          <div>
            <v-btn variant="text" color="secondary" @click="postPropertyEdit(false)">Guardar</v-btn>
            <v-btn variant="text" color="info" @click="postPropertyEdit(true)">Añadir Imagen</v-btn>
          </div>

        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import store from '@/store';

// props
const props = defineProps(['actionsData'])

// componentes
import DialogProperty from '@/components/admin/vDialogProperty.vue';


// dialogo añadir imagen
const dialogImage = ref(false)
const idProperty = ref()

// mostrar dialogo de imagen
const dialogPropertyImage = (e, id) => {
  dialogImage.value = e
  idProperty.value = id
}

// publicacion de propiedad
const publishedProperty = ref(false)

// eliminacion de propiedad
const deleteProperty = ref(false)

// mostrar mensajes
const showMessages = ref(false)
const messages = ref(null)

// mostrar dialogo de eliminar propiedad
const dialogDeleteProperty = (e, id) => {
  deleteProperty.value = e
  idProperty.value = id

}

const dialogMessagesProperty = (e, id) => {
  showMessages.value = e
  if(e) return messagesProperty(id)

}

// mostrar dialogo para publicar o dejar de estar publica una propiedad
const postProperty = (e, item) => {
  publishedProperty.value = e
  idProperty.value = { item }
}

// funcion fetch para mostrar los mensajes
const messagesProperty = async (id) => {
    await fetch(`https://api-rootshare.onrender.com/public/messages/${id}`,{
      method: "GET",
      credentials: 'include'
    })
    .then( async response => {
      const res = await response.json()
      messages.value = res
    })
    .catch(err => console.log(err))
}

// muestra el resultado del servidor
const snack = ref({
  title: '',
  subtitle: '',
  color: '',
  boolean: false
})

// variables de editar informacion 
const propertyEdit = ref(false)
const categories = ref(null)
const prices = ref(null)
const infoProperty = ref({
  title: '',
  description: '',
  rooms: null,
  parking: null,
  wc: null,
  category: null,
  price: null
})

// formulario
const form = ref()

// rules
const formText = [value => value?.length > 4 || 'Campo invalido']


// traer informacion de la propiedad
const editProperty = async (e, id) => {
  propertyEdit.value = e
  if (propertyEdit.value) { await dbModels() } else return

  await fetch(`https://api-rootshare.onrender.com/admin/property/edit/${id}`, {
    headers: {
      'authToken': store.state.token
    }
  }).then(async response => {
    const resDB = await response.json()
    infoProperty.value = resDB
  }).catch(err => console.log(err)).finally(() => idProperty.value = id)

}

// edicion de la propiedad
const postPropertyEdit = async (imgBoolean) => {
  const valid = await form.value.validate()
  if (!valid.valid) return

  await fetch(`https://api-rootshare.onrender.com/admin/property/edit/${idProperty.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authToken': store.state.token
    },
    body: JSON.stringify(infoProperty.value)
  })
    .then(async response => {
      const resDB = await response.json();
      snack.value = resDB
      console.log(JSON.stringify(infoProperty.value))
    })
    .catch(error => console.log(error))

  await props.actionsData()
  dialogImage.value = imgBoolean
  propertyEdit.value = false

}

// traer informacion de los precios y categorias para la propiedad
const dbModels = async () => {
  await fetch('https://api-rootshare.onrender.com/admin/property/models', {
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


</script>

<style></style>