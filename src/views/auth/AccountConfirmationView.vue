<template>
    <Navbar/>
    <AccountConfirmation/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Navbar from '@/components/auth/NavbarAuth.vue';
import AccountConfirmation from '@/components/auth/AccountConfirmation.vue';



export default defineComponent({
    name: 'AccountConfirmationView',

    components: {
        Navbar,
        AccountConfirmation
    },
});

</script>

