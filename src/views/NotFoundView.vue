<template>
    <div>
        <NavbarPublic />
        <h1 class="text-center mt-5">Pagina no encontrada</h1>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

// components
import NavbarPublic from '@/components/admin/NavbarAdmin.vue'


export default defineComponent({
    name: 'NotFound',

    components: {
        NavbarPublic,
    }
})
</script>

<style></style>