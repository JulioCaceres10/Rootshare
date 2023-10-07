<template>
    <div>
        <Navbar/>
        <ResetPassword/>
    </div>
    
</template>
  
<script>
import { defineComponent } from 'vue';

// Components
import Navbar from '@/components/auth/NavbarAuth.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';


export default defineComponent({
    name: 'ResetPasswordView',

    components: {
        Navbar,
        ResetPassword
        
    },
});
</script>