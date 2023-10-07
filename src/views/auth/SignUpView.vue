<template>
  <div>
    <Navbar />
    <SignUp />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Navbar from '@/components/auth/NavbarAuth.vue';
import SignUp from '@/components/auth/SignUp.vue';

export default defineComponent({
  name: 'SignUpView',

  components: {
    SignUp,
    Navbar
  },
});
</script>
