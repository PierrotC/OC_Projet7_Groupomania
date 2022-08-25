<template>
  <div id="main">
  
    <TheNavigation />
    
    <div class="container">
        <router-view/>
    </div>

  </div>
</template>

<script>

  import TheNavigation from '@/components/TheNavigation.vue'

  export default({

    components: { TheNavigation }

  })

</script>
