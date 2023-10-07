<template>
    <div>
        <Navbar/>
        <ForgotPassword/>
    </div>
    
</template>
  
<script>
import { defineComponent } from 'vue';

// Components
import Navbar from '@/components/auth/NavbarAuth.vue';
import ForgotPassword from '@/components/auth/ForgotPassword.vue';

export default defineComponent({
    name: 'ForgotPasswordView',

    components: {
        ForgotPassword,
        Navbar
    },
});
</script>