<template>
    <div>
        <NavbarPublic/>
        <PropertyPublic />
    </div>
</template>

<script>
import {defineComponent} from 'vue';

// components
import NavbarPublic from '@/components/admin/NavbarAdmin.vue'
import PropertyPublic from '@/components/public/PropertyPublic.vue'

export default defineComponent({
    name: 'Property',

    components: {
        NavbarPublic,
        PropertyPublic
    }
})
</script>