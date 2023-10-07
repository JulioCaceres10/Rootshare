<template>
    <div>
        <Properties :actionNewProperty="actionsProperties" :newPropertyBoolean="dialogProperties" :actionsData="database" />
        <TableProperties :actionsData="database" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

// Components
import NavbarAdmin from '@/components/admin/NavbarAdmin.vue';
import Properties from '@/components/admin/Properties.vue';
import TableProperties from '@/components/admin/TableProperties.vue';
import DialogProperty from '@/components/admin/vDialogProperty.vue';
import store from '@/store';

export default defineComponent({
    name: 'PropertiesView',

    components: {
        NavbarAdmin,
        Properties,
        TableProperties,
        DialogProperty
    },

    computed: {
        ...mapState(['dialogProperties', 'dataBase']),
    },
    methods: {
        ...mapActions(['actionsProperties']),
        async database() {
            if (store.state.token !== null) {
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
            }
        }
    },

    async beforeMount() {
        await this.database()
    }


});

</script>

<style></style>