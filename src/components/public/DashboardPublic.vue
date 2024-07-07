<template>
    <div>
        <v-container class="header d-none d-sm-flex" fluid style="justify-content: end; align-items: center; padding: 10%;">
            <div>
                <h1 class="text-white font-weight-bold font-italic">Dejanos Guiarte a Casa</h1>
                <h3 class="text-white text-body-1">Encuentra la casa de tus sueños</h3>
                <form class="mt-2" @submit.prevent="searchSelect">
                    <div class="d-flex py-0">
                        <v-select v-model="filter.categories" id="category" class="mr-4" clearable chips label="Categoria"
                            variant="solo" width="500" :items="categories" item-title="name" item-value="id"
                            style="width:250px"></v-select>
                        <v-select v-model="filter.prices" id="price" clearable chips label="Precio" variant="solo"
                            :items="prices" item-title="name" item-value="id" style="width:250px"></v-select>
                    </div>
                    <v-btn type="submit" block color="indigo-darken-3"
                        :disabled="filter.categories === null && filter.prices === null">BUSCAR</v-btn>
                </form>


            </div>
        </v-container>

        <!-- header para dispositivos moviles -->
        <v-container class="header-movil d-flex d-sm-none" style="align-items: center; justify-content: center">
            <div class="text-center">
                <h1 class="text-white font-weight-bold font-italic">Dejanos Guiarte a Casa</h1>
                <h3 class="text-white text-body-1">Encuentra la casa de tus sueños</h3>
                <form class="mt-2" @submit.prevent="searchSelect(ref)">
                    <div class="py-0">
                        <v-select v-model="filter.categories" id="category" clearable chips label="Categoria" variant="solo"
                            width="500" :items="categories" item-title="name" item-value="id"></v-select>
                        <v-select v-model="filter.prices" id="price" clearable chips label="Precio" variant="solo"
                            :items="prices" item-title="name" item-value="id"></v-select>
                    </div>
                    <v-btn type="submit" block color="indigo-darken-3"
                        :disabled="filter.categories === null && filter.prices === null">BUSCAR</v-btn>
                </form>


            </div>
        </v-container>

        <v-container v-if="search">
            <h1 class="text-h5 mt-4 font-weight-bold font-italic">Busqueda:</h1>
            <h3 v-if="propertiesSearch.length === 0" class="text-center">No hay propiedades encontradas</h3>
            <swiper :slidesPerView="3" :spaceBetween="20" :pagination="{clickable: true, }" 
            :breakpoints="{0: { slidesPerView: 1 },720: { slidesPerView: 2 },1200: { slidesPerView: 3 },}" 
            :navigation="true" :modules="modules" class="py-5">

                <SwiperSlide v-for="item in propertiesSearch" class="d-flex" style="justify-content: center;">
                    <v-card class="ma-4" width="300" style="border-radius: 20px;"
                        :to="{ name: 'property', params: { id: item.id } }">

                        <v-img :src="item.image" height="200" cover></v-img>
                        <v-card-title class="py-0">{{ item.title }}</v-card-title>
                        <v-card-subtitle>{{ item.price.name }}</v-card-subtitle>
                        <v-card-text class="d-flex">
                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-bed"></v-icon>
                                <p>{{ item.rooms }}</p>

                            </div>

                            <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-shower"></v-icon>
                                <p>{{ item.wc }}</p>

                            </div>

                            <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-car-brake-parking"></v-icon>
                                <p>{{ item.parking }}</p>
                            </div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <p class="font-weight-bold">Publicado:</p>
                            <p class="font-weight-bold">{{ item.user.name }} {{ item.user.lastName }}</p>

                        </v-card-text>

                    </v-card>
                </SwiperSlide>

            </swiper>
        </v-container>

        <v-container class="mt-4">
            <h1 class="text-h5 mt-4 font-weight-bold font-italic">Casas Destacadas:</h1>
            <swiper :slidesPerView="3" :spaceBetween="20" :pagination="{clickable: true,}" 
            :breakpoints="{0: { slidesPerView: 1 },720: { slidesPerView: 2 },1200: { slidesPerView: 3 },}"
            :navigation="true" :modules="modules" class="py-5">

                <SwiperSlide v-for="item in houses" class="d-flex" style="justify-content: center;">
                    <v-card class="ma-4" width="300" style="border-radius: 20px;"
                        :to="{ name: 'property', params: { id: item.id } }">

                        <v-img :src="item.image" height="200" cover></v-img>
                        <v-card-title class="py-0">{{ item.title }}</v-card-title>
                        <v-card-subtitle>{{ item.price.name }}</v-card-subtitle>
                        <v-card-text class="d-flex">
                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-bed"></v-icon>
                                <p>{{ item.rooms }}</p>

                            </div>

                            <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-shower"></v-icon>
                                <p>{{ item.wc }}</p>

                            </div>

                            <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-car-brake-parking"></v-icon>
                                <p>{{ item.parking }}</p>
                            </div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <p class="font-weight-bold">Publicado:</p>
                            <p class="font-weight-bold">{{ item.user.name }} {{ item.user.lastName }}</p>

                        </v-card-text>

                    </v-card>
                </SwiperSlide>

            </swiper>

        </v-container>

        <v-container class="mt-4">
            <h1 class="text-h5 mt-4 font-weight-bold font-italic">Apartamentos Destacados:</h1>
            <swiper :slidesPerView="3" :spaceBetween="20" :pagination="{clickable: true,}" 
            :breakpoints="{ 0: { slidesPerView: 1 }, 720: { slidesPerView: 2 },1200: { slidesPerView: 3 },}" 
            :navigation="true" :modules="modules" class="py-5">

                <SwiperSlide v-for="item in apartments" class="d-flex" style="justify-content: center;">
                    <v-card class="ma-4" width="300" style="border-radius: 20px;"
                        :to="{ name: 'property', params: { id: item.id } }">

                        <v-img :src="item.image" height="200" cover></v-img>
                        <v-card-title class="py-0">{{ item.title }}</v-card-title>
                        <v-card-subtitle>{{ item.price.name }}</v-card-subtitle>
                        <v-card-text class="d-flex">
                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-bed"></v-icon>
                                <p>{{ item.rooms }}</p>

                            </div>

                            <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-shower"></v-icon>
                                <p>{{ item.wc }}</p>

                            </div>

                            <v-divider class="border-opacity-50" :thickness="2" vertical></v-divider>

                            <div class="mx-4 px-4 text-center">
                                <v-icon class="text-h6" icon="mdi:mdi-car-brake-parking"></v-icon>
                                <p>{{ item.parking }}</p>
                            </div>

                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <p class="font-weight-bold">Publicado:</p>
                            <p class="font-weight-bold">{{ item.user.name }} {{ item.user.lastName }}</p>

                        </v-card-text>
                    </v-card>
                </SwiperSlide>

            </swiper>

        </v-container>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import store from '@/store';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';



export default {
    components: {
        Swiper,
        SwiperSlide
    },

    setup() {
        // variables de modelos
        const categories = ref([])
        const prices = ref([])
        const houses = ref([])
        const apartments = ref([])

        const search = ref(false)
        const propertiesSearch = ref(null)

        // filtros
        const filter = ref({
            categories: null,
            prices: null
        })

        const searchSelect = () => {
            const result = store.state.dashboardDB.filter(filterCategory).filter(filterPrice)
            propertiesSearch.value = result
            search.value = true
        }

        const filterCategory = property => filter.value.categories ? property.categoryId === filter.value.categories : property
        const filterPrice = property => filter.value.prices ? property.priceId === filter.value.prices : property



        // Funcion de los modelos categoria y precio de la base de datos
        const publicModels = async () => {
            await fetch('https://api-rootshare.up.railway.app/public/models')
                .then(async res => {
                    const resDB = await res.json()
                    categories.value = resDB.categories
                    prices.value = resDB.prices
                    houses.value = resDB.houses
                    apartments.value = resDB.apartments

                })
                .catch(error => console.log(error))
        }

        onMounted(async () => {
            await publicModels()
        })

        return { categories, prices, houses, apartments, filter, searchSelect, search, propertiesSearch, modules: [Pagination, Navigation] }
    }
}

</script>

<style>
.header {
    position: relative;
    background: linear-gradient(to bottom right, rgba(27, 27, 227, 0.734), rgba(42, 42, 241, 0.784)), url('https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80');
    height: 60vh
}

.header-movil {
    position: relative;
    background: linear-gradient(to bottom right, rgba(52, 52, 245, 0.734), rgba(29, 29, 157, 0.784)), url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFycXVpdGVjdHVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');
    height: 60vh;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px
}
</style>
