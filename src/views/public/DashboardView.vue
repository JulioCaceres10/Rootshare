<template>
    <div>
        <NavbarPublic />
        <DashboardPublic />
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import store from '@/store';

// components
import NavbarPublic from '@/components/admin/NavbarAdmin.vue'
import DashboardPublic from '@/components/public/DashboardPublic.vue'


export default defineComponent({
    name: 'Dashboard',

    components: {
        NavbarPublic,
        DashboardPublic
    },

    methods: {
        async dashboard() {
            const resDB = await fetch("https://api-rootshare.onrender.com/public/")
            try {
                const res = await resDB.json()
                store.commit('setDashBoard', res)
            } catch (error) {
                console.log(error)
            }
        },
    },

    created() {
        this.dashboard()
    }
})
</script>

<style></style>