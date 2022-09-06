<template>
  <div id="main">
  
    <TheNavigation :key="$route.path" />
    
    <div class="container">
        <router-view />
    </div>

  </div>
</template>

<script>

  import TheNavigation from '@/components/TheNavigation.vue'

  export default({

    components: { TheNavigation }

  })

</script>
