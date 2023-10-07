<template>
    <div>
        <Navbar />
        <SignIn />
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';

// Components
import Navbar from '@/components/auth/NavbarAuth.vue';
import SignIn from '@/components/auth/SignIn.vue';

export default defineComponent({
    name: 'SignInView',

    components: {
        SignIn,
        Navbar
    },
});
</script>