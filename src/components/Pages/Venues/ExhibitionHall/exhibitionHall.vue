<template>
  <v-card class="pa-5">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Venue Content">
        <Venue />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Exhibitor Booth Content" force-render>
        <Exhibitor />
      </a-tab-pane>
    </a-tabs>
  </v-card>
</template>
<script>
import Venue from './Venue.vue'
import Exhibitor from './Exhibitor.vue'
export default {
    beforeRouteEnter (to, from, next) {
      const token = localStorage.getItem('token')
  if(token){
    next()
  }
  else
    next('/login')
  },
  components: {
    Venue,
    Exhibitor
  },
  methods: {
  },
};
</script>

