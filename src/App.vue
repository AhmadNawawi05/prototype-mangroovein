<template>
  <div>
    <NavbarComponents   />

    <router-view />

    <footerComponents />

    <Map></Map>

  </div>
</template>

<script > 
// import 'flowbite/dist/flowbite.js'


import NavbarComponents from './components/NavbarComponent.vue';
import footerComponents from './components/FooterComponent.vue';



export default {
    name: 'App',
    components : {
      NavbarComponents,

      footerComponents
    },

  }
</script>