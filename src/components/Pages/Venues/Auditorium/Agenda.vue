<template>
  <v-card class="pa-5">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Conference">
        <Conference />
      </a-tab-pane>
      <a-tab-pane key="2" tab="OXR" force-render>
        <OXR />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Agenda Main" force-render>
        <Agenda />
      </a-tab-pane>
    </a-tabs>
  </v-card>
</template>
<script>
import Agenda from '../agendaTabs/agenda';
import OXR from '../agendaTabs/Oxr';
import Conference from '../agendaTabs/Conference';
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
    Agenda,
    OXR,
    Conference
  },
  methods: {
    // callback(key) {
    //   alert(key);
    // },
  },
};
</script>
